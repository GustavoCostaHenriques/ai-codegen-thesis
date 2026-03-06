package com.weeklyplanning.controller;

import com.weeklyplanning.service.PlanningService;
import com.weeklyplanning.service.dto.ApiDtos;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/weeks/{weekId}")
public class PlanningController {

    private final PlanningService planningService;

    public PlanningController(PlanningService planningService) {
        this.planningService = planningService;
    }

    @GetMapping("/planning")
    public ApiDtos.WeekPlanningBoard getWeekPlanningBoard(@PathVariable(name="weekId") UUID weekId,
                                                           @RequestParam(name="personId", required = false) UUID personId,
                                                           @RequestParam(name="includeEmptyDays", required = false, defaultValue = "true") Boolean includeEmptyDays) {
        return planningService.getWeekPlanningBoard(weekId, personId, includeEmptyDays);
    }

    @GetMapping("/day-plans")
    public ApiDtos.DayPlanCollection listWeekDayPlans(@PathVariable(name="weekId") UUID weekId,
                                                       @RequestParam(name="includeAssignments", required = false, defaultValue = "true") Boolean includeAssignments) {
        return planningService.listWeekDayPlans(weekId, includeAssignments);
    }

    @GetMapping("/day-plans/{dayPlanId}")
    public ApiDtos.DayPlanResponse getWeekDayPlanById(@PathVariable(name="weekId") UUID weekId,
                                                       @PathVariable(name="dayPlanId") UUID dayPlanId) {
        return planningService.getWeekDayPlanById(weekId, dayPlanId);
    }

    @PostMapping("/day-plans/{dayPlanId}/day-persons")
    public ResponseEntity<ApiDtos.DayPersonResponse> addPersonToDayPlan(@PathVariable(name="weekId") UUID weekId,
                                                                         @PathVariable(name="dayPlanId") UUID dayPlanId,
                                                                         @Valid @RequestBody ApiDtos.AddPersonToDayRequest request) {
        ApiDtos.DayPersonResponse response = planningService.addPersonToDayPlan(weekId, dayPlanId, request);
        URI location = URI.create("/api/v1/weeks/" + weekId + "/day-plans/" + dayPlanId + "/day-persons/" + response.dayPersonId());
        return ResponseEntity.created(location).body(response);
    }

    @DeleteMapping("/day-plans/{dayPlanId}/day-persons/{dayPersonId}")
    public ResponseEntity<Void> removePersonFromDayPlan(@PathVariable(name="weekId") UUID weekId,
                                                         @PathVariable(name="dayPlanId") UUID dayPlanId,
                                                         @PathVariable(name="dayPersonId") UUID dayPersonId) {
        planningService.removePersonFromDayPlan(weekId, dayPlanId, dayPersonId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/day-plans/{dayPlanId}/day-persons/{dayPersonId}/day-person-projects")
    public ResponseEntity<ApiDtos.DayPersonProjectResponse> addProjectToDayPerson(@PathVariable(name="weekId") UUID weekId,
                                                                                    @PathVariable(name="dayPlanId") UUID dayPlanId,
                                                                                    @PathVariable(name="dayPersonId") UUID dayPersonId,
                                                                                    @Valid @RequestBody ApiDtos.AddProjectToDayPersonRequest request) {
        ApiDtos.DayPersonProjectResponse response = planningService.addProjectToDayPerson(weekId, dayPlanId, dayPersonId, request);
        URI location = URI.create("/api/v1/weeks/" + weekId + "/day-plans/" + dayPlanId + "/day-persons/" + dayPersonId
            + "/day-person-projects/" + response.dayPersonProjectId());
        return ResponseEntity.created(location).body(response);
    }

    @DeleteMapping("/day-plans/{dayPlanId}/day-persons/{dayPersonId}/day-person-projects/{dayPersonProjectId}")
    public ResponseEntity<Void> removeProjectFromDayPerson(@PathVariable(name="weekId") UUID weekId,
                                                            @PathVariable(name="dayPlanId") UUID dayPlanId,
                                                            @PathVariable(name="dayPersonId") UUID dayPersonId,
                                                            @PathVariable(name="dayPersonProjectId") UUID dayPersonProjectId) {
        planningService.removeProjectFromDayPerson(weekId, dayPlanId, dayPersonId, dayPersonProjectId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/day-plans/{dayPlanId}/day-persons/{dayPersonId}/day-person-projects/{dayPersonProjectId}/tasks")
    public ResponseEntity<ApiDtos.TaskResponse> addTaskToDayPersonProject(@PathVariable(name="weekId") UUID weekId,
                                                                           @PathVariable(name="dayPlanId") UUID dayPlanId,
                                                                           @PathVariable(name="dayPersonId") UUID dayPersonId,
                                                                           @PathVariable(name="dayPersonProjectId") UUID dayPersonProjectId,
                                                                           @Valid @RequestBody ApiDtos.AddTaskRequest request) {
        ApiDtos.TaskResponse response = planningService.addTaskToDayPersonProject(
            weekId, dayPlanId, dayPersonId, dayPersonProjectId, request);
        URI location = URI.create("/api/v1/weeks/" + weekId + "/day-plans/" + dayPlanId + "/day-persons/" + dayPersonId
            + "/day-person-projects/" + dayPersonProjectId + "/tasks/" + response.taskId());
        return ResponseEntity.created(location).body(response);
    }

    @DeleteMapping("/day-plans/{dayPlanId}/day-persons/{dayPersonId}/day-person-projects/{dayPersonProjectId}/tasks/{taskId}")
    public ResponseEntity<Void> removeTaskFromDayPersonProject(@PathVariable(name="weekId") UUID weekId,
                                                                @PathVariable(name="dayPlanId") UUID dayPlanId,
                                                                @PathVariable(name="dayPersonId") UUID dayPersonId,
                                                                @PathVariable(name="dayPersonProjectId") UUID dayPersonProjectId,
                                                                @PathVariable(name="taskId") UUID taskId) {
        planningService.removeTaskFromDayPersonProject(weekId, dayPlanId, dayPersonId, dayPersonProjectId, taskId);
        return ResponseEntity.noContent().build();
    }
}
