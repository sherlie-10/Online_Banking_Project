package com.example.banking.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.banking.model.Account;
import com.example.banking.model.AccountType;
import com.example.banking.model.FixedDeposit;
import com.example.banking.model.FixedDepositDTO;
import com.example.banking.model.TenureEnum;
import com.example.banking.model.User;
import com.example.banking.repository.AccountRepository;
import com.example.banking.repository.FixedDepositRepository;
import com.example.banking.repository.UserRepo;

@Service
public class FixedDepositService {
	 @Autowired
	    private FixedDepositRepository fixedDepositRepository;

	    @Autowired
	    private AccountRepository accountRepository;
	    
	    @Autowired
	    private UserRepo userRepo;

	    public FixedDepositDTO createFixedDeposit(String username, FixedDepositDTO fixedDepositDTO) {
	        // Find the user by username
	        User user = userRepo.findByUsername(username);
	        if (user == null) {
	            throw new RuntimeException("User not found");
	        }

	        // Find the user's savings account
	        Account account = accountRepository.findByUserIdAndAccountType(user.getId(), AccountType.SAVING_ACCOUNT);
	        if (account == null) {
	            throw new RuntimeException("Savings account not found for user");
	        }

	        // Validate tenure and set interest rate based on tenure
	        TenureEnum tenureEnum = fixedDepositDTO.getTenure();
	        Double interestRate = tenureEnum.getInterestRate(); // Get the interest rate from the enum

	        // Deduct the amount from the savings account
	        if (account.getBalance() < fixedDepositDTO.getDepositAmount()) {
	            throw new RuntimeException("Insufficient balance in savings account");
	        }
	        account.setBalance(account.getBalance() - fixedDepositDTO.getDepositAmount());
	        accountRepository.save(account);

	        // Create and save FD
	        FixedDeposit fixedDeposit = new FixedDeposit();
	        fixedDeposit.setAccount(account);
	        fixedDeposit.setUser(user);
	        fixedDeposit.setDepositAmount(fixedDepositDTO.getDepositAmount());
	        fixedDeposit.setTenure(tenureEnum);  // Use the tenure enum directly
	        fixedDeposit.setInterestRate(interestRate);  // Set the interest rate from the enum
	        fixedDeposit.setStartDate(LocalDateTime.now());
	        fixedDeposit.setEndDate(LocalDateTime.now().plusMonths(tenureEnum.getMonths()));
	        fixedDeposit.setStatus("ACTIVE");

	        FixedDeposit savedFD = fixedDepositRepository.save(fixedDeposit);

	        return mapToDTO(savedFD);
	    }


	    // Helper to convert entity to DTO
	    private FixedDepositDTO mapToDTO(FixedDeposit fd) {
	        return new FixedDepositDTO(
	            fd.getId(),
	            fd.getDepositAmount(),
	            
	            fd.getTenure(),
	            fd.getStartDate(),
	            fd.getEndDate(),
	            fd.getStatus()
	        );
	    }

	    public List<FixedDepositDTO> getAllFixedDepositsForUser(String username) {
	        User user = userRepo.findByUsername(username);
	        if (user == null) {
	            throw new RuntimeException("User not found");
	        }

	        List<FixedDeposit> fixedDeposits = fixedDepositRepository.findByUser(user);
	        return fixedDeposits.stream()
	                .map(this::mapToDTO)
	                .toList();
	    }
}
