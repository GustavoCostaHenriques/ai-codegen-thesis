package com.example.weeklyplanning.web.rest.errors;

import org.springframework.http.HttpStatus;

public class ForbiddenOperationException extends BusinessException {

    public ForbiddenOperationException(String message) {
        super(HttpStatus.FORBIDDEN, "FORBIDDEN", message);
    }
}
