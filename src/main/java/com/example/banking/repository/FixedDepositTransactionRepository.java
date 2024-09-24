package com.example.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.banking.model.FixedDeposit;
import com.example.banking.model.FixedDepositTransaction;
@Repository
public interface FixedDepositTransactionRepository extends JpaRepository<FixedDepositTransaction, Long> {
	List<FixedDepositTransaction> findByFixedDeposit(FixedDeposit fixedDeposit);
}
