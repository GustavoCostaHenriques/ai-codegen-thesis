package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.ProjectStatus;

import java.time.Instant;
import java.util.UUID;

public record Project(
    UUID id,
    String name,
    String code,
    ProjectStatus status,
    Instant createdAt,
    Instant updatedAt
) {
}
