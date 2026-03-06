package com.example.weeklyplanning.service.dto;

import java.util.List;

public record PagedPeople(
    List<PersonSummary> content,
    PageMetadata page
) {
}
