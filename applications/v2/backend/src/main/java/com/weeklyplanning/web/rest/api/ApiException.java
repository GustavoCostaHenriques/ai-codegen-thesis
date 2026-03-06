package com.weeklyplanning.web.rest.api;

import java.util.List;
import org.springframework.http.HttpStatus;

@Deprecated
public class ApiException extends com.weeklyplanning.service.error.ApiException {

    public ApiException(HttpStatus status, String message) {
        super(status, message);
    }

    public ApiException(HttpStatus status, String message, List<com.weeklyplanning.service.error.ApiException.FieldError> details) {
        super(status, message, details);
    }
}
