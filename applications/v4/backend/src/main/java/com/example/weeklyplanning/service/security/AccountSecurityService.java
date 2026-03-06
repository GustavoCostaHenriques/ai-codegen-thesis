package com.example.weeklyplanning.service.security;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.repository.AccountRepository;
import com.example.weeklyplanning.web.rest.errors.UnauthorizedException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountSecurityService {

    private final AccountRepository accountRepository;

    public AccountSecurityService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public AuthenticatedPrincipal toPrincipal(AccountEntity account) {
        return new AuthenticatedPrincipal(
            account.getAccountId(),
            account.getPerson().getPersonId(),
            account.getUsername(),
            account.getPasswordHash(),
            account.getRole(),
            account.getPerson().getStatus()
        );
    }

    public AuthenticatedPrincipal loadByAccountId(UUID accountId) {
        AccountEntity account = accountRepository.findByAccountId(accountId)
            .orElseThrow(() -> new UnauthorizedException("Account not found"));
        return toPrincipal(account);
    }
}
