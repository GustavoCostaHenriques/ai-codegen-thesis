package com.example.weeklyplanning.service.dto;

import java.util.List;

public record WeekPlanningBoard(
    WeekSummary week,
    boolean readOnly,
    List<DayPlan> dayPlans
) {
}
