package com.weeklyplanning.service.impl;

import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.repository.DayPlanRepository;
import com.weeklyplanning.repository.WeekRepository;
import com.weeklyplanning.service.DayPlanService;
import com.weeklyplanning.service.dto.DayPlanDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.service.mapper.DayPlanMapper;
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
 * Service Implementation for managing {@link com.weeklyplanning.domain.DayPlan}.
 */
@Service
@Transactional
public class DayPlanServiceImpl implements DayPlanService {

    private static final Logger LOG = LoggerFactory.getLogger(DayPlanServiceImpl.class);

    private final DayPlanRepository dayPlanRepository;
    private final WeekRepository weekRepository;

    private final DayPlanMapper dayPlanMapper;

    public DayPlanServiceImpl(DayPlanRepository dayPlanRepository, WeekRepository weekRepository, DayPlanMapper dayPlanMapper) {
        this.dayPlanRepository = dayPlanRepository;
        this.weekRepository = weekRepository;
        this.dayPlanMapper = dayPlanMapper;
    }

    @Override
    public DayPlanDTO save(DayPlanDTO dayPlanDTO) {
        LOG.debug("Request to save DayPlan : {}", dayPlanDTO);
        DayPlan dayPlan = dayPlanMapper.toEntity(dayPlanDTO);
        dayPlan = dayPlanRepository.save(dayPlan);
        return dayPlanMapper.toDto(dayPlan);
    }

    @Override
    public DayPlanDTO update(DayPlanDTO dayPlanDTO) {
        LOG.debug("Request to update DayPlan : {}", dayPlanDTO);
        DayPlan dayPlan = dayPlanMapper.toEntity(dayPlanDTO);
        dayPlan = dayPlanRepository.save(dayPlan);
        return dayPlanMapper.toDto(dayPlan);
    }

    @Override
    public Optional<DayPlanDTO> partialUpdate(DayPlanDTO dayPlanDTO) {
        LOG.debug("Request to partially update DayPlan : {}", dayPlanDTO);

        return dayPlanRepository
            .findById(dayPlanDTO.getId())
            .map(existingDayPlan -> {
                dayPlanMapper.partialUpdate(existingDayPlan, dayPlanDTO);

                return existingDayPlan;
            })
            .map(dayPlanRepository::save)
            .map(dayPlanMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DayPlanDTO> findAll() {
        LOG.debug("Request to get all DayPlans");
        return dayPlanRepository.findAll().stream().map(dayPlanMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DayPlan> findPlanningDays(UUID weekId) {
        Week week = getWeekOrThrow(weekId);
        return dayPlanRepository.findAllByWeekIdAndDateBetweenOrderByDateAsc(weekId, week.getStartDate(), week.getEndDate());
    }

    @Override
    public DayPlan getOrCreateDayPlan(UUID weekId, LocalDate date) {
        Week week = getWeekOrThrow(weekId);
        validateDateInWeekRange(week, date);
        return dayPlanRepository
            .findOneByWeekIdAndDate(weekId, date)
            .orElseGet(() -> {
                DayPlan dayPlan = new DayPlan();
                dayPlan.setWeek(week);
                dayPlan.setDate(date);
                return dayPlanRepository.save(dayPlan);
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Week getWeekOrThrow(UUID weekId) {
        return weekRepository.findById(weekId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Week not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DayPlanDTO> findOne(UUID id) {
        LOG.debug("Request to get DayPlan : {}", id);
        return dayPlanRepository.findById(id).map(dayPlanMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete DayPlan : {}", id);
        dayPlanRepository.deleteById(id);
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
