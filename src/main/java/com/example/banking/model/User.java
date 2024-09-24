package com.example.banking.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String username;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	private String firstName;
	
	@Column(nullable = false)
	private String lastName;
	
	@Column(nullable = false, unique = true)
	private String mobileNumber;
	
	@Column(nullable = false, unique = true)
	private String aadharNumber;
	
	@Column(nullable = false, unique = true)
	private String panNumber;
	
	@Column(nullable = false)
	private String gender;
	
	@Column(nullable = false)
	private LocalDate dateOfBirth;
	
	@Column(nullable = false)
	private String city;
	
	@Column(nullable = false)
	private String state;
	
	@Column(nullable = false)
	private String pincode;
	
	@Column(nullable = false)
	private String address;
	
	private LocalDateTime createdDate = LocalDateTime.now();
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn( name = "user_id"), inverseJoinColumns = @JoinColumn( name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
//	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//	private Account account;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
    private Set<Account> accounts;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<PasswordResetToken> passwordResetTokens;
	
	@PrePersist
	public void prePersist() {
		if(this.username == null) {
			this.username = CoustomerIdGenerator.generateUserId();
		}
		
		// Assign default role USER
        if(this.roles.isEmpty()) {
            Role userRole = new Role();
            userRole.setName(RoleName.USER);  // Assuming roles are predefined
            this.roles.add(userRole);
        }
	}
	
	
}
