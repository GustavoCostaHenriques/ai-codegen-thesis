package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonStatus;

import java.util.UUID;

public record PersonSummary(
    UUID id,
    String name,
    String email,
    AccountRole role,
    PersonStatus status
) {
}
