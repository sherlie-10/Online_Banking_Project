package com.example.banking.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.banking.model.AccountDTO;
import com.example.banking.service.AccountService;

@RestController
@RequestMapping("/api/user")
public class AccountController {
	@Autowired
	private AccountService accountService;
	
	// Create a new account for a user
    @PostMapping("/createAcc")
    public ResponseEntity<AccountDTO> createAccount(@RequestBody AccountDTO accountDTO, Principal principal) {
        // The principal will automatically get the username from the JWT token
        String username = principal.getName(); // This gets the username from the authenticated user

        // Pass the username to the service layer to create the account
        AccountDTO createdAccount = accountService.createAccount(username, accountDTO);
        return ResponseEntity.ok(createdAccount);
    }
    
    
    @GetMapping("/my-accounts")
    public ResponseEntity<List<AccountDTO>> getAllAccountsForUser(Principal principal) {
        // Get the username from the Principal object
        String username = principal.getName();

        // Pass the username to the service to fetch the accounts
        List<AccountDTO> accounts = accountService.getAllAccountsForUser(username);

        // Return the list of accounts
        return ResponseEntity.ok(accounts);
    }

    // Fetch an single account by account number
    @GetMapping("/my-accounts/{accountNumber}")
    public ResponseEntity<AccountDTO> getAccountForUserByAccountNumber(@PathVariable String accountNumber, Principal principal) {
        // Get the username from the Principal object
        String username = principal.getName();

        // Pass the username and account number to the service
        AccountDTO account = accountService.getAccountForUserByAccountNumber(username, accountNumber);

        return ResponseEntity.ok(account);
    }

    // Update account status (e.g., to freeze or close the account)
    @PutMapping("/{accountNumber}/status")
    public ResponseEntity<AccountDTO> updateAccountStatus(@PathVariable String accountNumber, @RequestBody String status) {
        AccountDTO updatedAccount = accountService.updateAccountStatus(accountNumber, status);
        return ResponseEntity.ok(updatedAccount);
    }
}
