package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.repository.AccountRepository;
import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Component
public class UsernameService {

    private final AccountRepository accountRepository;

    public UsernameService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public String resolveUnique(String requested, String email, UUID excludingAccountId) {
        String base = normalize(requested);
        if (base.isBlank()) {
            int at = email.indexOf('@');
            base = at > 0 ? normalize(email.substring(0, at)) : "user";
        }

        String candidate = base;
        int suffix = 1;
        while (isTaken(candidate, excludingAccountId)) {
            candidate = base + suffix;
            suffix++;
        }
        return candidate;
    }

    public String normalize(String raw) {
        if (raw == null) {
            return "";
        }
        return raw.trim().toLowerCase(Locale.ROOT);
    }

    public boolean isTaken(String username, UUID excludingAccountId) {
        Optional<AccountEntity> existing = accountRepository.findByUsernameIgnoreCase(username);
        if (existing.isEmpty()) {
            return false;
        }
        if (excludingAccountId == null) {
            return true;
        }
        return !existing.get().getAccountId().equals(excludingAccountId);
    }

}
