package com.example.banking.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "fixed_deposits")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FixedDeposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    @JsonIgnore
    private Account account;  // Reference to the user's account (savings account)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;  // Reference to the user

    @Column(nullable = false)
    private Double depositAmount;  // Amount deposited
    
    @Column(name = "interest_rate", nullable = false)
    private Double interestRate;  // This should already be in your entity

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TenureEnum tenure;  // Duration in months/years

    @Column(nullable = false)
    private LocalDateTime startDate;  // FD start date

    @Column(nullable = false)
    private LocalDateTime endDate;  // FD maturity date

    @Column(nullable = false)
    private String status;  // e.g., ACTIVE, MATURED, CLOSED
}

