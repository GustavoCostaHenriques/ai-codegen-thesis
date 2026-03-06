package com.example.weeklyplanning.service.dto;

import java.time.Instant;
import java.util.List;

public record ValidationErrorResponse(
    Instant timestamp,
    int status,
    String error,
    String code,
    String message,
    String path,
    List<String> details,
    List<FieldError> fieldErrors
) {
}
