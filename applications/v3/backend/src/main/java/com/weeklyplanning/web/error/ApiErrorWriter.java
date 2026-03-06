package com.weeklyplanning.web.error;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weeklyplanning.service.dto.ApiDtos;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

@Component
public class ApiErrorWriter {

    private final ObjectMapper objectMapper;

    public ApiErrorWriter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void write(
        HttpServletRequest request,
        HttpServletResponse response,
        int status,
        String error,
        String code,
        String message
    ) throws IOException {
        ApiDtos.ErrorResponse payload = new ApiDtos.ErrorResponse(
            OffsetDateTime.now(),
            status,
            error,
            code,
            message,
            request.getRequestURI(),
            List.of()
        );

        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), payload);
    }
}
