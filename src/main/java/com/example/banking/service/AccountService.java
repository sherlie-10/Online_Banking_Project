package com.example.banking.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.banking.model.Account;
import com.example.banking.model.AccountDTO;
import com.example.banking.model.AccountType;
import com.example.banking.model.User;
import com.example.banking.repository.AccountRepository;
import com.example.banking.repository.UserRepo;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private UserRepo userRepo;
	
	public AccountDTO createAccount(String username, AccountDTO accountDTO) {
        // Find the user by username (extracted from JWT token)
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        // Check for existing account with the same type for the user
        List<Account> existingAccounts = accountRepository.findByUser(user);
        if (accountDTO.getAccountType() == AccountType.SAVING_ACCOUNT && existingAccounts.stream().anyMatch(a -> a.getAccountType() == AccountType.SAVING_ACCOUNT)) {
            throw new RuntimeException("User already has a savings account");
        }
        if (accountDTO.getAccountType() == AccountType.CURRENT_ACCOUNT && existingAccounts.stream().anyMatch(a -> a.getAccountType() == AccountType.CURRENT_ACCOUNT)) {
            throw new RuntimeException("User already has a current account");
        }

        Account account = new Account();
        account.setAccountNumber(generateAccountNumber());
        account.setAccountType(accountDTO.getAccountType());
        account.setBalance(accountDTO.getBalance());
        account.setAccountStatus("ACTIVE");
        account.setCreatedDate(LocalDateTime.now());
        account.setUser(user); // Link the account to the logged-in user

        Account savedAccount = accountRepository.save(account);
        return mapToDTO(savedAccount);
    }
	
	
	//getting all account for specific user
	public List<AccountDTO> getAllAccountsForUser(String username) {
	    // Find the user by username
	    User user = userRepo.findByUsername(username);
	    if (user == null) {
	        throw new RuntimeException("User not found");
	    }

	    // Fetch all accounts associated with this user
	    List<Account> accounts = accountRepository.findByUser(user);

	    // Convert the list of Account entities to a list of AccountDTOs
	    return accounts.stream()
	                   .map(this::mapToDTO)
	                   .collect(Collectors.toList());
	}

	
	// Fetch single account by account number
	public AccountDTO getAccountForUserByAccountNumber(String username, String accountNumber) {
	    // Find the user by username
	    User user = userRepo.findByUsername(username);
	    if (user == null) {
	        throw new RuntimeException("User not found");
	    }

	    // Fetch the account by account number
	    Account account = accountRepository.findByAccountNumber(accountNumber);

	    // Check if the account belongs to the user
	    if (account == null || !account.getUser().getId().equals(user.getId())) {
	        throw new RuntimeException("Account not found or doesn't belong to the user");
	    }

	    // Return the account details
	    return mapToDTO(account);
	}
    
 // Update account status
    public AccountDTO updateAccountStatus(String accountNumber, String status) {
        Account account = accountRepository.findByAccountNumber(accountNumber);
        if (account == null) {
            throw new RuntimeException("Account not found");
        }
        account.setAccountStatus(status);
        Account updatedAccount = accountRepository.save(account);
        return mapToDTO(updatedAccount);
    }

    // Helper method to generate a unique account number
    private String generateAccountNumber() {
    	Random random = new Random();
        return String.format("%010d", random.nextInt(1_000_000_000));
    }
    
 // Method to check and apply fines for all accounts of a user
    public void applyFinesForUserAccounts(String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Account> accounts = accountRepository.findByUser(user);
        for (Account account : accounts) {
            if (account.getBalance() < 500) {
                // Apply fine if balance is below 500
                account.setFines(account.getFines() + 45); // Increment fines
                account.setBalance(account.getBalance() - 45); // Deduct from balance
                accountRepository.save(account); // Save the updated account
            }
        }
    }

    // Call this method periodically (e.g., via a scheduled task) to apply fines
    public void monthlyFineUpdate() {
        // Assuming you call this method once a month
        List<User> users = userRepo.findAll(); // Fetch all users
        for (User user : users) {
            applyFinesForUserAccounts(user.getUsername());
        }
    }

    // Helper method to map Account entity to AccountDTO
    private AccountDTO mapToDTO(Account account) {
        return new AccountDTO(
            account.getAccountID(),
            account.getAccountNumber(),
            account.getBalance(),
            account.getAccountType(),
            account.getFines(),
            account.getAccountStatus(),
            account.getCreatedDate()
            
        );
    }
}
