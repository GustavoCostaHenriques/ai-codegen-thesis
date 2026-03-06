package com.example.weeklyplanning.web.rest.errors;

import com.example.weeklyplanning.service.dto.ApiSchemas;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.Instant;
import java.util.List;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiSchemas.ErrorResponse> handleBusiness(BusinessException ex, HttpServletRequest request) {
        return ResponseEntity.status(ex.getStatus()).body(buildError(
            ex.getStatus(),
            ex.getCode(),
            ex.getMessage(),
            request.getRequestURI(),
            null
        ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiSchemas.ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ApiSchemas.FieldError> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
            .map(this::toFieldError)
            .toList();

        return ResponseEntity.unprocessableEntity().body(buildError(
            HttpStatus.UNPROCESSABLE_ENTITY,
            "VALIDATION_ERROR",
            "Request validation failed",
            request.getRequestURI(),
            fieldErrors
        ));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiSchemas.ErrorResponse> handleConstraintViolation(ConstraintViolationException ex, HttpServletRequest request) {
        List<ApiSchemas.FieldError> fieldErrors = ex.getConstraintViolations().stream()
            .map(cv -> new ApiSchemas.FieldError(cv.getPropertyPath().toString(), cv.getMessage(), String.valueOf(cv.getInvalidValue())))
            .toList();

        return ResponseEntity.unprocessableEntity().body(buildError(
            HttpStatus.UNPROCESSABLE_ENTITY,
            "VALIDATION_ERROR",
            "Request validation failed",
            request.getRequestURI(),
            fieldErrors
        ));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiSchemas.ErrorResponse> handleAuthentication(AuthenticationException ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(buildError(
            HttpStatus.UNAUTHORIZED,
            "UNAUTHORIZED",
            "Authentication required",
            request.getRequestURI(),
            null
        ));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiSchemas.ErrorResponse> handleMalformedBody(HttpMessageNotReadableException ex, HttpServletRequest request) {
        return ResponseEntity.badRequest().body(buildError(
            HttpStatus.BAD_REQUEST,
            "BAD_REQUEST",
            "Malformed request body",
            request.getRequestURI(),
            null
        ));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiSchemas.ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
        return ResponseEntity.badRequest().body(buildError(
            HttpStatus.BAD_REQUEST,
            "BAD_REQUEST",
            "Invalid parameter format",
            request.getRequestURI(),
            null
        ));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiSchemas.ErrorResponse> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(buildError(
            HttpStatus.FORBIDDEN,
            "FORBIDDEN",
            "Access denied",
            request.getRequestURI(),
            null
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiSchemas.ErrorResponse> handleUnexpected(Exception ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(buildError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "INTERNAL_SERVER_ERROR",
            "Unexpected error",
            request.getRequestURI(),
            null
        ));
    }

    private ApiSchemas.FieldError toFieldError(FieldError fieldError) {
        String rejected = fieldError.getRejectedValue() == null ? null : String.valueOf(fieldError.getRejectedValue());
        return new ApiSchemas.FieldError(fieldError.getField(), fieldError.getDefaultMessage(), rejected);
    }

    private ApiSchemas.ErrorResponse buildError(
        HttpStatus status,
        String code,
        String message,
        String path,
        List<ApiSchemas.FieldError> fieldErrors
    ) {
        return new ApiSchemas.ErrorResponse(
            Instant.now(),
            status.value(),
            status.getReasonPhrase(),
            code,
            message,
            path,
            fieldErrors
        );
    }
}
