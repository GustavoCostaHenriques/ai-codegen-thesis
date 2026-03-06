package com.example.weeklyplanning.config.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.security")
public class SecurityProperties {

    private String jwtSecret;
    private long jwtExpirationSeconds;
    private final BruteForce bruteForce = new BruteForce();
    private final PasswordPolicy passwordPolicy = new PasswordPolicy();

    public String getJwtSecret() {
        return jwtSecret;
    }

    public void setJwtSecret(String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    public long getJwtExpirationSeconds() {
        return jwtExpirationSeconds;
    }

    public void setJwtExpirationSeconds(long jwtExpirationSeconds) {
        this.jwtExpirationSeconds = jwtExpirationSeconds;
    }

    public BruteForce getBruteForce() {
        return bruteForce;
    }

    public PasswordPolicy getPasswordPolicy() {
        return passwordPolicy;
    }

    public static class BruteForce {
        private int maxAttempts;
        private int lockMinutes;

        public int getMaxAttempts() {
            return maxAttempts;
        }

        public void setMaxAttempts(int maxAttempts) {
            this.maxAttempts = maxAttempts;
        }

        public int getLockMinutes() {
            return lockMinutes;
        }

        public void setLockMinutes(int lockMinutes) {
            this.lockMinutes = lockMinutes;
        }
    }

    public static class PasswordPolicy {
        private int minLength;
        private boolean requireUppercase;
        private boolean requireLowercase;
        private boolean requireDigit;
        private boolean requireSpecial;

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
}
