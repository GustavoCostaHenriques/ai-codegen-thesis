package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.PlanningDayOfWeek;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record DayPlan(
    UUID id,
    PlanningDayOfWeek dayOfWeek,
    LocalDate date,
    List<DayProject> projects
) {
}
