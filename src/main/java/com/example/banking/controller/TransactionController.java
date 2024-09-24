package com.example.banking.controller;

import com.example.banking.model.AccountType;
import com.example.banking.model.Transaction;
import com.example.banking.model.TransactionRequest;
import com.example.banking.service.TransactionService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/process")
    public ResponseEntity<Transaction> processTransaction(
        @RequestBody TransactionRequest transactionRequest,
        @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();
        Transaction transaction = transactionService.processTransaction(transactionRequest, username);

        return ResponseEntity.ok(transaction);
    }

    @GetMapping("/userAllTransaction")
    public ResponseEntity<List<Transaction>> getUserTransactions(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<Transaction> transactions = transactionService.getTransactionsByUser(username);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/userAccountTypeTransaction")
    public ResponseEntity<List<Transaction>> getUserTransactions(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam AccountType accountType) {
        String username = userDetails.getUsername();
        List<Transaction> transactions = transactionService.getTransactionsByUserAndAccountType(username, accountType);
        return ResponseEntity.ok(transactions);
    }



}
