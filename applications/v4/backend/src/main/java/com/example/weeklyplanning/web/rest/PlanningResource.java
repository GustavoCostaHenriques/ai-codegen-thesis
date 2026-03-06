package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.service.PlanningService;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class PlanningResource {

    private final PlanningService planningService;

    public PlanningResource(PlanningService planningService) {
        this.planningService = planningService;
    }

    @GetMapping("/weeks/{weekId}/planning")
    public ResponseEntity<ApiSchemas.WeekPlanningBoard> getWeekPlanningBoard(
        @PathVariable UUID weekId,
        @RequestParam(value = "personId", required = false) UUID personId,
        @RequestParam(value = "includeEmptyDays", required = false) Boolean includeEmptyDays,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        return ResponseEntity.ok(planningService.getWeekPlanningBoard(weekId, personId, includeEmptyDays, principal));
    }

    @GetMapping("/weeks/{weekId}/day-plans")
    public ResponseEntity<ApiSchemas.DayPlanCollection> listWeekDayPlans(
        @PathVariable UUID weekId,
        @RequestParam(value = "includeAssignments", required = false) Boolean includeAssignments,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        return ResponseEntity.ok(planningService.listWeekDayPlans(weekId, includeAssignments, principal));
    }

    @GetMapping("/weeks/{weekId}/day-plans/{dayPlanId}")
    public ResponseEntity<ApiSchemas.DayPlan> getWeekDayPlanById(
        @PathVariable UUID weekId,
        @PathVariable UUID dayPlanId,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        return ResponseEntity.ok(planningService.getWeekDayPlanById(weekId, dayPlanId, principal));
    }

    @PostMapping("/weeks/{weekId}/day-plans/{dayPlanId}/day-persons")
    public ResponseEntity<ApiSchemas.DayPerson> addPersonToDayPlan(
        @PathVariable UUID weekId,
        @PathVariable UUID dayPlanId,
        @Valid @RequestBody ApiSchemas.AddPersonToDayRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        ApiSchemas.DayPerson response = planningService.addPersonToDayPlan(weekId, dayPlanId, request, actor);
        URI location = URI.create("/api/v1/weeks/" + weekId + "/day-plans/" + dayPlanId + "/day-persons/" + response.dayPersonId());
        return ResponseEntity.created(location).body(response);
    }

    @DeleteMapping("/weeks/{weekId}/day-plans/{dayPlanId}/day-persons/{dayPersonId}")
    public ResponseEntity<Void> removePersonFromDayPlan(
        @PathVariable UUID weekId,
        @PathVariable UUID dayPlanId,
        @PathVariable UUID dayPersonId,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        planningService.removePersonFromDayPlan(weekId, dayPlanId, dayPersonId, actor);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/weeks/{weekId}/day-plans/{dayPlanId}/day-persons/{dayPersonId}/day-person-projects")
    public ResponseEntity<ApiSchemas.DayPersonProject> addProjectToDayPerson(
        @PathVariable UUID weekId,
        @PathVariable UUID dayPlanId,
        @PathVariable UUID dayPersonId,
        @Valid @RequestBody ApiSchemas.AddProjectToDayPersonRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        ApiSchemas.DayPersonProject response = planningService.addProjectToDayPerson(
            weekId,
            dayPlanId,
            dayPersonId,
            request,
            actor
        );

        URI location = URI.create(
            "/api/v1/weeks/" + weekId
                + "/day-plans/" + dayPlanId
                + "/day-persons/" + dayPersonId
                + "/day-person-projects/" + response.dayPersonProjectId()
        );
        return ResponseEntity.created(location).body(response);
    }

    @DeleteMapping("/weeks/{weekId}/day-plans/{dayPlanId}/day-persons/{dayPersonId}/day-person-projects/{dayPersonProjectId}")
    public ResponseEntity<Void> removeProjectFromDayPerson(
        @PathVariable UUID weekId,
        @PathVariable UUID dayPlanId,
        @PathVariable UUID dayPersonId,
        @PathVariable UUID dayPersonProjectId,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        planningService.removeProjectFromDayPerson(
            weekId,
            dayPlanId,
            dayPersonId,
            dayPersonProjectId,
            actor
        );
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/weeks/{weekId}/day-plans/{dayPlanId}/day-persons/{dayPersonId}/day-person-projects/{dayPersonProjectId}/tasks")
    public ResponseEntity<ApiSchemas.Task> addTaskToDayPersonProject(
        @PathVariable UUID weekId,
        @PathVariable UUID dayPlanId,
        @PathVariable UUID dayPersonId,
        @PathVariable UUID dayPersonProjectId,
        @Valid @RequestBody ApiSchemas.AddTaskRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        ApiSchemas.Task response = planningService.addTaskToDayPersonProject(
            weekId,
            dayPlanId,
            dayPersonId,
            dayPersonProjectId,
            request,
            actor
        );

        URI location = URI.create(
            "/api/v1/weeks/" + weekId
                + "/day-plans/" + dayPlanId
                + "/day-persons/" + dayPersonId
                + "/day-person-projects/" + dayPersonProjectId
                + "/tasks/" + response.taskId()
        );
        return ResponseEntity.created(location).body(response);
    }

    @DeleteMapping("/weeks/{weekId}/day-plans/{dayPlanId}/day-persons/{dayPersonId}/day-person-projects/{dayPersonProjectId}/tasks/{taskId}")
    public ResponseEntity<Void> removeTaskFromDayPersonProject(
        @PathVariable UUID weekId,
        @PathVariable UUID dayPlanId,
        @PathVariable UUID dayPersonId,
        @PathVariable UUID dayPersonProjectId,
        @PathVariable UUID taskId,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        planningService.removeTaskFromDayPersonProject(
            weekId,
            dayPlanId,
            dayPersonId,
            dayPersonProjectId,
            taskId,
            actor
        );
        return ResponseEntity.noContent().build();
    }
}
