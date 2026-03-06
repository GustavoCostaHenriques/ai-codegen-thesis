package com.example.weeklyplanning.service.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record AssignmentUpdateRequest(
    @NotNull @DecimalMin("0.0") Double estimatedHours,
    @DecimalMin("0.0") Double actualHours
) {
}
