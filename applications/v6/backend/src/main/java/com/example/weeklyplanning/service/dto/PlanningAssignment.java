package com.example.weeklyplanning.service.dto;

import java.util.List;
import java.util.UUID;

public record PlanningAssignment(
    UUID id,
    PersonSummary person,
    Double estimatedHours,
    Double actualHours,
    List<Task> tasks
) {
}
