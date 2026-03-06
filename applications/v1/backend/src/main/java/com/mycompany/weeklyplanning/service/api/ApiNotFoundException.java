package com.mycompany.weeklyplanning.service.api;

import java.util.List;

public class ApiNotFoundException extends ApiException {

    public ApiNotFoundException(String message) {
        super("NOT_FOUND", message, List.of());
    }
}

