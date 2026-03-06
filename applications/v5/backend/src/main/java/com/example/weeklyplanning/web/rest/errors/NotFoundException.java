package com.example.weeklyplanning.web.rest.errors;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}
