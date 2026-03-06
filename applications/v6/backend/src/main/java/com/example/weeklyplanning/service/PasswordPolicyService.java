package com.example.weeklyplanning.service;

import com.example.weeklyplanning.config.PasswordPolicyProperties;
import com.example.weeklyplanning.web.rest.errors.UnprocessableEntityException;
import org.springframework.stereotype.Service;

@Service
public class PasswordPolicyService {

    private final PasswordPolicyProperties properties;

    public PasswordPolicyService(PasswordPolicyProperties properties) {
        this.properties = properties;
    }

    public void validate(String password) {
        if (password == null || password.length() < properties.getMinLength()) {
            throw new UnprocessableEntityException("Password does not meet minimum length policy.");
        }
        if (properties.isRequireUppercase() && password.chars().noneMatch(Character::isUpperCase)) {
            throw new UnprocessableEntityException("Password must contain at least one uppercase letter.");
        }
        if (properties.isRequireLowercase() && password.chars().noneMatch(Character::isLowerCase)) {
            throw new UnprocessableEntityException("Password must contain at least one lowercase letter.");
        }
        if (properties.isRequireDigit() && password.chars().noneMatch(Character::isDigit)) {
            throw new UnprocessableEntityException("Password must contain at least one number.");
        }
        if (properties.isRequireSpecial() && password.chars().allMatch(Character::isLetterOrDigit)) {
            throw new UnprocessableEntityException("Password must contain at least one special character.");
        }
    }
}
