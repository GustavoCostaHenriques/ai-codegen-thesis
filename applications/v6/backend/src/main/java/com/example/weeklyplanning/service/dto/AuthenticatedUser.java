package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonStatus;

import java.util.UUID;

public record AuthenticatedUser(
    UUID accountId,
    UUID personId,
    String name,
    String username,
    String email,
    AccountRole role,
    PersonStatus status
) {
}
