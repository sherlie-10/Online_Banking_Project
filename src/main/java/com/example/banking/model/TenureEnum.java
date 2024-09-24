package com.example.banking.model;

public enum TenureEnum {
	ONE_YEAR(12, 5.0),  // 5.0% for 1 year
    TWO_YEARS(24, 5.5), // 5.5% for 2 years
    FIVE_YEARS(60, 6.0), // 6.0% for 5 years
    TEN_YEARS(120, 6.5); // 6.5% for 10 years

    private final int months;
    private final double interestRate;

    TenureEnum(int months, double interestRate) {
        this.months = months;
        this.interestRate = interestRate;
    }

    public int getMonths() {
        return this.months;
    }

    public double getInterestRate() {
        return this.interestRate;
    }
}
