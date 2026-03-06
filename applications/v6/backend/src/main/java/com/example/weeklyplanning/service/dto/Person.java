package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonStatus;

import java.time.Instant;
import java.util.UUID;

public record Person(
    UUID id,
    UUID accountId,
    String name,
    String username,
    String email,
    AccountRole role,
    PersonStatus status,
    Instant createdAt,
    Instant updatedAt
) {
}
