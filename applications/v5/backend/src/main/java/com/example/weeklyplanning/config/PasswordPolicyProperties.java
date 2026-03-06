package com.example.weeklyplanning.config;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.security.password")
public class PasswordPolicyProperties {

    @Min(8)
    @Max(200)
    private int minLength = 8;

    private boolean requireUppercase = true;

    private boolean requireLowercase = true;

    private boolean requireDigit = true;

    private boolean requireSpecial = false;

    public int getMinLength() {
        return minLength;
    }

    public void setMinLength(int minLength) {
        this.minLength = minLength;
    }

    public boolean isRequireUppercase() {
        return requireUppercase;
    }

    public void setRequireUppercase(boolean requireUppercase) {
        this.requireUppercase = requireUppercase;
    }

    public boolean isRequireLowercase() {
        return requireLowercase;
    }

    public void setRequireLowercase(boolean requireLowercase) {
        this.requireLowercase = requireLowercase;
    }

    public boolean isRequireDigit() {
        return requireDigit;
    }

    public void setRequireDigit(boolean requireDigit) {
        this.requireDigit = requireDigit;
    }

    public boolean isRequireSpecial() {
        return requireSpecial;
    }

    public void setRequireSpecial(boolean requireSpecial) {
        this.requireSpecial = requireSpecial;
    }
}
