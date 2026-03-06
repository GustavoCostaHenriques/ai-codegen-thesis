package com.weeklyplanning.service;

import com.weeklyplanning.repository.AccountRepository;
import java.util.Locale;
import org.springframework.stereotype.Component;

@Component
public class UsernameResolver {

    private final AccountRepository accountRepository;

    public UsernameResolver(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public String resolveForCreate(String requestedUsername, String email) {
        String base = normalize(requestedUsername == null || requestedUsername.isBlank() ? emailLocalPart(email) : requestedUsername);
        if (base.isBlank()) {
            base = "user";
        }

        String candidate = base;
        int suffix = 1;
        while (accountRepository.existsByUsernameIgnoreCase(candidate)) {
            candidate = base + suffix;
            suffix++;
        }
        return candidate;
    }

    public String resolveForUpdate(String requestedUsername, String email, java.util.UUID accountId) {
        String base = normalize(requestedUsername == null || requestedUsername.isBlank() ? emailLocalPart(email) : requestedUsername);
        if (base.isBlank()) {
            base = "user";
        }

        String candidate = base;
        int suffix = 1;
        while (accountRepository.existsByUsernameIgnoreCaseAndIdNot(candidate, accountId)) {
            candidate = base + suffix;
            suffix++;
        }
        return candidate;
    }

    private String emailLocalPart(String email) {
        int at = email.indexOf('@');
        return at > 0 ? email.substring(0, at) : email;
    }

    private String normalize(String value) {
        return value.trim().toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9._-]", "");
    }
}
