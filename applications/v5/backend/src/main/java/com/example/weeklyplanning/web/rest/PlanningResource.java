package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.security.CurrentUserProvider;
import com.example.weeklyplanning.service.PlanningService;
import com.example.weeklyplanning.service.dto.AssignmentCreateRequest;
import com.example.weeklyplanning.service.dto.AssignmentUpdateRequest;
import com.example.weeklyplanning.service.dto.DayPlan;
import com.example.weeklyplanning.service.dto.DayProject;
import com.example.weeklyplanning.service.dto.PlanningAssignment;
import com.example.weeklyplanning.service.dto.Task;
import com.example.weeklyplanning.service.dto.TaskCreateRequest;
import com.example.weeklyplanning.service.dto.TaskUpdateRequest;
import com.example.weeklyplanning.service.dto.WeekPlanningBoard;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/weeks/{weekId}")
public class PlanningResource {

    private final PlanningService planningService;
    private final CurrentUserProvider currentUserProvider;

    public PlanningResource(PlanningService planningService, CurrentUserProvider currentUserProvider) {
        this.planningService = planningService;
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping("/planning-board")
    public ResponseEntity<WeekPlanningBoard> getWeekPlanningBoard(@PathVariable UUID weekId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(planningService.getWeekPlanningBoard(weekId, principal));
    }

    @GetMapping("/day-plans")
    public ResponseEntity<List<DayPlan>> listWeekDayPlans(@PathVariable UUID weekId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(planningService.listWeekDayPlans(weekId, principal));
    }

    @GetMapping("/day-plans/{dayPlanId}")
    public ResponseEntity<DayPlan> getDayPlanById(@PathVariable UUID weekId,
                                                  @PathVariable UUID dayPlanId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(planningService.getDayPlanById(weekId, dayPlanId, principal));
    }

    @PutMapping("/day-plans/{dayPlanId}/projects/{projectId}")
    public ResponseEntity<DayProject> upsertDayPlanProject(@PathVariable UUID weekId,
                                                           @PathVariable UUID dayPlanId,
                                                           @PathVariable UUID projectId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(planningService.upsertDayPlanProject(weekId, dayPlanId, projectId, principal));
    }

    @DeleteMapping("/day-plans/{dayPlanId}/projects/{projectId}")
    public ResponseEntity<Void> deleteDayPlanProject(@PathVariable UUID weekId,
                                                     @PathVariable UUID dayPlanId,
                                                     @PathVariable UUID projectId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        planningService.deleteDayPlanProject(weekId, dayPlanId, projectId, principal);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/day-plans/{dayPlanId}/projects/{projectId}/assignments")
    public ResponseEntity<PlanningAssignment> createPlanningAssignment(@PathVariable UUID weekId,
                                                                       @PathVariable UUID dayPlanId,
                                                                       @PathVariable UUID projectId,
                                                                       @Valid @RequestBody AssignmentCreateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        PlanningAssignment assignment = planningService.createPlanningAssignment(weekId, dayPlanId, projectId, request, principal);
        return ResponseEntity.status(HttpStatus.CREATED).body(assignment);
    }

    @PutMapping("/day-plans/{dayPlanId}/projects/{projectId}/assignments/{assignmentId}")
    public ResponseEntity<PlanningAssignment> updatePlanningAssignment(@PathVariable UUID weekId,
                                                                       @PathVariable UUID dayPlanId,
                                                                       @PathVariable UUID projectId,
                                                                       @PathVariable UUID assignmentId,
                                                                       @Valid @RequestBody AssignmentUpdateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(planningService.updatePlanningAssignment(weekId, dayPlanId, projectId, assignmentId, request, principal));
    }

    @DeleteMapping("/day-plans/{dayPlanId}/projects/{projectId}/assignments/{assignmentId}")
    public ResponseEntity<Void> deletePlanningAssignment(@PathVariable UUID weekId,
                                                         @PathVariable UUID dayPlanId,
                                                         @PathVariable UUID projectId,
                                                         @PathVariable UUID assignmentId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        planningService.deletePlanningAssignment(weekId, dayPlanId, projectId, assignmentId, principal);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/day-plans/{dayPlanId}/projects/{projectId}/assignments/{assignmentId}/tasks")
    public ResponseEntity<Task> createAssignmentTask(@PathVariable UUID weekId,
                                                     @PathVariable UUID dayPlanId,
                                                     @PathVariable UUID projectId,
                                                     @PathVariable UUID assignmentId,
                                                     @Valid @RequestBody TaskCreateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        Task task = planningService.createAssignmentTask(weekId, dayPlanId, projectId, assignmentId, request, principal);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @PutMapping("/day-plans/{dayPlanId}/projects/{projectId}/assignments/{assignmentId}/tasks/{taskId}")
    public ResponseEntity<Task> updateAssignmentTask(@PathVariable UUID weekId,
                                                     @PathVariable UUID dayPlanId,
                                                     @PathVariable UUID projectId,
                                                     @PathVariable UUID assignmentId,
                                                     @PathVariable UUID taskId,
                                                     @Valid @RequestBody TaskUpdateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(planningService.updateAssignmentTask(
            weekId,
            dayPlanId,
            projectId,
            assignmentId,
            taskId,
            request,
            principal
        ));
    }

    @DeleteMapping("/day-plans/{dayPlanId}/projects/{projectId}/assignments/{assignmentId}/tasks/{taskId}")
    public ResponseEntity<Void> deleteAssignmentTask(@PathVariable UUID weekId,
                                                     @PathVariable UUID dayPlanId,
                                                     @PathVariable UUID projectId,
                                                     @PathVariable UUID assignmentId,
                                                     @PathVariable UUID taskId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        planningService.deleteAssignmentTask(weekId, dayPlanId, projectId, assignmentId, taskId, principal);
        return ResponseEntity.noContent().build();
    }
}
