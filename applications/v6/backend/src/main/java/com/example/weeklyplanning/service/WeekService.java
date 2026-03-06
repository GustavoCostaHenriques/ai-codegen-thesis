package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.DayPlanEntity;
import com.example.weeklyplanning.domain.DayProjectEntity;
import com.example.weeklyplanning.domain.PlanningAssignmentEntity;
import com.example.weeklyplanning.domain.PlanningDayOfWeek;
import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.domain.ProjectStatus;
import com.example.weeklyplanning.domain.TaskEntity;
import com.example.weeklyplanning.domain.WeekEntity;
import com.example.weeklyplanning.domain.WeekStatus;
import com.example.weeklyplanning.repository.DayPlanRepository;
import com.example.weeklyplanning.repository.ProjectRepository;
import com.example.weeklyplanning.repository.WeekRepository;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.dto.DuplicateWeekRequest;
import com.example.weeklyplanning.service.dto.PagedWeeks;
import com.example.weeklyplanning.service.dto.Week;
import com.example.weeklyplanning.service.dto.WeekCreateRequest;
import com.example.weeklyplanning.service.dto.WeekSummary;
import com.example.weeklyplanning.service.dto.WeekUpdateRequest;
import com.example.weeklyplanning.service.mapper.ApiMapper;
import com.example.weeklyplanning.web.rest.errors.BadRequestException;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.EnumMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class WeekService {

    private static final Set<String> WEEK_SORT_FIELDS = Set.of("code", "weekStart", "weekEnd", "status", "createdAt", "updatedAt");
    private static final List<PlanningDayOfWeek> DAYS = List.of(
        PlanningDayOfWeek.MONDAY,
        PlanningDayOfWeek.TUESDAY,
        PlanningDayOfWeek.WEDNESDAY,
        PlanningDayOfWeek.THURSDAY,
        PlanningDayOfWeek.FRIDAY
    );

    private final WeekRepository weekRepository;
    private final DayPlanRepository dayPlanRepository;
    private final ProjectRepository projectRepository;
    private final PaginationService paginationService;
    private final ApiMapper apiMapper;
    private final AuditService auditService;

    public WeekService(WeekRepository weekRepository,
                       DayPlanRepository dayPlanRepository,
                       ProjectRepository projectRepository,
                       PaginationService paginationService,
                       ApiMapper apiMapper,
                       AuditService auditService) {
        this.weekRepository = weekRepository;
        this.dayPlanRepository = dayPlanRepository;
        this.projectRepository = projectRepository;
        this.paginationService = paginationService;
        this.apiMapper = apiMapper;
        this.auditService = auditService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public PagedWeeks listWeeks(Integer page,
                                Integer size,
                                String sort,
                                WeekStatus status,
                                LocalDate weekStartFrom,
                                LocalDate weekStartTo,
                                String search) {
        Pageable pageable = paginationService.toPageable(page, size, sort, WEEK_SORT_FIELDS);
        Specification<WeekEntity> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }
        if (weekStartFrom != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("weekStart"), weekStartFrom));
        }
        if (weekStartTo != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("weekStart"), weekStartTo));
        }
        if (search != null && !search.isBlank()) {
            String like = "%" + search.trim().toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("code")), like));
        }

        Page<WeekEntity> entityPage = weekRepository.findAll(spec, pageable);
        List<WeekSummary> content = entityPage.getContent().stream().map(apiMapper::toWeekSummary).toList();
        return new PagedWeeks(content, apiMapper.toPageMetadata(entityPage));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Week createWeek(WeekCreateRequest request, AuthenticatedPrincipal actor) {
        validateWeekRange(request.weekStart(), request.weekEnd());
        if (request.status() != null && request.status() != WeekStatus.PLANNED) {
            throw new BadRequestException("New weeks must be created as PLANNED.");
        }
        weekRepository.findByWeekStartAndWeekEnd(request.weekStart(), request.weekEnd())
            .ifPresent(existing -> {
                throw new ConflictException("Week with the same date range already exists.");
            });

        WeekEntity week = new WeekEntity();
        week.setWeekStart(request.weekStart());
        week.setWeekEnd(request.weekEnd());
        week.setStatus(WeekStatus.PLANNED);
        week.setCode(generateUniqueWeekCode(request.weekStart()));
        weekRepository.save(week);

        initializeDayPlans(week, true);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "CREATE_WEEK", "WEEK", week.getId(), "Week created", true);
        return apiMapper.toWeek(week);
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public Week getWeekById(UUID weekId) {
        WeekEntity week = weekRepository.findById(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found."));
        return apiMapper.toWeek(week);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Week updateWeek(UUID weekId, WeekUpdateRequest request, AuthenticatedPrincipal actor) {
        validateWeekRange(request.weekStart(), request.weekEnd());

        WeekEntity week = weekRepository.findById(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found."));

        if (weekRepository.existsByWeekStartAndWeekEndAndIdNot(request.weekStart(), request.weekEnd(), weekId)) {
            throw new ConflictException("Week with the same date range already exists.");
        }

        week.setWeekStart(request.weekStart());
        week.setWeekEnd(request.weekEnd());
        week.setStatus(request.status());
        week.setCode(generateUniqueWeekCodeForUpdate(request.weekStart(), week.getCode()));
        weekRepository.save(week);

        List<DayPlanEntity> dayPlans = dayPlanRepository.findByWeekIdOrderByDate(weekId);
        for (int i = 0; i < DAYS.size() && i < dayPlans.size(); i++) {
            DayPlanEntity dayPlan = dayPlans.get(i);
            dayPlan.setDayOfWeek(DAYS.get(i));
            dayPlan.setDate(request.weekStart().plusDays(i));
        }
        dayPlanRepository.saveAll(dayPlans);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "UPDATE_WEEK", "WEEK", week.getId(), "Week updated", true);
        return apiMapper.toWeek(week);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteWeek(UUID weekId, AuthenticatedPrincipal actor) {
        WeekEntity week = weekRepository.findById(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found."));

        weekRepository.delete(week);
        auditService.audit(actor.getAccountId(), actor.getUsername(), "DELETE_WEEK", "WEEK", weekId, "Week removed", true);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public Week duplicateWeek(UUID sourceWeekId, DuplicateWeekRequest request, AuthenticatedPrincipal actor) {
        validateWeekRange(request.weekStart(), request.weekEnd());

        WeekEntity sourceWeek = weekRepository.findById(sourceWeekId)
            .orElseThrow(() -> new NotFoundException("Week not found."));

        weekRepository.findByWeekStartAndWeekEnd(request.weekStart(), request.weekEnd())
            .ifPresent(existing -> {
                throw new ConflictException("Week with the same date range already exists.");
            });

        WeekEntity duplicated = new WeekEntity();
        duplicated.setWeekStart(request.weekStart());
        duplicated.setWeekEnd(request.weekEnd());
        duplicated.setStatus(request.status() == null ? WeekStatus.PLANNED : request.status());
        duplicated.setCode(generateUniqueWeekCode(request.weekStart()));
        weekRepository.save(duplicated);

        initializeDayPlans(duplicated, false);

        List<DayPlanEntity> sourcePlans = dayPlanRepository.findPlanningBoardByWeekId(sourceWeek.getId());
        List<DayPlanEntity> targetPlans = dayPlanRepository.findPlanningBoardByWeekId(duplicated.getId());

        Map<PlanningDayOfWeek, DayPlanEntity> targetByDay = new EnumMap<>(PlanningDayOfWeek.class);
        targetPlans.forEach(plan -> targetByDay.put(plan.getDayOfWeek(), plan));

        for (DayPlanEntity sourcePlan : sourcePlans) {
            DayPlanEntity targetPlan = targetByDay.get(sourcePlan.getDayOfWeek());
            if (targetPlan == null) {
                continue;
            }
            for (DayProjectEntity sourceProject : sourcePlan.getProjects()) {
                DayProjectEntity targetProject = new DayProjectEntity();
                targetProject.setDayPlan(targetPlan);
                targetProject.setProject(sourceProject.getProject());
                targetPlan.getProjects().add(targetProject);

                for (PlanningAssignmentEntity sourceAssignment : sourceProject.getAssignments()) {
                    PlanningAssignmentEntity targetAssignment = new PlanningAssignmentEntity();
                    targetAssignment.setDayProject(targetProject);
                    targetAssignment.setPerson(sourceAssignment.getPerson());
                    targetAssignment.setEstimatedHours(sourceAssignment.getEstimatedHours());
                    targetAssignment.setActualHours(sourceAssignment.getActualHours());
                    targetProject.getAssignments().add(targetAssignment);

                    for (TaskEntity sourceTask : sourceAssignment.getTasks()) {
                        TaskEntity targetTask = new TaskEntity();
                        targetTask.setAssignment(targetAssignment);
                        targetTask.setDescription(sourceTask.getDescription());
                        targetAssignment.getTasks().add(targetTask);
                    }
                }
            }
        }

        dayPlanRepository.saveAll(targetPlans);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "DUPLICATE_WEEK", "WEEK", duplicated.getId(), "Week duplicated", true);
        return apiMapper.toWeek(duplicated);
    }

    @Transactional(readOnly = true)
    public WeekEntity getWeekEntity(UUID weekId) {
        return weekRepository.findById(weekId)
            .orElseThrow(() -> new NotFoundException("Week not found."));
    }

    private void initializeDayPlans(WeekEntity week, boolean includeActiveProjects) {
        List<ProjectEntity> activeProjects = includeActiveProjects ? projectRepository.findByStatus(ProjectStatus.ACTIVE) : List.of();

        for (int i = 0; i < DAYS.size(); i++) {
            DayPlanEntity dayPlan = new DayPlanEntity();
            dayPlan.setWeek(week);
            dayPlan.setDayOfWeek(DAYS.get(i));
            dayPlan.setDate(week.getWeekStart().plusDays(i));

            for (ProjectEntity project : activeProjects) {
                DayProjectEntity dayProject = new DayProjectEntity();
                dayProject.setDayPlan(dayPlan);
                dayProject.setProject(project);
                dayPlan.getProjects().add(dayProject);
            }

            dayPlanRepository.save(dayPlan);
        }
    }

    private void validateWeekRange(LocalDate weekStart, LocalDate weekEnd) {
        if (weekStart == null || weekEnd == null) {
            throw new BadRequestException("Week start and week end are required.");
        }
        if (weekEnd.isBefore(weekStart)) {
            throw new BadRequestException("weekEnd must be after or equal to weekStart.");
        }
    }

    private String generateUniqueWeekCode(LocalDate weekStart) {
        String base = generateWeekCode(weekStart);
        if (!weekRepository.existsByCodeIgnoreCase(base)) {
            return base;
        }
        int suffix = 2;
        while (weekRepository.existsByCodeIgnoreCase(base + suffix)) {
            suffix++;
        }
        return base + suffix;
    }

    private String generateUniqueWeekCodeForUpdate(LocalDate weekStart, String currentCode) {
        String generated = generateWeekCode(weekStart);
        if (generated.equalsIgnoreCase(currentCode)) {
            return currentCode;
        }
        return generateUniqueWeekCode(weekStart);
    }

    private String generateWeekCode(LocalDate weekStart) {
        WeekFields weekFields = WeekFields.of(Locale.ENGLISH);
        int weekNumber = weekStart.get(weekFields.weekOfWeekBasedYear());
        String month = weekStart.getMonth().name().substring(0, 3);
        return "W" + weekNumber + month + weekStart.getYear();
    }
}
