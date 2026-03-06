package com.mycompany.weeklyplanning.service.api;

import java.util.List;

public class ApiConflictException extends ApiException {

    public ApiConflictException(String message) {
        super("CONFLICT", message, List.of());
    }

    public ApiConflictException(String message, List<ApiFieldError> details) {
        super("CONFLICT", message, details);
    }
}

