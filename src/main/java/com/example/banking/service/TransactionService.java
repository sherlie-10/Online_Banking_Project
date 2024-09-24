package com.example.banking.service;

import com.example.banking.model.*;
import com.example.banking.repository.AccountRepository;
import com.example.banking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class TransactionService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Transactional
    public Transaction processTransaction(TransactionRequest request, String username) {
        Account sourceAccount = accountRepository.findByAccountNumber(request.getSourceAccountNumber());
        if (sourceAccount == null || !sourceAccount.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Invalid source account");
        }
        
        // Check if the transaction is inter-bank
        if (request.isInterBank()) {
            return handleInterBankTransfer(request, sourceAccount);
        }

        switch (request.getTransactionType()) {
            case TRANSFER:
                return handleTransfer(request, sourceAccount);
            case WITHDRAWAL:
                return handleWithdrawal(request, sourceAccount);
            case DEPOSIT:
                return handleDeposit(request, sourceAccount);
            case INTER_BANK:
            	 return handleInterBankTransfer(request, sourceAccount);
            default:
                throw new RuntimeException("Invalid transaction type");
        }
    }
    

    // New method to handle inter-bank transfers
    private Transaction handleInterBankTransfer(TransactionRequest request, Account sourceAccount) {
        // For inter-bank, no destination account in local database
        if (sourceAccount.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient balance for inter-bank transfer");
        }

        // Deduct the amount from the source account
        sourceAccount.setBalance(sourceAccount.getBalance() - request.getAmount());
        accountRepository.save(sourceAccount);

        // Create a transaction record
        Transaction transaction = new Transaction();
        transaction.setSourceAccount(sourceAccount);
        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(Transaction.TransactionType.INTER_BANK);
        transaction.setStatus("SUCCESS");
        transaction.setMessage("Inter-bank transfer to " + request.getDestinationAccountNumber());

        return transactionRepository.save(transaction);
    }


    private Transaction handleTransfer(TransactionRequest request, Account sourceAccount) {
        Account destinationAccount = accountRepository.findByAccountNumber(request.getDestinationAccountNumber());
        if (destinationAccount == null) {
            throw new RuntimeException("Destination account not found");
        }

        if (sourceAccount.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient balance for transfer");
        }

        sourceAccount.setBalance(sourceAccount.getBalance() - request.getAmount());
        destinationAccount.setBalance(destinationAccount.getBalance() + request.getAmount());

        accountRepository.save(sourceAccount);
        accountRepository.save(destinationAccount);

        Transaction transaction = new Transaction();
        transaction.setSourceAccount(sourceAccount);
        transaction.setDestinationAccount(destinationAccount);
        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(Transaction.TransactionType.TRANSFER);
        transaction.setStatus("SUCCESS");
        transaction.setMessage(request.getMessage());

        return transactionRepository.save(transaction);
    }

    private Transaction handleWithdrawal(TransactionRequest request, Account sourceAccount) {
        if (sourceAccount.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient balance for withdrawal");
        }
        sourceAccount.setBalance(sourceAccount.getBalance() - request.getAmount());
        accountRepository.save(sourceAccount);

        Transaction transaction = new Transaction();
        transaction.setSourceAccount(sourceAccount);
        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(Transaction.TransactionType.WITHDRAWAL);
        transaction.setStatus("SUCCESS");
        transaction.setMessage(request.getMessage());

        return transactionRepository.save(transaction);
    }

    private Transaction handleDeposit(TransactionRequest request, Account sourceAccount) {
        sourceAccount.setBalance(sourceAccount.getBalance() + request.getAmount());
        accountRepository.save(sourceAccount);

        Transaction transaction = new Transaction();
        transaction.setSourceAccount(sourceAccount);
        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(Transaction.TransactionType.DEPOSIT);
        transaction.setStatus("SUCCESS");
        transaction.setMessage(request.getMessage());

        return transactionRepository.save(transaction);
    }

    @Transactional
    public List<Transaction> getTransactionsByUser(String username) {
        List<Transaction> sentTransactions = transactionRepository.findBySourceAccount_User_Username(username);
        List<Transaction> receivedTransactions = transactionRepository.findByDestinationAccount_User_Username(username);
        sentTransactions.addAll(receivedTransactions);
        return sentTransactions;
    }
    
    
    @Transactional
    public List<Transaction> getTransactionsByUserAndAccountType(String username, AccountType accountType) {
        List<Transaction> sentTransactions = transactionRepository.findBySourceAccount_User_UsernameAndSourceAccount_AccountType(username, accountType);
        List<Transaction> receivedTransactions = transactionRepository.findByDestinationAccount_User_UsernameAndDestinationAccount_AccountType(username, accountType);
        sentTransactions.addAll(receivedTransactions);
        return sentTransactions;
    }

    

    
}
