package com.example.banking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "transactions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transaction {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "source_account_id", nullable = false)
	    @JsonIgnore
	    private Account sourceAccount;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "destination_account_id", nullable = true)
	    @JsonIgnore
	    private Account destinationAccount; // Ensure this is of type Account

	    @Column(nullable = false)
	    private Double amount;

	    @Column(nullable = false)
	    private LocalDateTime transactionDate = LocalDateTime.now();

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private TransactionType transactionType; // Using enum for transaction types, "TRANSFER", "INTER_BANK", etc.

	    @Column(nullable = false)
	    private String status; // "SUCCESS", "FAILED", etc.
	    
	    @Column(nullable = false)
	    private String message;

	    
	    public enum TransactionType {
	        DEPOSIT,
	        WITHDRAWAL,
	        TRANSFER,
	        SELF_TRANSFER,
	        INTER_BANK
	    }
}
