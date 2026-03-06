package com.example.weeklyplanning.service;

import com.example.weeklyplanning.config.PlanningProperties;
import com.example.weeklyplanning.domain.DayPlanEntity;
import com.example.weeklyplanning.domain.DayProjectEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PlanningAssignmentEntity;
import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.domain.TaskEntity;
import com.example.weeklyplanning.domain.WeekEntity;
import com.example.weeklyplanning.domain.WeekStatus;
import com.example.weeklyplanning.repository.DayPlanRepository;
import com.example.weeklyplanning.repository.DayProjectRepository;
import com.example.weeklyplanning.repository.PersonRepository;
import com.example.weeklyplanning.repository.PlanningAssignmentRepository;
import com.example.weeklyplanning.repository.ProjectRepository;
import com.example.weeklyplanning.repository.TaskRepository;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.dto.AssignmentCreateRequest;
import com.example.weeklyplanning.service.dto.AssignmentUpdateRequest;
import com.example.weeklyplanning.service.dto.DayPlan;
import com.example.weeklyplanning.service.dto.DayProject;
import com.example.weeklyplanning.service.dto.PlanningAssignment;
import com.example.weeklyplanning.service.dto.Task;
import com.example.weeklyplanning.service.dto.TaskCreateRequest;
import com.example.weeklyplanning.service.dto.TaskUpdateRequest;
import com.example.weeklyplanning.service.dto.WeekPlanningBoard;
import com.example.weeklyplanning.service.mapper.ApiMapper;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.ForbiddenException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;
import com.example.weeklyplanning.web.rest.errors.UnprocessableEntityException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PlanningService {

    private final WeekService weekService;
    private final DayPlanRepository dayPlanRepository;
    private final DayProjectRepository dayProjectRepository;
    private final ProjectRepository projectRepository;
    private final PersonRepository personRepository;
    private final PlanningAssignmentRepository planningAssignmentRepository;
    private final TaskRepository taskRepository;
    private final ApiMapper apiMapper;
    private final PlanningProperties planningProperties;
    private final AuditService auditService;

    public PlanningService(WeekService weekService,
                           DayPlanRepository dayPlanRepository,
                           DayProjectRepository dayProjectRepository,
                           ProjectRepository projectRepository,
                           PersonRepository personRepository,
                           PlanningAssignmentRepository planningAssignmentRepository,
                           TaskRepository taskRepository,
                           ApiMapper apiMapper,
                           PlanningProperties planningProperties,
                           AuditService auditService) {
        this.weekService = weekService;
        this.dayPlanRepository = dayPlanRepository;
        this.dayProjectRepository = dayProjectRepository;
        this.projectRepository = projectRepository;
        this.personRepository = personRepository;
        this.planningAssignmentRepository = planningAssignmentRepository;
        this.taskRepository = taskRepository;
        this.apiMapper = apiMapper;
        this.planningProperties = planningProperties;
        this.auditService = auditService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public WeekPlanningBoard getWeekPlanningBoard(UUID weekId, AuthenticatedPrincipal principal) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        List<DayPlanEntity> dayPlans = dayPlanRepository.findPlanningBoardByWeekId(weekId);

        UUID viewerPersonId = principal.isAdmin() ? null : principal.getPersonId();
        List<DayPlan> mapped = dayPlans.stream().map(plan -> apiMapper.toDayPlan(plan, viewerPersonId)).toList();

        return new WeekPlanningBoard(apiMapper.toWeekSummary(week), week.getStatus() == WeekStatus.COMPLETED, mapped);
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public List<DayPlan> listWeekDayPlans(UUID weekId, AuthenticatedPrincipal principal) {
        weekService.getWeekEntity(weekId);
        List<DayPlanEntity> dayPlans = dayPlanRepository.findPlanningBoardByWeekId(weekId);

        UUID viewerPersonId = principal.isAdmin() ? null : principal.getPersonId();
        return dayPlans.stream().map(plan -> apiMapper.toDayPlan(plan, viewerPersonId)).toList();
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public DayPlan getDayPlanById(UUID weekId, UUID dayPlanId, AuthenticatedPrincipal principal) {
        DayPlanEntity dayPlan = dayPlanRepository.findPlanningBoardDayByWeekIdAndDayPlanId(weekId, dayPlanId)
            .orElseThrow(() -> new NotFoundException("Day plan not found."));

        UUID viewerPersonId = principal.isAdmin() ? null : principal.getPersonId();
        return apiMapper.toDayPlan(dayPlan, viewerPersonId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public DayProject upsertDayPlanProject(UUID weekId, UUID dayPlanId, UUID projectId, AuthenticatedPrincipal actor) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        ensureWeekWritable(week);

        DayPlanEntity dayPlan = getDayPlan(weekId, dayPlanId);
        ProjectEntity project = projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("Project not found."));

        DayProjectEntity dayProject = dayProjectRepository.findByDayPlanIdAndProjectId(dayPlan.getId(), projectId)
            .orElseGet(() -> {
                DayProjectEntity created = new DayProjectEntity();
                created.setDayPlan(dayPlan);
                created.setProject(project);
                return dayProjectRepository.save(created);
            });

        auditService.audit(actor.getAccountId(), actor.getUsername(), "UPSERT_DAY_PROJECT", "DAY_PROJECT", dayProject.getId(), "Day project upserted", true);
        return apiMapper.toDayProject(dayProject, null);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDayPlanProject(UUID weekId, UUID dayPlanId, UUID projectId, AuthenticatedPrincipal actor) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        ensureWeekWritable(week);

        DayPlanEntity dayPlan = getDayPlan(weekId, dayPlanId);
        DayProjectEntity dayProject = dayProjectRepository.findByDayPlanIdAndProjectId(dayPlan.getId(), projectId)
            .orElseThrow(() -> new NotFoundException("Day project not found."));

        dayProjectRepository.delete(dayProject);
        auditService.audit(actor.getAccountId(), actor.getUsername(), "DELETE_DAY_PROJECT", "DAY_PROJECT", dayProject.getId(), "Day project deleted", true);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public PlanningAssignment createPlanningAssignment(UUID weekId,
                                                       UUID dayPlanId,
                                                       UUID projectId,
                                                       AssignmentCreateRequest request,
                                                       AuthenticatedPrincipal actor) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        ensureWeekWritable(week);

        validateTaskLength(request.taskDescription());

        DayProjectEntity dayProject = getDayProject(weekId, dayPlanId, projectId);
        if (planningAssignmentRepository.findByDayProjectIdAndPersonId(dayProject.getId(), request.personId()).isPresent()) {
            throw new ConflictException("Person is already assigned to this day/project.");
        }

        PersonEntity person = personRepository.findById(request.personId())
            .orElseThrow(() -> new NotFoundException("Person not found."));

        PlanningAssignmentEntity assignment = new PlanningAssignmentEntity();
        assignment.setDayProject(dayProject);
        assignment.setPerson(person);
        assignment.setEstimatedHours(request.estimatedHours());
        assignment.setActualHours(request.actualHours());

        TaskEntity firstTask = new TaskEntity();
        firstTask.setAssignment(assignment);
        firstTask.setDescription(request.taskDescription().trim());
        assignment.getTasks().add(firstTask);

        planningAssignmentRepository.save(assignment);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "CREATE_ASSIGNMENT", "ASSIGNMENT", assignment.getId(), "Assignment created", true);
        return apiMapper.toPlanningAssignment(assignment);
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    public PlanningAssignment updatePlanningAssignment(UUID weekId,
                                                       UUID dayPlanId,
                                                       UUID projectId,
                                                       UUID assignmentId,
                                                       AssignmentUpdateRequest request,
                                                       AuthenticatedPrincipal actor) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        ensureWeekWritable(week);

        PlanningAssignmentEntity assignment = getAssignment(weekId, dayPlanId, projectId, assignmentId);

        if (actor.isAdmin()) {
            assignment.setEstimatedHours(request.estimatedHours());
            assignment.setActualHours(request.actualHours());
        } else {
            if (!assignment.getPerson().getId().equals(actor.getPersonId())) {
                throw new ForbiddenException("Only assigned person can update actual hours.");
            }
            if (!request.estimatedHours().equals(assignment.getEstimatedHours())) {
                throw new ForbiddenException("Assigned person cannot change estimated hours.");
            }
            assignment.setActualHours(request.actualHours());
        }

        planningAssignmentRepository.save(assignment);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "UPDATE_ASSIGNMENT", "ASSIGNMENT", assignment.getId(), "Assignment updated", true);
        return apiMapper.toPlanningAssignment(assignment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deletePlanningAssignment(UUID weekId,
                                         UUID dayPlanId,
                                         UUID projectId,
                                         UUID assignmentId,
                                         AuthenticatedPrincipal actor) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        ensureWeekWritable(week);

        PlanningAssignmentEntity assignment = getAssignment(weekId, dayPlanId, projectId, assignmentId);
        planningAssignmentRepository.delete(assignment);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "DELETE_ASSIGNMENT", "ASSIGNMENT", assignment.getId(), "Assignment deleted", true);
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    public Task createAssignmentTask(UUID weekId,
                                     UUID dayPlanId,
                                     UUID projectId,
                                     UUID assignmentId,
                                     TaskCreateRequest request,
                                     AuthenticatedPrincipal actor) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        ensureWeekWritable(week);

        validateTaskLength(request.description());
        PlanningAssignmentEntity assignment = getAssignment(weekId, dayPlanId, projectId, assignmentId);
        ensureCanModifyTask(actor, assignment);

        TaskEntity task = new TaskEntity();
        task.setAssignment(assignment);
        task.setDescription(request.description().trim());
        taskRepository.save(task);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "CREATE_TASK", "TASK", task.getId(), "Task created", true);
        return apiMapper.toTask(task);
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    public Task updateAssignmentTask(UUID weekId,
                                     UUID dayPlanId,
                                     UUID projectId,
                                     UUID assignmentId,
                                     UUID taskId,
                                     TaskUpdateRequest request,
                                     AuthenticatedPrincipal actor) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        ensureWeekWritable(week);

        validateTaskLength(request.description());
        PlanningAssignmentEntity assignment = getAssignment(weekId, dayPlanId, projectId, assignmentId);
        ensureCanModifyTask(actor, assignment);

        TaskEntity task = taskRepository.findByIdAndAssignmentId(taskId, assignment.getId())
            .orElseThrow(() -> new NotFoundException("Task not found."));

        task.setDescription(request.description().trim());
        taskRepository.save(task);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "UPDATE_TASK", "TASK", task.getId(), "Task updated", true);
        return apiMapper.toTask(task);
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    public void deleteAssignmentTask(UUID weekId,
                                     UUID dayPlanId,
                                     UUID projectId,
                                     UUID assignmentId,
                                     UUID taskId,
                                     AuthenticatedPrincipal actor) {
        WeekEntity week = weekService.getWeekEntity(weekId);
        ensureWeekWritable(week);

        PlanningAssignmentEntity assignment = getAssignment(weekId, dayPlanId, projectId, assignmentId);
        ensureCanModifyTask(actor, assignment);

        TaskEntity task = taskRepository.findByIdAndAssignmentId(taskId, assignment.getId())
            .orElseThrow(() -> new NotFoundException("Task not found."));
        taskRepository.delete(task);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "DELETE_TASK", "TASK", task.getId(), "Task deleted", true);
    }

    private DayPlanEntity getDayPlan(UUID weekId, UUID dayPlanId) {
        return dayPlanRepository.findByIdAndWeekId(dayPlanId, weekId)
            .orElseThrow(() -> new NotFoundException("Day plan not found."));
    }

    private DayProjectEntity getDayProject(UUID weekId, UUID dayPlanId, UUID projectId) {
        getDayPlan(weekId, dayPlanId);
        return dayProjectRepository.findByDayPlanIdAndProjectId(dayPlanId, projectId)
            .orElseThrow(() -> new NotFoundException("Day project not found."));
    }

    private PlanningAssignmentEntity getAssignment(UUID weekId, UUID dayPlanId, UUID projectId, UUID assignmentId) {
        return planningAssignmentRepository.findByHierarchy(weekId, dayPlanId, projectId, assignmentId)
            .orElseThrow(() -> new NotFoundException("Assignment not found."));
    }

    private void ensureWeekWritable(WeekEntity week) {
        if (week.getStatus() == WeekStatus.COMPLETED) {
            throw new ConflictException("Week is completed and read-only.");
        }
    }

    private void ensureCanModifyTask(AuthenticatedPrincipal principal, PlanningAssignmentEntity assignment) {
        if (principal.isAdmin()) {
            return;
        }
        if (!assignment.getPerson().getId().equals(principal.getPersonId())) {
            throw new ForbiddenException("Only assigned person can modify this task.");
        }
    }

    private void validateTaskLength(String description) {
        if (description == null || description.trim().length() < planningProperties.getTaskMinLength()) {
            throw new UnprocessableEntityException("Task description does not meet minimum length policy.");
        }
    }
}
