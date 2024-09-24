package com.example.banking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.example.banking.model")
public class OnlineBankingAppln2Application {

	public static void main(String[] args) {
		SpringApplication.run(OnlineBankingAppln2Application.class, args);
	}

}
