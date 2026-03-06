package com.weeklyplanning.service.impl;

import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.repository.DayPlanRepository;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.DayPersonRepository;
import com.weeklyplanning.repository.TaskRepository;
import com.weeklyplanning.repository.WeekRepository;
import com.weeklyplanning.service.WeekService;
import com.weeklyplanning.service.dto.WeekDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.service.mapper.WeekMapper;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.weeklyplanning.domain.Week}.
 */
@Service
@Transactional
public class WeekServiceImpl implements WeekService {

    private static final Logger LOG = LoggerFactory.getLogger(WeekServiceImpl.class);

    private final WeekRepository weekRepository;
    private final DayPlanRepository dayPlanRepository;
    private final DayPersonRepository dayPersonRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final TaskRepository taskRepository;

    private final WeekMapper weekMapper;

    public WeekServiceImpl(
        WeekRepository weekRepository,
        DayPlanRepository dayPlanRepository,
        DayPersonRepository dayPersonRepository,
        DayPersonProjectRepository dayPersonProjectRepository,
        TaskRepository taskRepository,
        WeekMapper weekMapper
    ) {
        this.weekRepository = weekRepository;
        this.dayPlanRepository = dayPlanRepository;
        this.dayPersonRepository = dayPersonRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.taskRepository = taskRepository;
        this.weekMapper = weekMapper;
    }

    @Override
    public WeekDTO save(WeekDTO weekDTO) {
        LOG.debug("Request to save Week : {}", weekDTO);
        validateDates(weekDTO.getStartDate(), weekDTO.getEndDate());
        if (weekDTO.getStatus() != WeekStatus.PLANNED) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Week status must be PLANNED when creating a week");
        }
        Week week = weekMapper.toEntity(weekDTO);
        week = weekRepository.save(week);
        createMissingDayPlans(week, week.getStartDate(), week.getEndDate());
        return weekMapper.toDto(week);
    }

    @Override
    public WeekDTO update(WeekDTO weekDTO) {
        LOG.debug("Request to update Week : {}", weekDTO);
        if (weekDTO.getId() == null || !weekRepository.existsById(weekDTO.getId())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Week not found");
        }
        validateDates(weekDTO.getStartDate(), weekDTO.getEndDate());
        Week week = weekMapper.toEntity(weekDTO);
        week = weekRepository.save(week);
        createMissingDayPlans(week, week.getStartDate(), week.getEndDate());
        return weekMapper.toDto(week);
    }

    @Override
    public Optional<WeekDTO> partialUpdate(WeekDTO weekDTO) {
        LOG.debug("Request to partially update Week : {}", weekDTO);

        return weekRepository
            .findById(weekDTO.getId())
            .map(existingWeek -> {
                weekMapper.partialUpdate(existingWeek, weekDTO);

                return existingWeek;
            })
            .map(weekRepository::save)
            .map(weekMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WeekDTO> findAll() {
        LOG.debug("Request to get all Weeks");
        return weekRepository.findAll().stream().map(weekMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WeekDTO> search(WeekStatus status, LocalDate startDateFrom, LocalDate startDateTo, Pageable pageable) {
        LOG.debug("Request to search Weeks with status {}, startDateFrom {}, startDateTo {}", status, startDateFrom, startDateTo);
        return weekRepository.search(status, startDateFrom, startDateTo, pageable).map(weekMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WeekDTO> findOne(UUID id) {
        LOG.debug("Request to get Week : {}", id);
        return weekRepository.findById(id).map(weekMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete Week : {}", id);
        List<DayPlan> dayPlans = dayPlanRepository.findAllByWeekId(id);
        List<UUID> dayPlanIds = dayPlans.stream().map(DayPlan::getId).toList();
        if (!dayPlanIds.isEmpty()) {
            List<DayPerson> dayPeople = dayPersonRepository.findAllByDayPlanIdIn(dayPlanIds);
            List<UUID> dayPersonIds = dayPeople.stream().map(DayPerson::getId).toList();
            if (!dayPersonIds.isEmpty()) {
                List<DayPersonProject> assignments = dayPersonProjectRepository.findAllByDayPersonIdIn(dayPersonIds);
                List<UUID> assignmentIds = assignments.stream().map(DayPersonProject::getId).toList();
                if (!assignmentIds.isEmpty()) {
                    taskRepository.deleteAll(taskRepository.findAllByDayPersonProjectIdIn(assignmentIds));
                    dayPersonProjectRepository.deleteAll(assignments);
                }
                dayPersonRepository.deleteAll(dayPeople);
            }
            dayPlanRepository.deleteAll(dayPlans);
        }
        weekRepository.deleteById(id);
    }

    private void validateDates(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Week startDate and endDate are required");
        }
        if (endDate.isBefore(startDate)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Week endDate must be on or after startDate");
        }
    }

    private void createMissingDayPlans(Week week, LocalDate startDate, LocalDate endDate) {
        LocalDate cursor = startDate;
        while (!cursor.isAfter(endDate)) {
            if (dayPlanRepository.findOneByWeekIdAndDate(week.getId(), cursor).isEmpty()) {
                DayPlan dayPlan = new DayPlan();
                dayPlan.setWeek(week);
                dayPlan.setDate(cursor);
                dayPlanRepository.save(dayPlan);
            }
            cursor = cursor.plusDays(1);
        }
    }
}
