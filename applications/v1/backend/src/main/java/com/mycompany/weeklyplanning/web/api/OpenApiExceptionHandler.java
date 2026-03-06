package com.mycompany.weeklyplanning.web.api;

import com.mycompany.weeklyplanning.service.api.ApiConflictException;
import com.mycompany.weeklyplanning.service.api.ApiException;
import com.mycompany.weeklyplanning.service.api.ApiFieldError;
import com.mycompany.weeklyplanning.service.api.ApiNotFoundException;
import com.mycompany.weeklyplanning.service.api.ApiValidationException;
import com.mycompany.weeklyplanning.service.api.dto.ErrorDetail;
import com.mycompany.weeklyplanning.service.api.dto.ErrorResponse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "com.mycompany.weeklyplanning.web.api")
public class OpenApiExceptionHandler {

    @ExceptionHandler(ApiNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ApiNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(toErrorResponse(ex));
    }

    @ExceptionHandler(ApiConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflict(ApiConflictException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(toErrorResponse(ex));
    }

    @ExceptionHandler(ApiValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ApiValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(toErrorResponse(ex));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleBeanValidation(MethodArgumentNotValidException ex) {
        List<ErrorDetail> details = ex.getBindingResult().getFieldErrors().stream().map(err -> {
            ErrorDetail d = new ErrorDetail();
            d.setField(err.getField());
            d.setMessage(err.getDefaultMessage() != null ? err.getDefaultMessage() : "invalid");
            return d;
        }).toList();

        ErrorResponse response = new ErrorResponse();
        response.setCode("VALIDATION_ERROR");
        response.setMessage("Validation failed");
        response.setDetails(details);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    private ErrorResponse toErrorResponse(ApiException ex) {
        ErrorResponse response = new ErrorResponse();
        response.setCode(ex.getCode());
        response.setMessage(ex.getMessage() != null ? ex.getMessage() : ex.getCode());
        response.setDetails(ex.getDetails().stream().map(this::toErrorDetail).toList());
        return response;
    }

    private ErrorDetail toErrorDetail(ApiFieldError e) {
        ErrorDetail d = new ErrorDetail();
        d.setField(e.field());
        d.setMessage(e.message());
        return d;
    }
}

