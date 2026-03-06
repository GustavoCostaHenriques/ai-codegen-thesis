package com.weeklyplanning.web.rest;

import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Task;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.service.DayPersonProjectService;
import com.weeklyplanning.service.DayPersonService;
import com.weeklyplanning.service.DayPlanService;
import com.weeklyplanning.service.TaskService;
import com.weeklyplanning.web.rest.api.ApiModels;
import jakarta.validation.Valid;
import java.net.URI;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PlanningResource {

    private final DayPlanService dayPlanService;
    private final DayPersonService dayPersonService;
    private final DayPersonProjectService dayPersonProjectService;
    private final TaskService taskService;

    public PlanningResource(
        DayPlanService dayPlanService,
        DayPersonService dayPersonService,
        DayPersonProjectService dayPersonProjectService,
        TaskService taskService
    ) {
        this.dayPlanService = dayPlanService;
        this.dayPersonService = dayPersonService;
        this.dayPersonProjectService = dayPersonProjectService;
        this.taskService = taskService;
    }

    @GetMapping("/weeks/{weekId}/planning")
    @PreAuthorize("hasAnyAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN, T(com.weeklyplanning.security.AuthoritiesConstants).VIEWER)")
    public ResponseEntity<ApiModels.WeekPlanning> getWeekPlanning(@PathVariable UUID weekId) {
        Week week = dayPlanService.getWeekOrThrow(weekId);
        List<DayPlan> existingDays = dayPlanService.findPlanningDays(weekId);
        Map<LocalDate, DayPlan> daysByDate = existingDays.stream().collect(Collectors.toMap(DayPlan::getDate, Function.identity()));

        List<ApiModels.DayPlan> days = new ArrayList<>();
        LocalDate cursor = week.getStartDate();
        while (!cursor.isAfter(week.getEndDate())) {
            DayPlan dayPlan = daysByDate.get(cursor);
            days.add(dayPlan == null ? new ApiModels.DayPlan(cursor, List.of()) : toApiDayPlan(dayPlan));
            cursor = cursor.plusDays(1);
        }

        ApiModels.WeekPlanning response = new ApiModels.WeekPlanning(
            week.getId(),
            week.getStartDate(),
            week.getEndDate(),
            week.getStatus(),
            days
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/weeks/{weekId}/days/{date}/people")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.DayPerson> addPersonToDay(
        @PathVariable UUID weekId,
        @PathVariable LocalDate date,
        @Valid @RequestBody ApiModels.AddPersonToDayRequest request
    ) {
        DayPerson assignment = dayPersonService.addPersonToDay(weekId, date, request.personId());
        return ResponseEntity.created(URI.create("/api/weeks/" + weekId + "/days/" + date + "/people/" + request.personId())).body(toApiDayPerson(assignment));
    }

    @DeleteMapping("/weeks/{weekId}/days/{date}/people/{personId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<Void> removePersonFromDay(@PathVariable UUID weekId, @PathVariable LocalDate date, @PathVariable UUID personId) {
        dayPersonService.removePersonFromDay(weekId, date, personId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/weeks/{weekId}/days/{date}/people/{personId}/projects")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.DayPersonProject> addProjectToPerson(
        @PathVariable UUID weekId,
        @PathVariable LocalDate date,
        @PathVariable UUID personId,
        @Valid @RequestBody ApiModels.AddProjectToPersonRequest request
    ) {
        DayPersonProject assignment = dayPersonProjectService.addProjectToPerson(weekId, date, personId, request.projectId());
        URI location = URI.create("/api/weeks/" + weekId + "/days/" + date + "/people/" + personId + "/projects/" + request.projectId());
        return ResponseEntity.created(location).body(toApiDayPersonProject(assignment));
    }

    @DeleteMapping("/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<Void> removeProjectFromPerson(
        @PathVariable UUID weekId,
        @PathVariable LocalDate date,
        @PathVariable UUID personId,
        @PathVariable UUID projectId
    ) {
        dayPersonProjectService.removeProjectFromPerson(weekId, date, personId, projectId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}/tasks")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.Task> addTaskToProject(
        @PathVariable UUID weekId,
        @PathVariable LocalDate date,
        @PathVariable UUID personId,
        @PathVariable UUID projectId,
        @Valid @RequestBody ApiModels.AddTaskRequest request
    ) {
        Task task = taskService.addTaskToProject(weekId, date, personId, projectId, request.description());
        URI location = URI.create(
            "/api/weeks/" + weekId + "/days/" + date + "/people/" + personId + "/projects/" + projectId + "/tasks/" + task.getId()
        );
        return ResponseEntity.created(location).body(new ApiModels.Task(task.getId(), task.getDescription()));
    }

    @DeleteMapping("/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}/tasks/{taskId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<Void> removeTaskFromProject(
        @PathVariable UUID weekId,
        @PathVariable LocalDate date,
        @PathVariable UUID personId,
        @PathVariable UUID projectId,
        @PathVariable UUID taskId
    ) {
        taskService.removeTaskFromProject(weekId, date, personId, projectId, taskId);
        return ResponseEntity.noContent().build();
    }

    private ApiModels.DayPlan toApiDayPlan(DayPlan dayPlan) {
        List<ApiModels.DayPerson> people = dayPlan.getPeople().stream().sorted(byPersonName()).map(this::toApiDayPerson).toList();
        return new ApiModels.DayPlan(dayPlan.getDate(), people);
    }

    private ApiModels.DayPerson toApiDayPerson(DayPerson assignment) {
        List<ApiModels.DayPersonProject> projects = assignment
            .getProjects()
            .stream()
            .sorted(byProjectName())
            .map(this::toApiDayPersonProject)
            .toList();
        ApiModels.PersonSummary person = new ApiModels.PersonSummary(assignment.getPerson().getId(), assignment.getPerson().getName());
        return new ApiModels.DayPerson(person, projects);
    }

    private ApiModels.DayPersonProject toApiDayPersonProject(DayPersonProject assignment) {
        ApiModels.ProjectSummary project = new ApiModels.ProjectSummary(
            assignment.getProject().getId(),
            assignment.getProject().getName(),
            assignment.getProject().getCode()
        );
        List<ApiModels.Task> tasks = assignment
            .getTasks()
            .stream()
            .sorted(Comparator.comparing(Task::getDescription, String.CASE_INSENSITIVE_ORDER))
            .map(task -> new ApiModels.Task(task.getId(), task.getDescription()))
            .toList();
        return new ApiModels.DayPersonProject(project, tasks);
    }

    private Comparator<DayPerson> byPersonName() {
        return Comparator.comparing(dayPerson -> dayPerson.getPerson().getName(), String.CASE_INSENSITIVE_ORDER);
    }

    private Comparator<DayPersonProject> byProjectName() {
        return Comparator.comparing(dayPersonProject -> dayPersonProject.getProject().getName(), String.CASE_INSENSITIVE_ORDER);
    }
}
