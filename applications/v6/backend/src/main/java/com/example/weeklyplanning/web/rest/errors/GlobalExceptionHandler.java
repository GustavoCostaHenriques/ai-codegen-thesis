package com.example.weeklyplanning.web.rest.errors;

import com.example.weeklyplanning.service.dto.ErrorResponse;
import com.example.weeklyplanning.service.dto.FieldError;
import com.example.weeklyplanning.service.dto.ValidationErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex, HttpServletRequest request) {
        return buildError(HttpStatus.BAD_REQUEST, "Bad Request", "BAD_REQUEST", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex, HttpServletRequest request) {
        return buildError(HttpStatus.UNAUTHORIZED, "Unauthorized", "UNAUTHORIZED", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbidden(ForbiddenException ex, HttpServletRequest request) {
        return buildError(HttpStatus.FORBIDDEN, "Forbidden", "FORBIDDEN", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler({AccessDeniedException.class, AuthorizationDeniedException.class})
    public ResponseEntity<ErrorResponse> handleSecurityForbidden(Exception ex, HttpServletRequest request) {
        return buildError(HttpStatus.FORBIDDEN, "Forbidden", "FORBIDDEN", "Operation not allowed for current user role or ownership context.", request.getRequestURI());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException ex, HttpServletRequest request) {
        return buildError(HttpStatus.NOT_FOUND, "Not Found", "NOT_FOUND", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflict(ConflictException ex, HttpServletRequest request) {
        return buildError(HttpStatus.CONFLICT, "Conflict", "CONFLICT", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(UnprocessableEntityException.class)
    public ResponseEntity<ErrorResponse> handleUnprocessable(UnprocessableEntityException ex, HttpServletRequest request) {
        return buildError(HttpStatus.UNPROCESSABLE_ENTITY, "Unprocessable Entity", "UNPROCESSABLE_ENTITY", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, BindException.class, ConstraintViolationException.class})
    public ResponseEntity<ValidationErrorResponse> handleValidation(Exception ex, HttpServletRequest request) {
        List<FieldError> fieldErrors;

        if (ex instanceof MethodArgumentNotValidException methodArgumentNotValidException) {
            fieldErrors = methodArgumentNotValidException.getBindingResult().getFieldErrors().stream()
                .map(err -> new FieldError(err.getField(), err.getDefaultMessage()))
                .toList();
        } else if (ex instanceof BindException bindException) {
            fieldErrors = bindException.getBindingResult().getFieldErrors().stream()
                .map(err -> new FieldError(err.getField(), err.getDefaultMessage()))
                .toList();
        } else {
            fieldErrors = List.of(new FieldError("request", ex.getMessage()));
        }

        ValidationErrorResponse body = new ValidationErrorResponse(
            Instant.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Bad Request",
            "VALIDATION_ERROR",
            "Request validation failed.",
            request.getRequestURI(),
            Collections.emptyList(),
            fieldErrors
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex, HttpServletRequest request) {
        ex.printStackTrace(); // Log the stack trace for debugging purposes
        return buildError(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", "INTERNAL_ERROR",
            "Unexpected server error.", request.getRequestURI());
    }

    private ResponseEntity<ErrorResponse> buildError(HttpStatus status,
                                                     String error,
                                                     String code,
                                                     String message,
                                                     String path) {
        ErrorResponse body = new ErrorResponse(
            Instant.now(),
            status.value(),
            error,
            code,
            message,
            path,
            Collections.emptyList()
        );
        return ResponseEntity.status(status).body(body);
    }
}
