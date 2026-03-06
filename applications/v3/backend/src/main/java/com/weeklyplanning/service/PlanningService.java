package com.weeklyplanning.service;

import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.Project;
import com.weeklyplanning.domain.TaskItem;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.DayPersonRepository;
import com.weeklyplanning.repository.DayPlanRepository;
import com.weeklyplanning.repository.TaskRepository;
import com.weeklyplanning.security.CurrentUser;
import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.BadRequestException;
import com.weeklyplanning.service.exception.ConflictException;
import com.weeklyplanning.service.exception.NotFoundException;
import com.weeklyplanning.service.mapper.PlanningMapper;
import com.weeklyplanning.service.mapper.ProjectMapper;
import com.weeklyplanning.service.mapper.WeekMapper;
import com.weeklyplanning.service.mapper.PersonMapper;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PlanningService {

    private final WeekService weekService;
    private final DayPlanRepository dayPlanRepository;
    private final DayPersonRepository dayPersonRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final TaskRepository taskRepository;
    private final PersonService personService;
    private final ProjectService projectService;
    private final CurrentUser currentUser;

    public PlanningService(WeekService weekService,
                           DayPlanRepository dayPlanRepository,
                           DayPersonRepository dayPersonRepository,
                           DayPersonProjectRepository dayPersonProjectRepository,
                           TaskRepository taskRepository,
                           PersonService personService,
                           ProjectService projectService,
                           CurrentUser currentUser) {
        this.weekService = weekService;
        this.dayPlanRepository = dayPlanRepository;
        this.dayPersonRepository = dayPersonRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.taskRepository = taskRepository;
        this.personService = personService;
        this.projectService = projectService;
        this.currentUser = currentUser;
    }

    public ApiDtos.WeekPlanningBoard getWeekPlanningBoard(UUID weekId, UUID personId, Boolean includeEmptyDays) {
        Week week = weekService.findWeek(weekId);
        List<ApiDtos.DayPlanResponse> dayPlans = mapAndFilterDayPlans(weekId, personId, includeEmptyDays == null || includeEmptyDays);
        return new ApiDtos.WeekPlanningBoard(WeekMapper.toDetail(week), dayPlans);
    }

    public ApiDtos.DayPlanCollection listWeekDayPlans(UUID weekId, Boolean includeAssignments) {
        weekService.findWeek(weekId);
        List<ApiDtos.DayPlanResponse> dayPlans = mapAndFilterDayPlans(weekId, null, true);
        if (includeAssignments != null && !includeAssignments) {
            dayPlans = dayPlans.stream().map(PlanningMapper::stripAssignments).toList();
        }

        return new ApiDtos.DayPlanCollection(weekId, dayPlans);
    }

    public ApiDtos.DayPlanResponse getWeekDayPlanById(UUID weekId, UUID dayPlanId) {
        DayPlan dayPlan = findDayPlan(weekId, dayPlanId);
        ApiDtos.DayPlanResponse response = PlanningMapper.toDayPlan(dayPlan);

        UUID personFilter = resolvePersonFilter(null);
        if (personFilter != null) {
            response = filterDayPlanByPerson(response, personFilter);
        }

        return response;
    }

    public ApiDtos.DayPersonResponse addPersonToDayPlan(UUID weekId, UUID dayPlanId, ApiDtos.AddPersonToDayRequest request) {
        DayPlan dayPlan = findDayPlan(weekId, dayPlanId);
        ensureWeekWritable(dayPlan.getWeek());

        Person person = personService.findPerson(request.personId());
        if (person.getStatus() != PersonStatus.ACTIVE) {
            throw new ConflictException("PERSON_INACTIVE", "Only ACTIVE persons can be assigned.");
        }

        if (dayPersonRepository.existsByDayPlanIdAndPersonId(dayPlanId, request.personId())) {
            throw new ConflictException("DUPLICATE_DAY_PERSON", "Person is already assigned to this day.");
        }

        DayPerson dayPerson = DayPerson.builder()
            .dayPlan(dayPlan)
            .person(person)
            .dayPersonProjects(new ArrayList<>())
            .build();

        DayPerson saved = dayPersonRepository.save(dayPerson);
        return new ApiDtos.DayPersonResponse(saved.getId(), PersonMapper.toReference(saved.getPerson()), List.of());
    }

    public void removePersonFromDayPlan(UUID weekId, UUID dayPlanId, UUID dayPersonId) {
        DayPerson dayPerson = findDayPerson(weekId, dayPlanId, dayPersonId);
        ensureWeekWritable(dayPerson.getDayPlan().getWeek());
        dayPersonRepository.delete(dayPerson);
    }

    public ApiDtos.DayPersonProjectResponse addProjectToDayPerson(UUID weekId,
                                                                   UUID dayPlanId,
                                                                   UUID dayPersonId,
                                                                   ApiDtos.AddProjectToDayPersonRequest request) {
        DayPerson dayPerson = findDayPerson(weekId, dayPlanId, dayPersonId);
        ensureWeekWritable(dayPerson.getDayPlan().getWeek());

        Project project = projectService.findProject(request.projectId());
        if (project.getStatus() != ProjectStatus.ACTIVE) {
            throw new ConflictException("PROJECT_INACTIVE", "Only ACTIVE projects can be assigned.");
        }

        if (dayPersonProjectRepository.existsByDayPersonIdAndProjectId(dayPersonId, request.projectId())) {
            throw new ConflictException("DUPLICATE_DAY_PERSON_PROJECT", "Project is already assigned to this person/day.");
        }

        DayPersonProject dayPersonProject = DayPersonProject.builder()
            .dayPerson(dayPerson)
            .project(project)
            .tasks(new ArrayList<>())
            .build();

        DayPersonProject saved = dayPersonProjectRepository.save(dayPersonProject);
        return new ApiDtos.DayPersonProjectResponse(saved.getId(), ProjectMapper.toReference(saved.getProject()), List.of());
    }

    public void removeProjectFromDayPerson(UUID weekId, UUID dayPlanId, UUID dayPersonId, UUID dayPersonProjectId) {
        DayPersonProject dayPersonProject = findDayPersonProject(weekId, dayPlanId, dayPersonId, dayPersonProjectId);
        ensureWeekWritable(dayPersonProject.getDayPerson().getDayPlan().getWeek());
        dayPersonProjectRepository.delete(dayPersonProject);
    }

    public ApiDtos.TaskResponse addTaskToDayPersonProject(UUID weekId,
                                                          UUID dayPlanId,
                                                          UUID dayPersonId,
                                                          UUID dayPersonProjectId,
                                                          ApiDtos.AddTaskRequest request) {
        DayPersonProject dayPersonProject = findDayPersonProject(weekId, dayPlanId, dayPersonId, dayPersonProjectId);
        ensureWeekWritable(dayPersonProject.getDayPerson().getDayPlan().getWeek());

        String description = request.description().trim();
        if (description.isBlank()) {
            throw new BadRequestException("TASK_DESCRIPTION_REQUIRED", "Task description is required.");
        }

        TaskItem task = TaskItem.builder()
            .dayPersonProject(dayPersonProject)
            .description(description)
            .build();

        TaskItem saved = taskRepository.save(task);
        return PlanningMapper.toTask(saved);
    }

    public void removeTaskFromDayPersonProject(UUID weekId,
                                               UUID dayPlanId,
                                               UUID dayPersonId,
                                               UUID dayPersonProjectId,
                                               UUID taskId) {
        DayPersonProject dayPersonProject = findDayPersonProject(weekId, dayPlanId, dayPersonId, dayPersonProjectId);
        ensureWeekWritable(dayPersonProject.getDayPerson().getDayPlan().getWeek());

        TaskItem task = taskRepository.findByIdAndDayPersonProjectId(taskId, dayPersonProjectId)
            .orElseThrow(() -> new NotFoundException("TASK_NOT_FOUND", "Task not found."));
        taskRepository.delete(task);
    }

    private List<ApiDtos.DayPlanResponse> mapAndFilterDayPlans(UUID weekId, UUID requestedPersonId, boolean includeEmptyDays) {
        List<DayPlan> dayPlans = dayPlanRepository.findByWeekIdOrderByDateAsc(weekId);
        UUID personFilter = resolvePersonFilter(requestedPersonId);

        List<ApiDtos.DayPlanResponse> mapped = dayPlans.stream()
            .map(PlanningMapper::toDayPlan)
            .map(dayPlan -> personFilter == null ? dayPlan : filterDayPlanByPerson(dayPlan, personFilter))
            .toList();

        if (!includeEmptyDays) {
            mapped = mapped.stream().filter(dayPlan -> !dayPlan.dayPersons().isEmpty()).toList();
        }

        return mapped;
    }

    private UUID resolvePersonFilter(UUID requestedPersonId) {
        if (currentUser.isAdmin()) {
            return requestedPersonId;
        }
        return currentUser.require().personId();
    }

    private ApiDtos.DayPlanResponse filterDayPlanByPerson(ApiDtos.DayPlanResponse dayPlan, UUID personId) {
        List<ApiDtos.DayPersonResponse> filtered = dayPlan.dayPersons().stream()
            .filter(dayPerson -> dayPerson.person().personId().equals(personId))
            .toList();

        return new ApiDtos.DayPlanResponse(
            dayPlan.dayPlanId(),
            dayPlan.weekId(),
            dayPlan.date(),
            dayPlan.dayOfWeek(),
            filtered
        );
    }

    private void ensureWeekWritable(Week week) {
        if (week.getStatus() == WeekStatus.COMPLETED) {
            throw new ConflictException("WEEK_COMPLETED", "Week is completed and planning is read-only.");
        }
    }

    private DayPlan findDayPlan(UUID weekId, UUID dayPlanId) {
        return dayPlanRepository.findByIdAndWeekId(dayPlanId, weekId)
            .orElseThrow(() -> new NotFoundException("DAY_PLAN_NOT_FOUND", "Day plan not found."));
    }

    private DayPerson findDayPerson(UUID weekId, UUID dayPlanId, UUID dayPersonId) {
        DayPerson dayPerson = dayPersonRepository.findById(dayPersonId)
            .orElseThrow(() -> new NotFoundException("DAY_PERSON_NOT_FOUND", "Day person not found."));

        boolean valid = dayPerson.getDayPlan().getId().equals(dayPlanId)
            && dayPerson.getDayPlan().getWeek().getId().equals(weekId);
        if (!valid) {
            throw new NotFoundException("DAY_PERSON_NOT_FOUND", "Day person not found.");
        }
        return dayPerson;
    }

    private DayPersonProject findDayPersonProject(UUID weekId,
                                                  UUID dayPlanId,
                                                  UUID dayPersonId,
                                                  UUID dayPersonProjectId) {
        DayPersonProject dayPersonProject = dayPersonProjectRepository.findById(dayPersonProjectId)
            .orElseThrow(() -> new NotFoundException("DAY_PERSON_PROJECT_NOT_FOUND", "Day person project not found."));

        boolean valid = dayPersonProject.getDayPerson().getId().equals(dayPersonId)
            && dayPersonProject.getDayPerson().getDayPlan().getId().equals(dayPlanId)
            && dayPersonProject.getDayPerson().getDayPlan().getWeek().getId().equals(weekId);

        if (!valid) {
            throw new NotFoundException("DAY_PERSON_PROJECT_NOT_FOUND", "Day person project not found.");
        }

        return dayPersonProject;
    }
}
