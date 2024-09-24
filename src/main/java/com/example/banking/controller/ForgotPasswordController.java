package com.example.banking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.banking.model.ForgotPasswordDTO;
import com.example.banking.model.ResetPasswordDTO;
import com.example.banking.service.ForgotPasswordService;

@RestController
@RequestMapping("/api")
public class ForgotPasswordController {
	
	private final ForgotPasswordService forgotPasswordService;

    public ForgotPasswordController(ForgotPasswordService forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        forgotPasswordService.processForgotPassword(forgotPasswordDTO);
        return ResponseEntity.ok("Password reset link has been sent to your email.");
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody ResetPasswordDTO resetPasswordDTO) {
        forgotPasswordService.resetPassword(token, resetPasswordDTO);
        return ResponseEntity.ok("Password has been reset successfully.");
    }
    
    @GetMapping("/reset-password")
    public ResponseEntity<String> showResetPasswordPage(@RequestParam String token) {
        // Here you might want to validate the token or just return a view if necessary
        return ResponseEntity.ok("Token is valid. Please enter your new password.");
    }

}
