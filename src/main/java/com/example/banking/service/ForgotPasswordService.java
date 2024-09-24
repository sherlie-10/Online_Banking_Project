package com.example.banking.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.banking.model.ForgotPasswordDTO;
import com.example.banking.model.PasswordResetToken;
import com.example.banking.model.ResetPasswordDTO;
import com.example.banking.model.User;
import com.example.banking.repository.PasswordResetTokenRepository;
import com.example.banking.repository.UserRepo;


@Service
public class ForgotPasswordService {
	@Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;
    
    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Transactional
    public void processForgotPassword(ForgotPasswordDTO forgotPasswordDTO) {
        // 1. Find the user by email
        User user = userRepo.findByEmail(forgotPasswordDTO.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found with email: " + forgotPasswordDTO.getEmail()));

        // 2. Generate a random token
        String token = UUID.randomUUID().toString();

        // 3. Set token expiry time (e.g., 30 minutes)
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(30);

        // 4. Create and save the password reset token
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user, expiryDate);
        tokenRepository.save(passwordResetToken);

        // 5. Send email with reset link
        sendForgotPasswordEmail(user.getEmail(), token);
    }

    private void sendForgotPasswordEmail(String email, String token) {
        //String resetLink = "http://localhost:9090/api/reset-password?token=" + token;
    	String resetLink = "http://localhost:5173/reset-password?token=" + token;
        String subject = "Password Reset Request";
        String body = "To reset your password, click the following link: " + resetLink;

        // Send email logic
        emailService.sendEmail(email, subject, body);
    }
    
    
    @Transactional
    public void resetPassword(String token, ResetPasswordDTO resetPasswordDTO) {
        PasswordResetToken passwordResetToken = tokenRepository.findByToken(token);
        		// Check if the token exists
        	    if (passwordResetToken == null) {
        	        throw new RuntimeException("Invalid token");
        	    }

        // Check if token is expired
        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }

        // Find user and update password
        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));
        userRepo.save(user);
        
        // Optionally, delete the token after use
        tokenRepository.delete(passwordResetToken);
    }
}
