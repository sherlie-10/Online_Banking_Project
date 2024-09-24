package com.example.banking.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "accounts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long accountID;
	
	@Column(nullable = false, unique = true)
	private String accountNumber;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
	private  AccountType accountType; 
	
	@Column(nullable = false)
	private Double balance;
	
	@Column(nullable = false)
    private String accountStatus; // ACTIVE, INACTIVE, FROZEN, etc.
	
	private double fines; // Initialize this to 0 when creating an account

    private LocalDateTime createdDate = LocalDateTime.now();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
    
 // NEW: One-to-Many relationship for fixed deposits
 	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
 	private List<FixedDeposit> fixedDeposits;
}
