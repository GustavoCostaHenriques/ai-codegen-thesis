package com.example.weeklyplanning.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TaskUpdateRequest(
    @NotBlank @Size(min = 1, max = 2000) String description
) {
}
