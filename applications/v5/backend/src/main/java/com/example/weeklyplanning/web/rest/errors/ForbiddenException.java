package com.example.weeklyplanning.web.rest.errors;

public class ForbiddenException extends RuntimeException {

    public ForbiddenException(String message) {
        super(message);
    }
}
