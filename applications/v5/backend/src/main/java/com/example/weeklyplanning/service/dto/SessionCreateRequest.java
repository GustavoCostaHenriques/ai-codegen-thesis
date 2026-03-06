package com.example.weeklyplanning.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SessionCreateRequest(
    @NotBlank @Size(min = 1, max = 80) String username,
    @NotBlank @Size(min = 1, max = 200) String password
) {
}
