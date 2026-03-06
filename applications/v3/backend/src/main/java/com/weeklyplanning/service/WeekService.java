package com.weeklyplanning.service;

import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.repository.WeekRepository;
import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.BadRequestException;
import com.weeklyplanning.service.exception.ConflictException;
import com.weeklyplanning.service.exception.NotFoundException;
import com.weeklyplanning.service.mapper.PageMapper;
import com.weeklyplanning.service.mapper.WeekMapper;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Locale;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class WeekService {

    private final WeekRepository weekRepository;

    public WeekService(WeekRepository weekRepository) {
        this.weekRepository = weekRepository;
    }

    public ApiDtos.WeekPage listWeeks(Pageable pageable,
                                      WeekStatus status,
                                      LocalDate weekStartFrom,
                                      LocalDate weekStartTo) {
        Specification<Week> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }
        if (weekStartFrom != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("weekStart"), weekStartFrom));
        }
        if (weekStartTo != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("weekStart"), weekStartTo));
        }

        Page<Week> page = weekRepository.findAll(spec, pageable);
        return new ApiDtos.WeekPage(page.map(WeekMapper::toSummary).getContent(), PageMapper.toPageMetadata(page));
    }

    public ApiDtos.WeekDetail createWeek(ApiDtos.CreateWeekRequest request) {
        validateRange(request.weekStart(), request.weekEnd());
        if (request.status() != null && request.status() != WeekStatus.PLANNED) {
            throw new BadRequestException("INVALID_WEEK_STATUS", "New weeks must be created with PLANNED status.");
        }

        Week week = Week.builder()
            .code(generateUniqueWeekCode(request.weekStart()))
            .weekStart(request.weekStart())
            .weekEnd(request.weekEnd())
            .status(WeekStatus.PLANNED)
            .dayPlans(new ArrayList<>())
            .build();

        generateDayPlans(week, request.weekStart(), request.weekEnd());
        return WeekMapper.toDetail(weekRepository.save(week));
    }

    public ApiDtos.WeekDetail getWeekById(UUID weekId) {
        return WeekMapper.toDetail(findWeek(weekId));
    }

    public ApiDtos.WeekDetail updateWeek(UUID weekId, ApiDtos.UpdateWeekRequest request) {
        validateRange(request.weekStart(), request.weekEnd());

        Week week = findWeek(weekId);
        boolean rangeChanged = !week.getWeekStart().equals(request.weekStart()) || !week.getWeekEnd().equals(request.weekEnd());

        if (rangeChanged && hasAssignments(week)) {
            throw new ConflictException("WEEK_HAS_ASSIGNMENTS", "Week range cannot be changed after planning assignments exist.");
        }

        if (rangeChanged) {
            week.getDayPlans().clear();
            generateDayPlans(week, request.weekStart(), request.weekEnd());
        }

        week.setWeekStart(request.weekStart());
        week.setWeekEnd(request.weekEnd());
        week.setStatus(request.status());

        return WeekMapper.toDetail(weekRepository.save(week));
    }

    public void deleteWeek(UUID weekId) {
        Week week = findWeek(weekId);
        weekRepository.delete(week);
    }

    public Week findWeek(UUID weekId) {
        return weekRepository.findById(weekId)
            .orElseThrow(() -> new NotFoundException("WEEK_NOT_FOUND", "Week not found."));
    }

    private void validateRange(LocalDate start, LocalDate end) {
        if (start.isAfter(end)) {
            throw new BadRequestException("INVALID_WEEK_RANGE", "weekStart must be on or before weekEnd.");
        }
    }

    private boolean hasAssignments(Week week) {
        return week.getDayPlans().stream().anyMatch(dayPlan -> !dayPlan.getDayPersons().isEmpty());
    }

    private void generateDayPlans(Week week, LocalDate start, LocalDate end) {
        LocalDate cursor = start;
        while (!cursor.isAfter(end)) {
            DayPlan dayPlan = DayPlan.builder()
                .week(week)
                .date(cursor)
                .dayOfWeek(cursor.getDayOfWeek())
                .dayPersons(new ArrayList<>())
                .build();
            week.getDayPlans().add(dayPlan);
            cursor = cursor.plusDays(1);
        }
    }

    private String generateUniqueWeekCode(LocalDate weekStart) {
        int weekOfMonth = ((weekStart.getDayOfMonth() - 1) / 7) + 1;
        String baseCode = "W" + weekOfMonth
            + weekStart.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH)
            + weekStart.getYear();

        String code = baseCode;
        int suffix = 1;
        while (weekRepository.existsByCodeIgnoreCase(code)) {
            code = baseCode + "-" + suffix;
            suffix++;
        }
        return code;
    }
}
