package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.DayPersonEntity;
import com.example.weeklyplanning.domain.DayPersonProjectEntity;
import com.example.weeklyplanning.domain.DayPlanEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.domain.TaskEntity;
import com.example.weeklyplanning.domain.WeekEntity;
import com.example.weeklyplanning.domain.enumeration.AccountRole;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import com.example.weeklyplanning.domain.enumeration.ProjectStatus;
import com.example.weeklyplanning.repository.DayPersonProjectRepository;
import com.example.weeklyplanning.repository.DayPersonRepository;
import com.example.weeklyplanning.repository.DayPlanRepository;
import com.example.weeklyplanning.repository.PersonRepository;
import com.example.weeklyplanning.repository.ProjectRepository;
import com.example.weeklyplanning.repository.TaskRepository;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.mapper.PlanningMapper;
import com.example.weeklyplanning.service.mapper.WeekMapper;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;

import org.springframework.security.access.method.P;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class PlanningService {

    private final WeekService weekService;
    private final WeekMapper weekMapper;
    private final PlanningMapper planningMapper;
    private final DayPlanRepository dayPlanRepository;
    private final DayPersonRepository dayPersonRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final TaskRepository taskRepository;
    private final PersonRepository personRepository;
    private final ProjectRepository projectRepository;
    private final AuditService auditService;

    public PlanningService(
        WeekService weekService,
        WeekMapper weekMapper,
        PlanningMapper planningMapper,
        DayPlanRepository dayPlanRepository,
        DayPersonRepository dayPersonRepository,
        DayPersonProjectRepository dayPersonProjectRepository,
        TaskRepository taskRepository,
        PersonRepository personRepository,
        ProjectRepository projectRepository,
        AuditService auditService
    ) {
        this.weekService = weekService;
        this.weekMapper = weekMapper;
        this.planningMapper = planningMapper;
        this.dayPlanRepository = dayPlanRepository;
        this.dayPersonRepository = dayPersonRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.taskRepository = taskRepository;
        this.personRepository = personRepository;
        this.projectRepository = projectRepository;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    //@PreAuthorize("hasRole('ADMIN') OR #personId == authentication.principal.personId")
    public ApiSchemas.WeekPlanningBoard getWeekPlanningBoard(
        UUID weekId,
        UUID personId,
        Boolean includeEmptyDays,
        AuthenticatedPrincipal principal
    ) {
        // Buscar week simples (sem graph)
        WeekEntity week = weekService.findWeekOrThrow(weekId);

        // Buscar dayPlans com o graph já definido no DayPlanRepository
        List<DayPlanEntity> dayPlanEntities = dayPlanRepository.findByWeek_WeekIdOrderByDateAsc(weekId);

        UUID filterPersonId = resolveFilterPersonId(principal, personId);
        boolean includeEmpty = includeEmptyDays == null || includeEmptyDays;

        List<ApiSchemas.DayPlan> dayPlans = dayPlanEntities.stream()
            .sorted(Comparator.comparing(DayPlanEntity::getDate))
            .map(dayPlan -> planningMapper.toDayPlan(dayPlan, filterPersonId, true))
            .filter(dayPlan -> includeEmpty || !dayPlan.dayPersons().isEmpty())
            .toList();

        return new ApiSchemas.WeekPlanningBoard(weekMapper.toDetail(week), dayPlans);
    }


    @Transactional(readOnly = true)
    public ApiSchemas.DayPlanCollection listWeekDayPlans(UUID weekId, Boolean includeAssignments, AuthenticatedPrincipal principal) {
        List<DayPlanEntity> dayPlans = dayPlanRepository.findByWeek_WeekIdOrderByDateAsc(weekId);
        if (dayPlans.isEmpty()) {
            weekService.findWeekOrThrow(weekId);
        }

        UUID filterPersonId = resolveFilterPersonId(principal, null);
        boolean include = includeAssignments == null || includeAssignments;

        List<ApiSchemas.DayPlan> mapped = dayPlans.stream()
            .map(dayPlan -> planningMapper.toDayPlan(dayPlan, filterPersonId, include))
            .toList();

        return new ApiSchemas.DayPlanCollection(weekId, mapped);
    }

    @Transactional(readOnly = true)
    public ApiSchemas.DayPlan getWeekDayPlanById(UUID weekId, UUID dayPlanId, AuthenticatedPrincipal principal) {
        DayPlanEntity dayPlan = dayPlanRepository.findByDayPlanIdAndWeek_WeekId(dayPlanId, weekId)
            .orElseThrow(() -> new NotFoundException("Day plan not found"));

        UUID filterPersonId = resolveFilterPersonId(principal, null);
        return planningMapper.toDayPlan(dayPlan, filterPersonId, true);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    //@PreAuthorize("hasRole('ADMIN') AND @authorizationService.dayPlanBelongsToWeek(#weekId, #dayPlanId)")
    public ApiSchemas.DayPerson addPersonToDayPlan(
        UUID weekId,
        UUID dayPlanId,
        ApiSchemas.AddPersonToDayRequest request,
        String actor
    ) {
        DayPlanEntity dayPlan = dayPlanRepository.findByDayPlanIdAndWeek_WeekId(dayPlanId, weekId)
            .orElseThrow(() -> new NotFoundException("Day plan not found"));

        weekService.assertPlanningWritable(dayPlan.getWeek());

        PersonEntity person = personRepository.findByPersonId(request.personId())
            .orElseThrow(() -> new NotFoundException("Person not found"));

        if (person.getStatus() != PersonStatus.ACTIVE) {
            throw new ConflictException("Inactive person cannot be assigned to planning");
        }

        if (dayPersonRepository.existsByDayPlan_DayPlanIdAndPerson_PersonId(dayPlanId, request.personId())) {
            throw new ConflictException("Person already assigned to this day");
        }

        DayPersonEntity dayPerson = new DayPersonEntity();
        dayPerson.setDayPersonId(UUID.randomUUID());
        dayPerson.setDayPlan(dayPlan);
        dayPerson.setPerson(person);

        DayPersonEntity saved = dayPersonRepository.save(dayPerson);
        auditService.entityEvent("DAY_PERSON", "CREATE", saved.getDayPersonId(), actor);
        return planningMapper.toDayPerson(saved);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void removePersonFromDayPlan(UUID weekId, UUID dayPlanId, UUID dayPersonId, String actor) {
        DayPersonEntity dayPerson = dayPersonRepository
            .findByDayPersonIdAndDayPlan_DayPlanIdAndDayPlan_Week_WeekId(dayPersonId, dayPlanId, weekId)
            .orElseThrow(() -> new NotFoundException("Day person assignment not found"));

        weekService.assertPlanningWritable(dayPerson.getDayPlan().getWeek());
        dayPersonRepository.delete(dayPerson);
        auditService.entityEvent("DAY_PERSON", "DELETE", dayPersonId, actor);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ApiSchemas.DayPersonProject addProjectToDayPerson(
        UUID weekId,
        UUID dayPlanId,
        UUID dayPersonId,
        ApiSchemas.AddProjectToDayPersonRequest request,
        String actor
    ) {
        DayPersonEntity dayPerson = dayPersonRepository
            .findByDayPersonIdAndDayPlan_DayPlanIdAndDayPlan_Week_WeekId(dayPersonId, dayPlanId, weekId)
            .orElseThrow(() -> new NotFoundException("Day person assignment not found"));

        weekService.assertPlanningWritable(dayPerson.getDayPlan().getWeek());

        ProjectEntity project = projectRepository.findById(request.projectId())
            .orElseThrow(() -> new NotFoundException("Project not found"));

        if (project.getStatus() != ProjectStatus.ACTIVE) {
            throw new ConflictException("Inactive project cannot be assigned to planning");
        }

        if (dayPersonProjectRepository.existsByDayPerson_DayPersonIdAndProject_ProjectId(dayPersonId, request.projectId())) {
            throw new ConflictException("Project already assigned for this person/day");
        }

        DayPersonProjectEntity assignment = new DayPersonProjectEntity();
        assignment.setDayPersonProjectId(UUID.randomUUID());
        assignment.setDayPerson(dayPerson);
        assignment.setProject(project);

        DayPersonProjectEntity saved = dayPersonProjectRepository.save(assignment);
        auditService.entityEvent("DAY_PERSON_PROJECT", "CREATE", saved.getDayPersonProjectId(), actor);
        return planningMapper.toDayPersonProject(saved);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void removeProjectFromDayPerson(
        UUID weekId,
        UUID dayPlanId,
        UUID dayPersonId,
        UUID dayPersonProjectId,
        String actor
    ) {
        DayPersonProjectEntity assignment = dayPersonProjectRepository
            .findByDayPersonProjectIdAndDayPerson_DayPersonIdAndDayPerson_DayPlan_DayPlanIdAndDayPerson_DayPlan_Week_WeekId(
                dayPersonProjectId,
                dayPersonId,
                dayPlanId,
                weekId
            )
            .orElseThrow(() -> new NotFoundException("Day person project assignment not found"));

        weekService.assertPlanningWritable(assignment.getDayPerson().getDayPlan().getWeek());
        dayPersonProjectRepository.delete(assignment);
        auditService.entityEvent("DAY_PERSON_PROJECT", "DELETE", dayPersonProjectId, actor);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ApiSchemas.Task addTaskToDayPersonProject(
        UUID weekId,
        UUID dayPlanId,
        UUID dayPersonId,
        UUID dayPersonProjectId,
        ApiSchemas.AddTaskRequest request,
        String actor
    ) {
        DayPersonProjectEntity assignment = dayPersonProjectRepository
            .findByDayPersonProjectIdAndDayPerson_DayPersonIdAndDayPerson_DayPlan_DayPlanIdAndDayPerson_DayPlan_Week_WeekId(
                dayPersonProjectId,
                dayPersonId,
                dayPlanId,
                weekId
            )
            .orElseThrow(() -> new NotFoundException("Day person project assignment not found"));

        weekService.assertPlanningWritable(assignment.getDayPerson().getDayPlan().getWeek());

        TaskEntity task = new TaskEntity();
        task.setTaskId(UUID.randomUUID());
        task.setDayPersonProject(assignment);
        task.setDescription(request.description().trim());

        TaskEntity saved = taskRepository.save(task);
        auditService.entityEvent("TASK", "CREATE", saved.getTaskId(), actor);
        return planningMapper.toTask(saved);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void removeTaskFromDayPersonProject(
        UUID weekId,
        UUID dayPlanId,
        UUID dayPersonId,
        UUID dayPersonProjectId,
        UUID taskId,
        String actor
    ) {
        TaskEntity task = taskRepository
            .findByTaskIdAndDayPersonProject_DayPersonProjectIdAndDayPersonProject_DayPerson_DayPersonIdAndDayPersonProject_DayPerson_DayPlan_DayPlanIdAndDayPersonProject_DayPerson_DayPlan_Week_WeekId(
                taskId,
                dayPersonProjectId,
                dayPersonId,
                dayPlanId,
                weekId
            )
            .orElseThrow(() -> new NotFoundException("Task not found"));

        weekService.assertPlanningWritable(task.getDayPersonProject().getDayPerson().getDayPlan().getWeek());
        taskRepository.delete(task);
        auditService.entityEvent("TASK", "DELETE", taskId, actor);
    }

    private UUID resolveFilterPersonId(AuthenticatedPrincipal principal, UUID requestedPersonId) {
        if (principal == null) {
            return requestedPersonId;
        }
        if (principal.getRole() == AccountRole.VIEWER) {
            return principal.getPersonId();
        }
        return requestedPersonId;
    }
}
