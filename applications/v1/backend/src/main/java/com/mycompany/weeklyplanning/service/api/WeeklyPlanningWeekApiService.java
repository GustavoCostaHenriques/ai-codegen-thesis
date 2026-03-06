package com.mycompany.weeklyplanning.service.api;

import com.mycompany.weeklyplanning.domain.AppUserEntity;
import com.mycompany.weeklyplanning.domain.DayPlanEntity;
import com.mycompany.weeklyplanning.domain.DayUserEntity;
import com.mycompany.weeklyplanning.domain.DayUserProjectEntity;
import com.mycompany.weeklyplanning.domain.ProjectEntity;
import com.mycompany.weeklyplanning.domain.TaskEntity;
import com.mycompany.weeklyplanning.domain.WeekEntity;
import com.mycompany.weeklyplanning.repository.AppUserRepository;
import com.mycompany.weeklyplanning.repository.DayPlanRepository;
import com.mycompany.weeklyplanning.repository.DayUserProjectRepository;
import com.mycompany.weeklyplanning.repository.DayUserRepository;
import com.mycompany.weeklyplanning.repository.ProjectRepository;
import com.mycompany.weeklyplanning.repository.TaskRepository;
import com.mycompany.weeklyplanning.repository.WeekRepository;
import com.mycompany.weeklyplanning.service.api.dto.DayOfWeek;
import com.mycompany.weeklyplanning.service.api.dto.DayPlan;
import com.mycompany.weeklyplanning.service.api.dto.DayPlansList;
import com.mycompany.weeklyplanning.service.api.dto.DayUser;
import com.mycompany.weeklyplanning.service.api.dto.DayUserCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.DayUserProject;
import com.mycompany.weeklyplanning.service.api.dto.DayUserProjectAssignRequest;
import com.mycompany.weeklyplanning.service.api.dto.DayUserProjectsList;
import com.mycompany.weeklyplanning.service.api.dto.DayUsersList;
import com.mycompany.weeklyplanning.service.api.dto.PageMetadata;
import com.mycompany.weeklyplanning.service.api.dto.ProjectStatus;
import com.mycompany.weeklyplanning.service.api.dto.ProjectSummary;
import com.mycompany.weeklyplanning.service.api.dto.Task;
import com.mycompany.weeklyplanning.service.api.dto.TaskCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.TasksList;
import com.mycompany.weeklyplanning.service.api.dto.UserRole;
import com.mycompany.weeklyplanning.service.api.dto.UserStatus;
import com.mycompany.weeklyplanning.service.api.dto.UserSummary;
import com.mycompany.weeklyplanning.service.api.dto.WeekCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.WeekDetail;
import com.mycompany.weeklyplanning.service.api.dto.WeekDuplicateRequest;
import com.mycompany.weeklyplanning.service.api.dto.WeekStatus;
import com.mycompany.weeklyplanning.service.api.dto.WeekUpdateRequest;
import com.mycompany.weeklyplanning.service.api.dto.WeekSummary;
import com.mycompany.weeklyplanning.service.api.dto.WeeksPage;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WeeklyPlanningWeekApiService {

    private final AppUserRepository appUserRepository;
    private final ProjectRepository projectRepository;
    private final WeekRepository weekRepository;
    private final DayPlanRepository dayPlanRepository;
    private final DayUserRepository dayUserRepository;
    private final DayUserProjectRepository dayUserProjectRepository;
    private final TaskRepository taskRepository;
    private final int taskMinLength;

    public WeeklyPlanningWeekApiService(
        AppUserRepository appUserRepository,
        ProjectRepository projectRepository,
        WeekRepository weekRepository,
        DayPlanRepository dayPlanRepository,
        DayUserRepository dayUserRepository,
        DayUserProjectRepository dayUserProjectRepository,
        TaskRepository taskRepository,
        @Value("${application.planning.task-min-length:3}") int taskMinLength
    ) {
        this.appUserRepository = appUserRepository;
        this.projectRepository = projectRepository;
        this.weekRepository = weekRepository;
        this.dayPlanRepository = dayPlanRepository;
        this.dayUserRepository = dayUserRepository;
        this.dayUserProjectRepository = dayUserProjectRepository;
        this.taskRepository = taskRepository;
        this.taskMinLength = taskMinLength;
    }

    @Transactional(readOnly = true)
    public WeeksPage listWeeks(Integer page, Integer size, String sort) {
        Pageable pageable = toPageable(page, size, sort, Set.of("id", "label", "startDate", "endDate", "status"), "startDate");
        Page<WeekEntity> result = weekRepository.findAll(pageable);
        List<WeekSummary> items = result.getContent().stream().map(this::toWeekSummary).toList();
        return new WeeksPage().items(items).page(toPageMetadata(result));
    }

    public WeekDetail createWeek(WeekCreateRequest request) {
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new ApiValidationException(
                "startDate must be before or equal to endDate",
                List.of(new ApiFieldError("startDate", "must be before or equal to endDate"))
            );
        }
        WeekStatus status = request.getStatus() != null ? request.getStatus() : WeekStatus.DRAFT;
        if (status != WeekStatus.DRAFT) {
            throw new ApiValidationException("Weeks can only be created in DRAFT status", List.of(new ApiFieldError("status", "must be DRAFT")));
        }

        WeekEntity week = new WeekEntity().label(request.getLabel()).startDate(request.getStartDate()).endDate(request.getEndDate()).status(status);
        week = weekRepository.save(week);
        createMissingDayPlans(week);
        return toWeekDetail(loadWeek(week.getId()));
    }

    @Transactional(readOnly = true)
    public WeekDetail getWeek(UUID weekId) {
        return toWeekDetail(loadWeek(ApiIdCodec.toLong(weekId)));
    }

    public WeekDetail updateWeek(UUID weekId, WeekUpdateRequest request) {
        WeekEntity week = weekRepository.findById(ApiIdCodec.toLong(weekId)).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        if (week.getStatus() == WeekStatus.LOCKED) {
            throw new ApiConflictException("Week is LOCKED and cannot be modified");
        }
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new ApiValidationException(
                "startDate must be before or equal to endDate",
                List.of(new ApiFieldError("startDate", "must be before or equal to endDate"))
            );
        }

        week.label(request.getLabel()).startDate(request.getStartDate()).endDate(request.getEndDate());
        syncDayPlansToRange(week);

        if (request.getStatus() != null) {
            if (request.getStatus() == WeekStatus.PUBLISHED || request.getStatus() == WeekStatus.LOCKED) {
                validateWeekReadyForPublish(week);
            }
            week.status(request.getStatus());
        } else if (week.getStatus() == null) {
            week.status(WeekStatus.DRAFT);
        }

        week = weekRepository.save(week);
        return toWeekDetail(loadWeek(week.getId()));
    }

    public void deleteWeek(UUID weekId) {
        WeekEntity week = weekRepository.findById(ApiIdCodec.toLong(weekId)).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        if (week.getStatus() != null && week.getStatus() != WeekStatus.DRAFT) {
            throw new ApiConflictException("Only DRAFT weeks can be deleted");
        }
        deleteWeekTree(week.getId());
    }

    public WeekDetail duplicateWeek(UUID sourceWeekId, WeekDuplicateRequest request) {
        WeekEntity sourceWeek = loadWeek(ApiIdCodec.toLong(sourceWeekId));
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new ApiValidationException(
                "startDate must be before or equal to endDate",
                List.of(new ApiFieldError("startDate", "must be before or equal to endDate"))
            );
        }

        WeekEntity targetWeek = new WeekEntity()
            .label(request.getLabel())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .status(WeekStatus.DRAFT);
        targetWeek = weekRepository.save(targetWeek);
        createMissingDayPlans(targetWeek);

        Map<LocalDate, DayPlanEntity> targetDayPlansByDate = new HashMap<>();
        for (DayPlanEntity dp : dayPlanRepository.findAllByWeekIdOrderByDateAsc(targetWeek.getId())) {
            targetDayPlansByDate.put(dp.getDate(), dp);
        }

        LocalDate sourceStart = sourceWeek.getStartDate();
        for (DayPlanEntity sourceDayPlan : dayPlanRepository.findAllByWeekIdOrderByDateAsc(sourceWeek.getId())) {
            long offset = ChronoUnit.DAYS.between(sourceStart, sourceDayPlan.getDate());
            LocalDate targetDate = targetWeek.getStartDate().plusDays(offset);
            if (targetDate.isBefore(targetWeek.getStartDate()) || targetDate.isAfter(targetWeek.getEndDate())) {
                continue;
            }
            DayPlanEntity targetDayPlan = targetDayPlansByDate.get(targetDate);
            if (targetDayPlan == null) {
                continue;
            }

            for (DayUserEntity sourceDayUser : dayUserRepository.findAllByDayPlanIdOrderByIdAsc(sourceDayPlan.getId())) {
                DayUserEntity targetDayUser = new DayUserEntity().dayPlan(targetDayPlan).user(sourceDayUser.getUser());
                targetDayUser = dayUserRepository.save(targetDayUser);

                for (DayUserProjectEntity sourceAssignment : dayUserProjectRepository.findAllByDayUserIdOrderByIdAsc(sourceDayUser.getId())) {
                    DayUserProjectEntity targetAssignment = new DayUserProjectEntity().dayUser(targetDayUser).project(sourceAssignment.getProject());
                    targetAssignment = dayUserProjectRepository.save(targetAssignment);

                    for (TaskEntity sourceTask : taskRepository.findAllByDayUserProjectIdOrderByIdAsc(sourceAssignment.getId())) {
                        taskRepository.save(new TaskEntity().dayUserProject(targetAssignment).text(sourceTask.getText()));
                    }
                }
            }
        }

        return toWeekDetail(loadWeek(targetWeek.getId()));
    }

    @Transactional(readOnly = true)
    public DayPlansList listWeekDays(UUID weekId) {
        Long weekLongId = ApiIdCodec.toLong(weekId);
        if (!weekRepository.existsById(weekLongId)) {
            throw new ApiNotFoundException("Week not found");
        }
        List<DayPlan> items = dayPlanRepository.findAllByWeekIdOrderByDateAsc(weekLongId).stream().map(this::toDayPlan).toList();
        return new DayPlansList().items(items);
    }

    @Transactional(readOnly = true)
    public DayPlan getDayPlan(UUID weekId, LocalDate date) {
        DayPlanEntity dayPlan = dayPlanRepository
            .findOneByWeekIdAndDate(ApiIdCodec.toLong(weekId), date)
            .orElseThrow(() -> new ApiNotFoundException("Day plan not found"));
        return toDayPlan(dayPlan);
    }

    @Transactional(readOnly = true)
    public DayUsersList listDayUsers(UUID weekId, LocalDate date) {
        DayPlanEntity dayPlan = dayPlanRepository
            .findOneByWeekIdAndDate(ApiIdCodec.toLong(weekId), date)
            .orElseThrow(() -> new ApiNotFoundException("Day plan not found"));
        List<DayUser> users = dayUserRepository.findAllByDayPlanIdOrderByIdAsc(dayPlan.getId()).stream().map(this::toDayUser).toList();
        return new DayUsersList().items(users);
    }

    public DayUser addUserToDay(UUID weekId, LocalDate date, DayUserCreateRequest request) {
        WeekEntity week = weekRepository.findById(ApiIdCodec.toLong(weekId)).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        ensureWeekWritable(week);

        DayPlanEntity dayPlan = dayPlanRepository.findOneByWeekIdAndDate(week.getId(), date).orElseThrow(() -> new ApiNotFoundException("Day plan not found"));
        Long userLongId = ApiIdCodec.toLong(request.getUserId());
        AppUserEntity user = appUserRepository.findById(userLongId).orElseThrow(() -> new ApiNotFoundException("User not found"));

        if (dayUserRepository.existsByDayPlanIdAndUserId(dayPlan.getId(), userLongId)) {
            throw new ApiConflictException("User is already assigned to the day");
        }

        DayUserEntity dayUser = dayUserRepository.save(new DayUserEntity().dayPlan(dayPlan).user(user));
        return toDayUser(dayUser);
    }

    public void removeUserFromDay(UUID weekId, LocalDate date, UUID userId) {
        WeekEntity week = weekRepository.findById(ApiIdCodec.toLong(weekId)).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        ensureWeekWritable(week);

        DayPlanEntity dayPlan = dayPlanRepository.findOneByWeekIdAndDate(week.getId(), date).orElseThrow(() -> new ApiNotFoundException("Day plan not found"));
        Long userLongId = ApiIdCodec.toLong(userId);
        DayUserEntity dayUser = dayUserRepository
            .findOneByDayPlanIdAndUserId(dayPlan.getId(), userLongId)
            .orElseThrow(() -> new ApiNotFoundException("User assignment not found"));

        if ((week.getStatus() == WeekStatus.PUBLISHED || week.getStatus() == WeekStatus.LOCKED) && dayUserRepository.countByDayPlanId(dayPlan.getId()) <= 1) {
            throw new ApiConflictException("A published week day must have at least one user");
        }

        deleteDayUserTree(dayUser.getId());
    }

    @Transactional(readOnly = true)
    public DayUserProjectsList listDayUserProjects(UUID weekId, LocalDate date, UUID userId) {
        DayUserEntity dayUser = loadDayUser(ApiIdCodec.toLong(weekId), date, ApiIdCodec.toLong(userId));
        List<DayUserProject> items = dayUserProjectRepository.findAllByDayUserIdOrderByIdAsc(dayUser.getId()).stream().map(this::toDayUserProject).toList();
        return new DayUserProjectsList().items(items);
    }

    public DayUserProject assignProjectToDayUser(UUID weekId, LocalDate date, UUID userId, DayUserProjectAssignRequest request) {
        WeekEntity week = weekRepository.findById(ApiIdCodec.toLong(weekId)).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        ensureWeekWritable(week);

        DayUserEntity dayUser = loadDayUser(week.getId(), date, ApiIdCodec.toLong(userId));
        Long projectLongId = ApiIdCodec.toLong(request.getProjectId());
        ProjectEntity project = projectRepository.findById(projectLongId).orElseThrow(() -> new ApiNotFoundException("Project not found"));

        if (dayUserProjectRepository.existsByDayUserIdAndProjectId(dayUser.getId(), projectLongId)) {
            throw new ApiConflictException("Project is already assigned to the user on this day");
        }

        DayUserProjectEntity assignment = dayUserProjectRepository.save(new DayUserProjectEntity().dayUser(dayUser).project(project));
        return toDayUserProject(assignment);
    }

    public void removeProjectFromDayUser(UUID weekId, LocalDate date, UUID userId, UUID projectId) {
        WeekEntity week = weekRepository.findById(ApiIdCodec.toLong(weekId)).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        ensureWeekWritable(week);

        DayUserEntity dayUser = loadDayUser(week.getId(), date, ApiIdCodec.toLong(userId));
        Long projectLongId = ApiIdCodec.toLong(projectId);
        DayUserProjectEntity assignment = dayUserProjectRepository
            .findOneByDayUserIdAndProjectId(dayUser.getId(), projectLongId)
            .orElseThrow(() -> new ApiNotFoundException("Project assignment not found"));

        if ((week.getStatus() == WeekStatus.PUBLISHED || week.getStatus() == WeekStatus.LOCKED) && dayUserProjectRepository.countByDayUserId(dayUser.getId()) <= 1) {
            throw new ApiConflictException("A published week day user must have at least one project");
        }

        deleteDayUserProjectTree(assignment.getId());
    }

    @Transactional(readOnly = true)
    public TasksList listTasks(UUID weekId, LocalDate date, UUID userId, UUID projectId) {
        DayUserProjectEntity assignment = loadAssignment(ApiIdCodec.toLong(weekId), date, ApiIdCodec.toLong(userId), ApiIdCodec.toLong(projectId));
        List<Task> tasks = taskRepository.findAllByDayUserProjectIdOrderByIdAsc(assignment.getId()).stream().map(this::toTask).toList();
        return new TasksList().items(tasks);
    }

    public Task addTask(UUID weekId, LocalDate date, UUID userId, UUID projectId, TaskCreateRequest request) {
        WeekEntity week = weekRepository.findById(ApiIdCodec.toLong(weekId)).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        ensureWeekWritable(week);

        DayUserProjectEntity assignment = loadAssignment(week.getId(), date, ApiIdCodec.toLong(userId), ApiIdCodec.toLong(projectId));

        String text = request.getText() != null ? request.getText().trim() : "";
        if (text.length() < taskMinLength) {
            throw new ApiValidationException(
                "Task text is too short",
                List.of(new ApiFieldError("text", "minimum length is " + taskMinLength))
            );
        }

        TaskEntity entity = taskRepository.save(new TaskEntity().dayUserProject(assignment).text(text));
        return toTask(entity);
    }

    public void removeTask(UUID weekId, LocalDate date, UUID userId, UUID projectId, UUID taskId) {
        WeekEntity week = weekRepository.findById(ApiIdCodec.toLong(weekId)).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        ensureWeekWritable(week);

        DayUserProjectEntity assignment = loadAssignment(week.getId(), date, ApiIdCodec.toLong(userId), ApiIdCodec.toLong(projectId));
        Long taskLongId = ApiIdCodec.toLong(taskId);
        TaskEntity task = taskRepository.findById(taskLongId).orElseThrow(() -> new ApiNotFoundException("Task not found"));
        if (task.getDayUserProject() == null || !assignment.getId().equals(task.getDayUserProject().getId())) {
            throw new ApiNotFoundException("Task not found");
        }

        if ((week.getStatus() == WeekStatus.PUBLISHED || week.getStatus() == WeekStatus.LOCKED) && taskRepository.countByDayUserProjectId(assignment.getId()) <= 1) {
            throw new ApiConflictException("A published week project must have at least one task");
        }

        taskRepository.delete(task);
    }

    private Pageable toPageable(Integer page, Integer size, String sort, Set<String> allowedProperties, String defaultSortProperty) {
        int p = page != null ? page : 0;
        int s = size != null ? size : 20;
        Sort springSort = parseSort(sort, allowedProperties, defaultSortProperty);
        return PageRequest.of(p, s, springSort);
    }

    private Sort parseSort(String sort, Set<String> allowedProperties, String defaultSortProperty) {
        if (sort == null || sort.isBlank()) {
            return Sort.by(Sort.Order.asc(defaultSortProperty));
        }
        String[] criteria = sort.split(";");
        List<Sort.Order> orders = new ArrayList<>();
        for (String c : criteria) {
            String trimmed = c.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            String[] parts = trimmed.split(",", 2);
            String property = parts[0].trim();
            if (!allowedProperties.contains(property)) {
                continue;
            }
            boolean desc = parts.length == 2 && "desc".equalsIgnoreCase(parts[1].trim());
            orders.add(desc ? Sort.Order.desc(property) : Sort.Order.asc(property));
        }
        return orders.isEmpty() ? Sort.by(Sort.Order.asc(defaultSortProperty)) : Sort.by(orders);
    }

    private PageMetadata toPageMetadata(Page<?> page) {
        return new PageMetadata()
            .page(page.getNumber())
            .size(page.getSize())
            .totalElements(Math.toIntExact(page.getTotalElements()))
            .totalPages(page.getTotalPages());
    }

    private WeekSummary toWeekSummary(WeekEntity entity) {
        WeekStatus status = entity.getStatus() != null ? entity.getStatus() : WeekStatus.DRAFT;
        return new WeekSummary()
            .id(ApiIdCodec.toUuid(entity.getId()))
            .label(entity.getLabel())
            .startDate(entity.getStartDate())
            .endDate(entity.getEndDate())
            .status(status);
    }

    private WeekDetail toWeekDetail(WeekEntity entity) {
        WeekDetail detail = new WeekDetail()
            .id(ApiIdCodec.toUuid(entity.getId()))
            .label(entity.getLabel())
            .startDate(entity.getStartDate())
            .endDate(entity.getEndDate())
            .status(entity.getStatus() != null ? entity.getStatus() : WeekStatus.DRAFT);

        List<DayPlan> dayPlans = dayPlanRepository.findAllByWeekIdOrderByDateAsc(entity.getId()).stream().map(this::toDayPlan).toList();
        detail.dayPlans(dayPlans);
        return detail;
    }

    private DayPlan toDayPlan(DayPlanEntity entity) {
        List<DayUser> users = dayUserRepository.findAllByDayPlanIdOrderByIdAsc(entity.getId()).stream().map(this::toDayUser).toList();
        return new DayPlan().date(entity.getDate()).dayOfWeek(toApiDayOfWeek(entity.getDate())).users(users);
    }

    private DayUser toDayUser(DayUserEntity entity) {
        List<DayUserProject> projects = dayUserProjectRepository
            .findAllByDayUserIdOrderByIdAsc(entity.getId())
            .stream()
            .map(this::toDayUserProject)
            .toList();
        return new DayUser().user(toUserSummary(entity.getUser())).projects(projects);
    }

    private DayUserProject toDayUserProject(DayUserProjectEntity entity) {
        List<Task> tasks = taskRepository.findAllByDayUserProjectIdOrderByIdAsc(entity.getId()).stream().map(this::toTask).toList();
        return new DayUserProject().project(toProjectSummary(entity.getProject())).tasks(tasks);
    }

    private Task toTask(TaskEntity entity) {
        return new Task().id(ApiIdCodec.toUuid(entity.getId())).text(entity.getText());
    }

    private UserSummary toUserSummary(AppUserEntity entity) {
        UUID id = ApiIdCodec.toUuid(entity.getId());
        String email = entity.getEmail() != null ? entity.getEmail() : ("unknown+" + id + "@example.invalid");
        return new UserSummary().id(id).name(entity.getName()).email(email);
    }

    private ProjectSummary toProjectSummary(ProjectEntity entity) {
        return new ProjectSummary()
            .id(ApiIdCodec.toUuid(entity.getId()))
            .name(entity.getName())
            .code(entity.getCode() != null ? entity.getCode() : ("P-" + entity.getId()))
            .status(entity.getStatus() != null ? entity.getStatus() : ProjectStatus.ACTIVE);
    }

    private DayOfWeek toApiDayOfWeek(LocalDate date) {
        return switch (date.getDayOfWeek()) {
            case MONDAY -> DayOfWeek.MONDAY;
            case TUESDAY -> DayOfWeek.TUESDAY;
            case WEDNESDAY -> DayOfWeek.WEDNESDAY;
            case THURSDAY -> DayOfWeek.THURSDAY;
            case FRIDAY -> DayOfWeek.FRIDAY;
            case SATURDAY -> DayOfWeek.SATURDAY;
            case SUNDAY -> DayOfWeek.SUNDAY;
        };
    }

    private WeekEntity loadWeek(Long weekId) {
        WeekEntity week = weekRepository.findById(weekId).orElseThrow(() -> new ApiNotFoundException("Week not found"));
        createMissingDayPlans(week);
        return week;
    }

    private void ensureWeekWritable(WeekEntity week) {
        if (week.getStatus() == WeekStatus.LOCKED) {
            throw new ApiConflictException("Week is LOCKED and cannot be modified");
        }
    }

    private void createMissingDayPlans(WeekEntity week) {
        LocalDate date = week.getStartDate();
        while (!date.isAfter(week.getEndDate())) {
            if (!dayPlanRepository.existsByWeekIdAndDate(week.getId(), date)) {
                dayPlanRepository.save(new DayPlanEntity().week(week).date(date));
            }
            date = date.plusDays(1);
        }
    }

    private void syncDayPlansToRange(WeekEntity week) {
        List<DayPlanEntity> existing = dayPlanRepository.findAllByWeekIdOrderByDateAsc(week.getId());
        for (DayPlanEntity d : existing) {
            if (d.getDate().isBefore(week.getStartDate()) || d.getDate().isAfter(week.getEndDate())) {
                deleteDayPlanTree(d.getId());
            }
        }
        createMissingDayPlans(week);
    }

    private void validateWeekReadyForPublish(WeekEntity week) {
        List<ApiFieldError> errors = new ArrayList<>();
        List<DayPlanEntity> dayPlans = dayPlanRepository.findAllByWeekIdOrderByDateAsc(week.getId());

        for (DayPlanEntity dayPlan : dayPlans) {
            List<DayUserEntity> dayUsers = dayUserRepository.findAllByDayPlanIdOrderByIdAsc(dayPlan.getId());
            if (dayUsers.isEmpty()) {
                errors.add(new ApiFieldError("dayPlans", "Day " + dayPlan.getDate() + " must have at least one user"));
                continue;
            }

            Set<Long> seenUsers = new HashSet<>();
            for (DayUserEntity dayUser : dayUsers) {
                Long uid = dayUser.getUser() != null ? dayUser.getUser().getId() : null;
                if (uid != null && !seenUsers.add(uid)) {
                    errors.add(new ApiFieldError("dayUsers", "User duplicated on " + dayPlan.getDate()));
                }

                List<DayUserProjectEntity> projects = dayUserProjectRepository.findAllByDayUserIdOrderByIdAsc(dayUser.getId());
                if (projects.isEmpty()) {
                    errors.add(new ApiFieldError("projects", "User must have at least one project on " + dayPlan.getDate()));
                    continue;
                }

                Set<Long> seenProjects = new HashSet<>();
                for (DayUserProjectEntity assignment : projects) {
                    Long pid = assignment.getProject() != null ? assignment.getProject().getId() : null;
                    if (pid != null && !seenProjects.add(pid)) {
                        errors.add(new ApiFieldError("projects", "Project duplicated for a user on " + dayPlan.getDate()));
                    }

                    List<TaskEntity> tasks = taskRepository.findAllByDayUserProjectIdOrderByIdAsc(assignment.getId());
                    if (tasks.isEmpty()) {
                        errors.add(new ApiFieldError("tasks", "Project must have at least one task on " + dayPlan.getDate()));
                        continue;
                    }
                    for (TaskEntity task : tasks) {
                        String text = task.getText() != null ? task.getText().trim() : "";
                        if (text.length() < taskMinLength) {
                            errors.add(new ApiFieldError("tasks", "Task text must have at least " + taskMinLength + " characters"));
                        }
                    }
                }
            }
        }

        if (!errors.isEmpty()) {
            throw new ApiValidationException("Week is not ready to be published", errors);
        }
    }

    private DayUserEntity loadDayUser(Long weekId, LocalDate date, Long userId) {
        DayPlanEntity dayPlan = dayPlanRepository.findOneByWeekIdAndDate(weekId, date).orElseThrow(() -> new ApiNotFoundException("Day plan not found"));
        return dayUserRepository.findOneByDayPlanIdAndUserId(dayPlan.getId(), userId).orElseThrow(() -> new ApiNotFoundException("User assignment not found"));
    }

    private DayUserProjectEntity loadAssignment(Long weekId, LocalDate date, Long userId, Long projectId) {
        DayUserEntity dayUser = loadDayUser(weekId, date, userId);
        return dayUserProjectRepository
            .findOneByDayUserIdAndProjectId(dayUser.getId(), projectId)
            .orElseThrow(() -> new ApiNotFoundException("Project assignment not found"));
    }

    private void deleteWeekTree(Long weekId) {
        for (DayPlanEntity dayPlan : dayPlanRepository.findAllByWeekIdOrderByDateAsc(weekId)) {
            deleteDayPlanTree(dayPlan.getId());
        }
        weekRepository.deleteById(weekId);
    }

    private void deleteDayPlanTree(Long dayPlanId) {
        for (DayUserEntity dayUser : dayUserRepository.findAllByDayPlanIdOrderByIdAsc(dayPlanId)) {
            deleteDayUserTree(dayUser.getId());
        }
        dayPlanRepository.deleteById(dayPlanId);
    }

    private void deleteDayUserTree(Long dayUserId) {
        for (DayUserProjectEntity assignment : dayUserProjectRepository.findAllByDayUserIdOrderByIdAsc(dayUserId)) {
            deleteDayUserProjectTree(assignment.getId());
        }
        dayUserRepository.deleteById(dayUserId);
    }

    private void deleteDayUserProjectTree(Long dayUserProjectId) {
        List<TaskEntity> tasks = taskRepository.findAllByDayUserProjectIdOrderByIdAsc(dayUserProjectId);
        if (!tasks.isEmpty()) {
            taskRepository.deleteAll(tasks);
        }
        dayUserProjectRepository.deleteById(dayUserProjectId);
    }
}
