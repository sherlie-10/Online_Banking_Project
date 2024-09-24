package com.example.banking.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fixed_deposit_transactions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FixedDepositTransaction {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fixed_deposit_id", nullable = false)
    @JsonIgnore
    private FixedDeposit fixedDeposit;  // Reference to the FD

    @Column(nullable = false)
    private String transactionType;  // e.g., DEPOSIT, INTEREST, WITHDRAWAL

    @Column(nullable = false)
    private LocalDateTime transactionDate;  // Date of transaction

    @Column(nullable = false)
    private Double amount;  // Transaction amount (could be deposit or interest accrued)
}
