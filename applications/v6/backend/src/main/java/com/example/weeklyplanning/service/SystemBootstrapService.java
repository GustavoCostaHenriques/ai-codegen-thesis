package com.example.weeklyplanning.service;

import com.example.weeklyplanning.config.BootstrapProperties;
import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PersonStatus;
import com.example.weeklyplanning.repository.AccountRepository;
import com.example.weeklyplanning.repository.PersonRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class SystemBootstrapService {

    private final AccountRepository accountRepository;
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordPolicyService passwordPolicyService;
    private final BootstrapProperties bootstrapProperties;

    public SystemBootstrapService(AccountRepository accountRepository,
                                  PersonRepository personRepository,
                                  PasswordEncoder passwordEncoder,
                                  PasswordPolicyService passwordPolicyService,
                                  BootstrapProperties bootstrapProperties) {
        this.accountRepository = accountRepository;
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordPolicyService = passwordPolicyService;
        this.bootstrapProperties = bootstrapProperties;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void ensureDefaultAdminExists() {
        accountRepository.findByUsernameIgnoreCase(bootstrapProperties.getAdminUsername())
            .ifPresent(existing -> {
                if (!personRepository.existsByAccount(existing)) {
                    PersonEntity person = new PersonEntity();
                    person.setAccount(existing);
                    person.setName(bootstrapProperties.getAdminName());
                    person.setStatus(PersonStatus.ACTIVE);
                    personRepository.save(person);
                }
            });

        if (accountRepository.findByUsernameIgnoreCase(bootstrapProperties.getAdminUsername()).isPresent()) {
            return;
        }

        passwordPolicyService.validate(bootstrapProperties.getAdminPassword());

        AccountEntity account = new AccountEntity();
        account.setUsername(bootstrapProperties.getAdminUsername());
        account.setEmail(bootstrapProperties.getAdminEmail().toLowerCase());
        account.setRole(AccountRole.ADMIN);
        account.setEnabled(true);
        account.setPasswordHash(passwordEncoder.encode(bootstrapProperties.getAdminPassword()));
        accountRepository.save(account);

        PersonEntity person = new PersonEntity();
        person.setAccount(account);
        person.setName(bootstrapProperties.getAdminName());
        person.setStatus(PersonStatus.ACTIVE);
        personRepository.save(person);
    }
}
