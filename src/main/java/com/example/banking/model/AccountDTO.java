package com.example.banking.model;

import java.time.LocalDateTime;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor
public class AccountDTO {
	private Long accountID;
    private String accountNumber;
    private Double balance;
    private AccountType accountType;
    private double fines;
    private String accountStatus;
    private LocalDateTime createdDate;
	public AccountDTO(Long accountID, String accountNumber, Double balance, AccountType accountType, double fines,
			String accountStatus, LocalDateTime createdDate) {
		super();
		this.accountID = accountID;
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.accountType = accountType;
		this.fines = fines;
		this.accountStatus = accountStatus;
		this.createdDate = createdDate;
	}
	
    
}
