package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PersonCreateRequest(
    @NotBlank @Size(min = 1, max = 120) String name,
    @NotBlank @Size(min = 1, max = 80) String username,
    @NotBlank @Email @Size(max = 160) String email,
    @NotBlank @Size(min = 8, max = 200) String password,
    @NotNull AccountRole role,
    @NotNull PersonStatus status
) {
}
