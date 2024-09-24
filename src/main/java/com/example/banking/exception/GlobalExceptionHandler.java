package com.example.banking.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	// Handle validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // Handle unique constraint violations
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        String message = ex.getMostSpecificCause().getMessage();

        if (message.contains("username")) {
            errors.put("username", "Username already exists");
        } else if (message.contains("email")) {
            errors.put("email", "Email already exists");
        } else if (message.contains("mobile_number")) {
            errors.put("mobileNumber", "Mobile number already exists");
        } else if (message.contains("aadhar_number")) {
            errors.put("aadharNumber", "Aadhar number already exists");
        } else if (message.contains("pan_number")) {
            errors.put("panNumber", "PAN number already exists");
        } else {
            errors.put("error", "Data integrity violation");
        }

        return new ResponseEntity<>(errors, HttpStatus.CONFLICT); // Using CONFLICT (409) for data integrity issues
    }

    // Handle other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
