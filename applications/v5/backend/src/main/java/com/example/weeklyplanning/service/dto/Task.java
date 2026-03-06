package com.example.weeklyplanning.service.dto;

import java.time.Instant;
import java.util.UUID;

public record Task(
    UUID id,
    String description,
    Instant createdAt,
    Instant updatedAt
) {
}
