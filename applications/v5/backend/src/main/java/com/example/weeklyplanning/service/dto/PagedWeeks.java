package com.example.weeklyplanning.service.dto;

import java.util.List;

public record PagedWeeks(
    List<WeekSummary> content,
    PageMetadata page
) {
}
