package com.example.banking.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FixedDepositDTO {
	private Long id;
    private Double depositAmount;
    private TenureEnum tenure;  // Keep tenure as it is
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
}

