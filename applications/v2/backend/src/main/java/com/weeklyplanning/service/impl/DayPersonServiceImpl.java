package com.weeklyplanning.service.impl;

import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.DayPlanRepository;
import com.weeklyplanning.repository.DayPersonRepository;
import com.weeklyplanning.repository.PersonRepository;
import com.weeklyplanning.repository.TaskRepository;
import com.weeklyplanning.service.DayPlanService;
import com.weeklyplanning.service.DayPersonService;
import com.weeklyplanning.service.dto.DayPersonDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.service.mapper.DayPersonMapper;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.weeklyplanning.domain.DayPerson}.
 */
@Service
@Transactional
public class DayPersonServiceImpl implements DayPersonService {

    private static final Logger LOG = LoggerFactory.getLogger(DayPersonServiceImpl.class);

    private final DayPersonRepository dayPersonRepository;
    private final DayPlanRepository dayPlanRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final TaskRepository taskRepository;
    private final PersonRepository personRepository;
    private final DayPlanService dayPlanService;

    private final DayPersonMapper dayPersonMapper;

    public DayPersonServiceImpl(
        DayPersonRepository dayPersonRepository,
        DayPlanRepository dayPlanRepository,
        DayPersonProjectRepository dayPersonProjectRepository,
        TaskRepository taskRepository,
        PersonRepository personRepository,
        DayPlanService dayPlanService,
        DayPersonMapper dayPersonMapper
    ) {
        this.dayPersonRepository = dayPersonRepository;
        this.dayPlanRepository = dayPlanRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.taskRepository = taskRepository;
        this.personRepository = personRepository;
        this.dayPlanService = dayPlanService;
        this.dayPersonMapper = dayPersonMapper;
    }

    @Override
    public DayPersonDTO save(DayPersonDTO dayPersonDTO) {
        LOG.debug("Request to save DayPerson : {}", dayPersonDTO);
        DayPerson dayPerson = dayPersonMapper.toEntity(dayPersonDTO);
        dayPerson = dayPersonRepository.save(dayPerson);
        return dayPersonMapper.toDto(dayPerson);
    }

    @Override
    public DayPersonDTO update(DayPersonDTO dayPersonDTO) {
        LOG.debug("Request to update DayPerson : {}", dayPersonDTO);
        DayPerson dayPerson = dayPersonMapper.toEntity(dayPersonDTO);
        dayPerson = dayPersonRepository.save(dayPerson);
        return dayPersonMapper.toDto(dayPerson);
    }

    @Override
    public Optional<DayPersonDTO> partialUpdate(DayPersonDTO dayPersonDTO) {
        LOG.debug("Request to partially update DayPerson : {}", dayPersonDTO);

        return dayPersonRepository
            .findById(dayPersonDTO.getId())
            .map(existingDayPerson -> {
                dayPersonMapper.partialUpdate(existingDayPerson, dayPersonDTO);

                return existingDayPerson;
            })
            .map(dayPersonRepository::save)
            .map(dayPersonMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DayPersonDTO> findAll() {
        LOG.debug("Request to get all DayPeople");
        return dayPersonRepository.findAll().stream().map(dayPersonMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public DayPerson addPersonToDay(UUID weekId, LocalDate date, UUID personId) {
        Week week = requirePlannedWeek(weekId);
        validateDateInWeekRange(week, date);

        Person person = personRepository
            .findById(personId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Person not found"));
        if (person.getStatus() != PersonStatus.ACTIVE) {
            throw new ApiException(HttpStatus.CONFLICT, "Inactive people cannot be assigned to planning");
        }

        DayPlan dayPlan = dayPlanService.getOrCreateDayPlan(weekId, date);
        if (dayPersonRepository.existsByDayPlanIdAndPersonId(dayPlan.getId(), personId)) {
            throw new ApiException(HttpStatus.CONFLICT, "Person is already assigned to this day");
        }

        DayPerson dayPerson = new DayPerson();
        dayPerson.setDayPlan(dayPlan);
        dayPerson.setPerson(person);
        dayPerson = dayPersonRepository.save(dayPerson);

        return dayPersonRepository
            .findOneByDayPlanIdAndPersonId(dayPlan.getId(), personId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Person assignment not found after creation"));
    }

    @Override
    public void removePersonFromDay(UUID weekId, LocalDate date, UUID personId) {
        Week week = requirePlannedWeek(weekId);
        validateDateInWeekRange(week, date);

        DayPlan dayPlan = dayPlanRepository
            .findOneByWeekIdAndDate(weekId, date)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Day plan not found"));

        DayPerson dayPerson = dayPersonRepository
            .findOneByDayPlanIdAndPersonId(dayPlan.getId(), personId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Person is not assigned to this day"));

        List<DayPersonProject> assignments = dayPersonProjectRepository.findAllByDayPersonIdIn(List.of(dayPerson.getId()));
        List<UUID> assignmentIds = assignments.stream().map(DayPersonProject::getId).toList();
        if (!assignmentIds.isEmpty()) {
            taskRepository.deleteAll(taskRepository.findAllByDayPersonProjectIdIn(assignmentIds));
            dayPersonProjectRepository.deleteAll(assignments);
        }

        dayPersonRepository.delete(dayPerson);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DayPersonDTO> findOne(UUID id) {
        LOG.debug("Request to get DayPerson : {}", id);
        return dayPersonRepository.findById(id).map(dayPersonMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete DayPerson : {}", id);
        dayPersonRepository.deleteById(id);
    }

    private Week requirePlannedWeek(UUID weekId) {
        Week week = dayPlanService.getWeekOrThrow(weekId);
        if (week.getStatus() == WeekStatus.COMPLETED) {
            throw new ApiException(HttpStatus.CONFLICT, "Planning operations are forbidden for completed weeks");
        }
        return week;
    }

    private void validateDateInWeekRange(Week week, LocalDate date) {
        if (date == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Date is required");
        }
        if (date.isBefore(week.getStartDate()) || date.isAfter(week.getEndDate())) {
            throw new ApiException(HttpStatus.CONFLICT, "Date is outside the selected week range");
        }
    }
}
