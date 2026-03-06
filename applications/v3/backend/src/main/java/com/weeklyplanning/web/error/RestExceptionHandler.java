package com.weeklyplanning.web.error;

import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.ApiException;
import com.weeklyplanning.service.exception.BadRequestException;
import com.weeklyplanning.service.exception.ConflictException;
import com.weeklyplanning.service.exception.ForbiddenException;
import com.weeklyplanning.service.exception.NotFoundException;
import com.weeklyplanning.service.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiDtos.ErrorResponse> handleValidation(MethodArgumentNotValidException ex,
                                                                  HttpServletRequest request) {
        List<ApiDtos.FieldErrorResponse> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
            .map(this::toFieldError)
            .toList();

        return build(
            HttpStatus.UNPROCESSABLE_ENTITY,
            "Validation Error",
            "VALIDATION_ERROR",
            "Validation failed.",
            request,
            fieldErrors
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiDtos.ErrorResponse> handleConstraint(ConstraintViolationException ex,
                                                                  HttpServletRequest request) {
        List<ApiDtos.FieldErrorResponse> fieldErrors = ex.getConstraintViolations().stream()
            .map(v -> new ApiDtos.FieldErrorResponse(v.getPropertyPath().toString(), v.getMessage(),
                v.getInvalidValue() == null ? null : v.getInvalidValue().toString()))
            .toList();

        return build(
            HttpStatus.UNPROCESSABLE_ENTITY,
            "Validation Error",
            "VALIDATION_ERROR",
            "Validation failed.",
            request,
            fieldErrors
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiDtos.ErrorResponse> handleBadRequest(BadRequestException ex, HttpServletRequest request) {
        return mapApiException(HttpStatus.BAD_REQUEST, "Bad Request", ex, request);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiDtos.ErrorResponse> handleUnauthorized(UnauthorizedException ex, HttpServletRequest request) {
        return mapApiException(HttpStatus.UNAUTHORIZED, "Unauthorized", ex, request);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiDtos.ErrorResponse> handleForbidden(ForbiddenException ex, HttpServletRequest request) {
        return mapApiException(HttpStatus.FORBIDDEN, "Forbidden", ex, request);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiDtos.ErrorResponse> handleNotFound(NotFoundException ex, HttpServletRequest request) {
        return mapApiException(HttpStatus.NOT_FOUND, "Not Found", ex, request);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiDtos.ErrorResponse> handleConflict(ConflictException ex, HttpServletRequest request) {
        return mapApiException(HttpStatus.CONFLICT, "Conflict", ex, request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiDtos.ErrorResponse> handleUnexpected(Exception ex, HttpServletRequest request) {
        return build(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Internal Server Error",
            "INTERNAL_SERVER_ERROR",
            "An unexpected error occurred.",
            request,
            List.of()
        );
    }

    private ResponseEntity<ApiDtos.ErrorResponse> mapApiException(HttpStatus status, String error, ApiException ex,
                                                                  HttpServletRequest request) {
        return build(status, error, ex.getCode(), ex.getMessage(), request, List.of());
    }

    private ResponseEntity<ApiDtos.ErrorResponse> build(HttpStatus status,
                                                        String error,
                                                        String code,
                                                        String message,
                                                        HttpServletRequest request,
                                                        List<ApiDtos.FieldErrorResponse> fieldErrors) {
        ApiDtos.ErrorResponse response = new ApiDtos.ErrorResponse(
            OffsetDateTime.now(),
            status.value(),
            error,
            code,
            message,
            request.getRequestURI(),
            fieldErrors
        );
        return ResponseEntity.status(status).body(response);
    }

    private ApiDtos.FieldErrorResponse toFieldError(FieldError fieldError) {
        Object rejected = fieldError.getRejectedValue();
        return new ApiDtos.FieldErrorResponse(
            fieldError.getField(),
            fieldError.getDefaultMessage(),
            rejected == null ? null : rejected.toString()
        );
    }
}
