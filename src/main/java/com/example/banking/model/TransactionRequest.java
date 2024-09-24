package com.example.banking.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {
	private Long id;
    private String sourceAccountNumber;
    private String destinationAccountNumber;
    private Double amount;
    private LocalDateTime transactionDate;
    private Transaction.TransactionType transactionType; // Update to use the enum
    private String status;
    private String message;
    private boolean isInterBank;
}
