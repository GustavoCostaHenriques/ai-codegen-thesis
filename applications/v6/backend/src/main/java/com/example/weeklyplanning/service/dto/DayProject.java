package com.example.weeklyplanning.service.dto;

import java.util.List;
import java.util.UUID;

public record DayProject(
    UUID id,
    ProjectSummary project,
    List<PlanningAssignment> assignments
) {
}
