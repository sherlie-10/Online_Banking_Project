package com.example.banking.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.banking.model.FixedDepositDTO;
import com.example.banking.service.FixedDepositService;

@RestController
@RequestMapping("/api/user/fixed-deposit")
public class FixedDepositController {

    @Autowired
    private FixedDepositService fixedDepositService;


    @PostMapping("/create")
    public ResponseEntity<FixedDepositDTO> createFixedDeposit(@RequestBody FixedDepositDTO fixedDepositDTO, 
                                                              Principal principal) {
        String username = principal.getName();
        FixedDepositDTO createdFD = fixedDepositService.createFixedDeposit(username, fixedDepositDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFD);  // Return 201 Created
    }

    @GetMapping("/all")
    public ResponseEntity<List<FixedDepositDTO>> getAllFixedDepositsForUser(Principal principal) {
        String username = principal.getName();
        List<FixedDepositDTO> fixedDeposits = fixedDepositService.getAllFixedDepositsForUser(username);
        return ResponseEntity.ok(fixedDeposits);
    }
}

