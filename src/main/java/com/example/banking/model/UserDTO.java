package com.example.banking.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	private Long id;
	private String username;
	
	@NotBlank(message = "Password is required")
	private String password;
	
	@NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
	private String email;
	
	@NotBlank(message = "First name is required")
	private String firstName;
	
	@NotBlank(message = "Last name is required")
	private String lastName;
	
	@NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Mobile number must be 10 digits")
	private String mobileNumber;
	
	@NotBlank(message = "Aadhar number is required")
	//@Pattern(regexp = "^\\d{12}$", message = "Aadhar number must be 12 digits")
	private String aadharNumber;
	
	@NotBlank(message = "PAN number is required")
//	@Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}", message = "Invalid PAN number format")
	private String panNumber;
	
    @NotBlank(message = "Gender is required")
	private String gender;
	
    @NotBlank(message = "City is required")
	private String city;
	
    @NotBlank(message = "State is required")
	private String state;
	
    @NotNull(message = "Pincode is required")
//    @Pattern(regexp = "^\\d{6}$", message = "Pincode must be 6 digits")
	private String pincode;
	
    @NotBlank(message = "Address is required")
	private String address;
	
    @NotNull(message = "Date of birth is required")
	private LocalDate dateOfBirth;
	
	private LocalDateTime createdDate = LocalDateTime.now();
	
	private List<String> roles;
	
    private List<AccountDTO> accounts;

	 // Custom constructor without roles
    public UserDTO(Long id, String username, String password, String email, String firstName, String lastName, String mobileNumber, String aadharNumber, String panNumber, String gender, String city, String state, String pincode, String address, LocalDate dateOfBirth, LocalDateTime createdDate) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobileNumber = mobileNumber;
        this.aadharNumber = aadharNumber;
        this.panNumber = panNumber;
        this.gender = gender;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.createdDate = createdDate;
        this.roles = null; // or empty list if preferred
    }
	
}
