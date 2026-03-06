package com.example.weeklyplanning.service.security;

import com.example.weeklyplanning.config.security.SecurityProperties;
import com.example.weeklyplanning.web.rest.errors.ValidationException;
import org.springframework.stereotype.Service;

@Service
public class PasswordPolicyService {

    private final SecurityProperties securityProperties;

    public PasswordPolicyService(SecurityProperties securityProperties) {
        this.securityProperties = securityProperties;
    }

    public void validate(String password) {
        SecurityProperties.PasswordPolicy policy = securityProperties.getPasswordPolicy();

        if (password == null || password.length() < policy.getMinLength()) {
            throw new ValidationException("Password does not meet minimum length policy");
        }
        if (policy.isRequireUppercase() && !password.chars().anyMatch(Character::isUpperCase)) {
            throw new ValidationException("Password must include at least one uppercase letter");
        }
        if (policy.isRequireLowercase() && !password.chars().anyMatch(Character::isLowerCase)) {
            throw new ValidationException("Password must include at least one lowercase letter");
        }
        if (policy.isRequireDigit() && !password.chars().anyMatch(Character::isDigit)) {
            throw new ValidationException("Password must include at least one digit");
        }
        if (policy.isRequireSpecial() && password.chars().allMatch(Character::isLetterOrDigit)) {
            throw new ValidationException("Password must include at least one special character");
        }
    }
}
