package com.example.weeklyplanning.service.dto;

import java.util.List;

public record PageMetadata(
    int page,
    int size,
    long totalElements,
    int totalPages,
    List<String> sort,
    Boolean hasNext,
    Boolean hasPrevious
) {
}
