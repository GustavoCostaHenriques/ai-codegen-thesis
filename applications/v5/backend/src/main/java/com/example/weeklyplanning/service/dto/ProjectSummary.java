package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.ProjectStatus;

import java.util.UUID;

public record ProjectSummary(
    UUID id,
    String name,
    String code,
    ProjectStatus status
) {
}
