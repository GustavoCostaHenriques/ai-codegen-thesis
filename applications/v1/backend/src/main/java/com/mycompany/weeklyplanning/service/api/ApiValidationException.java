package com.mycompany.weeklyplanning.service.api;

import java.util.List;

public class ApiValidationException extends ApiException {

    public ApiValidationException(String message, List<ApiFieldError> details) {
        super("VALIDATION_ERROR", message, details);
    }

    public ApiValidationException(String message) {
        this(message, List.of());
    }
}

