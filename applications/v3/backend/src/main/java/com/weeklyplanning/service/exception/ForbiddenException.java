package com.weeklyplanning.service.exception;

public class ForbiddenException extends ApiException {

    public ForbiddenException(String code, String message) {
        super(code, message);
    }
}
