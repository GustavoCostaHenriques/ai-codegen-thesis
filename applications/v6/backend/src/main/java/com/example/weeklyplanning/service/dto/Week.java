package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.WeekStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record Week(
    UUID id,
    String code,
    LocalDate weekStart,
    LocalDate weekEnd,
    WeekStatus status,
    Instant createdAt,
    Instant updatedAt
) {
}
