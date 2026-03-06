package com.example.weeklyplanning.web.rest.errors;

public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
