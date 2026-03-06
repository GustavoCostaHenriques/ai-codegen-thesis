package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.WeekStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DuplicateWeekRequest(
    @NotNull LocalDate weekStart,
    @NotNull LocalDate weekEnd,
    WeekStatus status
) {
}
