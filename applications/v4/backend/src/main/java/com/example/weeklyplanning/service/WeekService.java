package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.DayPlanEntity;
import com.example.weeklyplanning.domain.WeekEntity;
import com.example.weeklyplanning.domain.enumeration.WeekStatus;
import com.example.weeklyplanning.repository.WeekRepository;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.mapper.PageMapper;
import com.example.weeklyplanning.service.mapper.WeekMapper;
import com.example.weeklyplanning.web.rest.errors.BadRequestException;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class WeekService {

    private final WeekRepository weekRepository;
    private final WeekMapper weekMapper;
    private final PageMapper pageMapper;
    private final PaginationSupport paginationSupport;
    private final AuditService auditService;

    public WeekService(
        WeekRepository weekRepository,
        WeekMapper weekMapper,
        PageMapper pageMapper,
        PaginationSupport paginationSupport,
        AuditService auditService
    ) {
        this.weekRepository = weekRepository;
        this.weekMapper = weekMapper;
        this.pageMapper = pageMapper;
        this.paginationSupport = paginationSupport;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public ApiSchemas.WeekPage listWeeks(
        Integer page,
        Integer size,
        String sort,
        WeekStatus status,
        LocalDate weekStartFrom,
        LocalDate weekStartTo
    ) {
        Pageable pageable = paginationSupport.pageable(page, size, sort, Sort.by(Sort.Order.desc("weekStart")));
        Specification<WeekEntity> specification = buildSpecification(status, weekStartFrom, weekStartTo);

        Page<WeekEntity> result = weekRepository.findAll(specification, pageable);
        return new ApiSchemas.WeekPage(
            result.getContent().stream().map(weekMapper::toSummary).toList(),
            pageMapper.toMetadata(result)
        );
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ApiSchemas.WeekDetail createWeek(ApiSchemas.CreateWeekRequest request, String actor) {
        validateRange(request.weekStart(), request.weekEnd());

        if (weekRepository.existsByWeekStartAndWeekEnd(request.weekStart(), request.weekEnd())) {
            throw new ConflictException("Week range already exists");
        }

        WeekEntity week = new WeekEntity();
        week.setWeekId(UUID.randomUUID());
        week.setWeekStart(request.weekStart());
        week.setWeekEnd(request.weekEnd());
        week.setStatus(request.status() == null ? WeekStatus.PLANNED : request.status());
        week.setDayPlans(generateDayPlans(week, request.weekStart(), request.weekEnd()));

        WeekEntity saved = weekRepository.save(week);
        auditService.entityEvent("WEEK", "CREATE", saved.getWeekId(), actor);
        return weekMapper.toDetail(saved);
    }

    @Transactional(readOnly = true)
    public ApiSchemas.WeekDetail getWeekById(UUID weekId) {
        WeekEntity week = weekRepository.findById(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found"));
        return weekMapper.toDetail(week);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ApiSchemas.WeekDetail updateWeekById(UUID weekId, ApiSchemas.UpdateWeekRequest request, String actor) {
        validateRange(request.weekStart(), request.weekEnd());

        WeekEntity week = weekRepository.findByWeekId(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found"));

        boolean rangeChanged = !week.getWeekStart().equals(request.weekStart()) || !week.getWeekEnd().equals(request.weekEnd());
        if (rangeChanged && hasAssignments(week)) {
            throw new ConflictException("Week dates cannot be changed after planning assignments exist");
        }

        week.setWeekStart(request.weekStart());
        week.setWeekEnd(request.weekEnd());
        week.setStatus(request.status());

        if (rangeChanged) {
            week.getDayPlans().clear();
            week.getDayPlans().addAll(generateDayPlans(week, request.weekStart(), request.weekEnd()));
        }

        WeekEntity saved = weekRepository.save(week);
        auditService.entityEvent("WEEK", "UPDATE", saved.getWeekId(), actor);
        return weekMapper.toDetail(saved);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteWeekById(UUID weekId, String actor) {
        WeekEntity week = weekRepository.findByWeekId(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found"));

        if (hasAssignments(week)) {
            throw new ConflictException("Week cannot be deleted because planning assignments exist");
        }

        weekRepository.delete(week);
        auditService.entityEvent("WEEK", "DELETE", weekId, actor);
    }

    @Transactional(readOnly = true)
    public WeekEntity findDetailedWeekOrThrow(UUID weekId) {
        return weekRepository.findByWeekId(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found"));
    }

    @Transactional(readOnly = true)
    public WeekEntity findWeekOrThrow(UUID weekId) {
        return weekRepository.findById(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found"));
    }

    public void assertPlanningWritable(WeekEntity week) {
        if (week.getStatus() == WeekStatus.COMPLETED) {
            throw new ConflictException("Planning operations are forbidden for completed weeks");
        }
    }

    private void validateRange(LocalDate weekStart, LocalDate weekEnd) {
        if (weekStart.isAfter(weekEnd)) {
            throw new BadRequestException("weekStart must be before or equal to weekEnd");
        }
    }

    private boolean hasAssignments(WeekEntity week) {
        return week.getDayPlans().stream().anyMatch(dayPlan -> !dayPlan.getDayPersons().isEmpty());
    }

    private List<DayPlanEntity> generateDayPlans(WeekEntity week, LocalDate start, LocalDate end) {
        List<DayPlanEntity> dayPlans = new ArrayList<>();
        for (LocalDate current = start; !current.isAfter(end); current = current.plusDays(1)) {
            DayPlanEntity dayPlan = new DayPlanEntity();
            dayPlan.setDayPlanId(UUID.randomUUID());
            dayPlan.setWeek(week);
            dayPlan.setDate(current);
            dayPlan.setDayOfWeek(current.getDayOfWeek());
            dayPlans.add(dayPlan);
        }
        return dayPlans;
    }

    private Specification<WeekEntity> buildSpecification(WeekStatus status, LocalDate weekStartFrom, LocalDate weekStartTo) {
        Specification<WeekEntity> specification = Specification.where(null);

        if (status != null) {
            specification = specification.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        if (weekStartFrom != null) {
            specification = specification.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("weekStart"), weekStartFrom));
        }

        if (weekStartTo != null) {
            specification = specification.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("weekStart"), weekStartTo));
        }

        return specification;
    }
}
