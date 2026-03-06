package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.WeekStatus;

import java.time.LocalDate;
import java.util.UUID;

public record WeekSummary(
    UUID id,
    String code,
    LocalDate weekStart,
    LocalDate weekEnd,
    WeekStatus status
) {
}
