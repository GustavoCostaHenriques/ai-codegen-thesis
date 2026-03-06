package com.example.weeklyplanning.service.dto;

import java.util.List;

public record PagedProjects(
    List<ProjectSummary> content,
    PageMetadata page
) {
}
