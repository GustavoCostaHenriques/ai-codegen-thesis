package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProjectUpdateRequest(
    @NotBlank @Size(min = 1, max = 120) String name,
    @NotBlank @Size(min = 1, max = 40) String code,
    @NotNull ProjectStatus status
) {
}
