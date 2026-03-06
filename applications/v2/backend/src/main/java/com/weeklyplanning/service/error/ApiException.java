package com.weeklyplanning.service.error;

import java.util.List;
import org.springframework.http.HttpStatus;

public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final List<FieldError> details;

    public ApiException(HttpStatus status, String message) {
        this(status, message, List.of());
    }

    public ApiException(HttpStatus status, String message, List<FieldError> details) {
        super(message);
        this.status = status;
        this.details = details == null ? List.of() : List.copyOf(details);
    }

    public HttpStatus getStatus() {
        return status;
    }

    public List<FieldError> getDetails() {
        return details;
    }

    public record FieldError(String field, String message) {}
}
