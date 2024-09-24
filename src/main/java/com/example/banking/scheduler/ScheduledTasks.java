package com.example.banking.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.example.banking.service.AccountService;

public class ScheduledTasks {
	 @Autowired
	    private AccountService accountService;

	    @Scheduled(cron = "0 0 1 1 * ?") // At 01:00 AM on the 1st day of every month
	    public void scheduleMonthlyFineUpdate() {
	        accountService.monthlyFineUpdate();
	    }
}
