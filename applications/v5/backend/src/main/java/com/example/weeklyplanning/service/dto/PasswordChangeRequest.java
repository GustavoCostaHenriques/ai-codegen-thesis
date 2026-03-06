package com.example.weeklyplanning.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordChangeRequest(
    @NotBlank @Size(min = 1, max = 80) String username,
    @NotBlank @Size(min = 1, max = 200) String currentPassword,
    @NotBlank @Size(min = 8, max = 200) String newPassword,
    @NotBlank @Size(min = 8, max = 200) String confirmNewPassword
) {
}
