package com.weeklyplanning.service.exception;

public class UnauthorizedException extends ApiException {

    public UnauthorizedException(String code, String message) {
        super(code, message);
    }
}
