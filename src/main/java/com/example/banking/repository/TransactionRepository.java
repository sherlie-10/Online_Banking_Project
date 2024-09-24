package com.example.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.banking.model.AccountType;
import com.example.banking.model.Transaction;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	List<Transaction> findBySourceAccount_User_Username(String username);
    List<Transaction> findByDestinationAccount_User_Username(String username);
    
 // New methods to find transactions by account type
    List<Transaction> findBySourceAccount_User_UsernameAndSourceAccount_AccountType(String username, AccountType accountType);
    List<Transaction> findByDestinationAccount_User_UsernameAndDestinationAccount_AccountType(String username, AccountType accountType);

}
