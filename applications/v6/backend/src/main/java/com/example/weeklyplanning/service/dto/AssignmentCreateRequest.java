package com.example.weeklyplanning.service.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record AssignmentCreateRequest(
    @NotNull UUID personId,
    @NotNull @DecimalMin("0.0") Double estimatedHours,
    @DecimalMin("0.0") Double actualHours,
    @NotBlank @Size(min = 1, max = 2000) String taskDescription
) {
}
