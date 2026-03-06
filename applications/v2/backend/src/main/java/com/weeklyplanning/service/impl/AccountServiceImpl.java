package com.weeklyplanning.service.impl;

import com.weeklyplanning.domain.Account;
import com.weeklyplanning.repository.AccountRepository;
import com.weeklyplanning.service.AccountService;
import com.weeklyplanning.service.dto.AccountCreateDTO;
import com.weeklyplanning.service.dto.AccountDTO;
import com.weeklyplanning.service.error.ApiException;
import java.util.Locale;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImpl(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AccountDTO create(AccountCreateDTO request) {
        String normalizedUsername = normalizeUsername(request.getUsername());
        if (accountRepository.existsByUsernameIgnoreCase(normalizedUsername)) {
            throw new ApiException(HttpStatus.CONFLICT, "Username already exists");
        }

        Account account = new Account();
        account.setUsername(normalizedUsername);
        account.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        account.setRole(request.getRole());
        account = accountRepository.save(account);
        return toDto(account);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AccountDTO> findByUsername(String username) {
        return accountRepository.findOneByUsernameIgnoreCase(normalizeUsername(username)).map(this::toDto);
    }

    private String normalizeUsername(String username) {
        return username == null ? null : username.trim().toLowerCase(Locale.ROOT);
    }

    private AccountDTO toDto(Account account) {
        AccountDTO dto = new AccountDTO();
        dto.setId(account.getId());
        dto.setUsername(account.getUsername());
        dto.setRole(account.getRole());
        return dto;
    }
}
