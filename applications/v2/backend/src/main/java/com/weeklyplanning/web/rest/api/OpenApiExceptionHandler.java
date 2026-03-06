package com.weeklyplanning.web.rest.api;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class OpenApiExceptionHandler {

    private static final Logger LOG = LoggerFactory.getLogger(OpenApiExceptionHandler.class);

    @ExceptionHandler(com.weeklyplanning.service.error.ApiException.class)
    public ResponseEntity<ApiModels.ErrorResponse> handleApiException(
        com.weeklyplanning.service.error.ApiException ex,
        HttpServletRequest request
    ) {
        List<ApiModels.FieldError> details = ex
            .getDetails()
            .stream()
            .map(detail -> new ApiModels.FieldError(detail.field(), detail.message()))
            .toList();
        return ResponseEntity.status(ex.getStatus()).body(errorOf(ex.getStatus(), ex.getMessage(), request, details));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiModels.ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ApiModels.FieldError> details = ex
            .getBindingResult()
            .getFieldErrors()
            .stream()
            .map(fieldError -> new ApiModels.FieldError(fieldError.getField(), fieldError.getDefaultMessage()))
            .collect(Collectors.toList());
        return ResponseEntity
            .badRequest()
            .body(errorOf(HttpStatus.BAD_REQUEST, "Validation failed", request, details));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiModels.ErrorResponse> handleConstraintViolation(ConstraintViolationException ex, HttpServletRequest request) {
        List<ApiModels.FieldError> details = ex
            .getConstraintViolations()
            .stream()
            .map(violation -> new ApiModels.FieldError(violation.getPropertyPath().toString(), violation.getMessage()))
            .collect(Collectors.toList());
        return ResponseEntity
            .badRequest()
            .body(errorOf(HttpStatus.BAD_REQUEST, "Validation failed", request, details));
    }

    @ExceptionHandler({ HttpMessageConversionException.class, MethodArgumentTypeMismatchException.class })
    public ResponseEntity<ApiModels.ErrorResponse> handleRequestConversion(Exception ex, HttpServletRequest request) {
        return ResponseEntity
            .badRequest()
            .body(errorOf(HttpStatus.BAD_REQUEST, "Invalid request payload", request, List.of()));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiModels.ErrorResponse> handleAuthentication(AuthenticationException ex, HttpServletRequest request) {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(errorOf(HttpStatus.UNAUTHORIZED, "Authentication failed", request, List.of()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiModels.ErrorResponse> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body(errorOf(HttpStatus.FORBIDDEN, "Access is denied", request, List.of()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiModels.ErrorResponse> handleUnexpected(Exception ex, HttpServletRequest request) {
        LOG.error("Unhandled error", ex);
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(errorOf(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected server error", request, List.of()));
    }

    private ApiModels.ErrorResponse errorOf(
        HttpStatus status,
        String message,
        HttpServletRequest request,
        List<ApiModels.FieldError> details
    ) {
        return new ApiModels.ErrorResponse(
            OffsetDateTime.now(),
            status.value(),
            status.getReasonPhrase(),
            message,
            request.getRequestURI(),
            details
        );
    }
}
