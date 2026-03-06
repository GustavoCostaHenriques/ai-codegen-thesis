package com.example.weeklyplanning.config;

import jakarta.validation.constraints.Min;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.security.bruteforce")
public class BruteForceProperties {

    @Min(1)
    private int maxAttempts = 5;

    @Min(30)
    private long windowSeconds = 300;

    @Min(30)
    private long lockDurationSeconds = 600;

    public int getMaxAttempts() {
        return maxAttempts;
    }

    public void setMaxAttempts(int maxAttempts) {
        this.maxAttempts = maxAttempts;
    }

    public long getWindowSeconds() {
        return windowSeconds;
    }

    public void setWindowSeconds(long windowSeconds) {
        this.windowSeconds = windowSeconds;
    }

    public long getLockDurationSeconds() {
        return lockDurationSeconds;
    }

    public void setLockDurationSeconds(long lockDurationSeconds) {
        this.lockDurationSeconds = lockDurationSeconds;
    }
}
