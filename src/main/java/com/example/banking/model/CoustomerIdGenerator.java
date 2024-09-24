package com.example.banking.model;

import java.security.SecureRandom;

public class CoustomerIdGenerator {
	private static final String CHARACTERS = "0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();
    
    public static String generateUserId() {
    	int length = 4 + RANDOM.nextInt(3); // genrate a lingth of 4,5,6
    	StringBuilder coustomerId = new StringBuilder(length);
    	
    	for(int i = 0; i < length; i++) {
    		coustomerId.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
    	}
    	return coustomerId.toString();
    }
}
