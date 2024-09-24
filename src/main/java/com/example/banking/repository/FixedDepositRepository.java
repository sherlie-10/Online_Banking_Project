package com.example.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.banking.model.Account;
import com.example.banking.model.FixedDeposit;
import com.example.banking.model.User;
@Repository
public interface FixedDepositRepository extends JpaRepository<FixedDeposit, Long> {
	 List<FixedDeposit> findByUser(User user);
	    List<FixedDeposit> findByAccount(Account account);
}
