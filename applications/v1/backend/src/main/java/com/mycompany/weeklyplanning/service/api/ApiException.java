package com.mycompany.weeklyplanning.service.api;

import java.util.List;

public abstract class ApiException extends RuntimeException {

    private final String code;
    private final List<ApiFieldError> details;

    protected ApiException(String code, String message, List<ApiFieldError> details) {
        super(message);
        this.code = code;
        this.details = details == null ? List.of() : List.copyOf(details);
    }

    public String getCode() {
        return code;
    }

    public List<ApiFieldError> getDetails() {
        return details;
    }
}

