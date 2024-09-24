package com.example.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	@Autowired
    private JavaMailSender mailSender;
	
	public void sendRegistrationEmail(String toEmail, String username, String firstname) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("your_email@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Welcome to Online Banking");
        message.setText("Dear " + firstname + ",\n\nThank you for registering with Online Banking. "
                + "Your CoustomerID is: " + username + ".\n\nBest Regards,\nOnline Banking Team");
        
        mailSender.send(message);
    }
	
	public void sendEmail(String to, String subject, String body) {
	    try {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(to);
	        message.setSubject(subject);
	        message.setText(body);
	        mailSender.send(message);
	    } catch (Exception e) {
	        System.out.println("Error sending email: " + e.getMessage());
	    }
	}
	
	
}
