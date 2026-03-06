package com.weeklyplanning.config;

import com.weeklyplanning.domain.Account;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.enumeration.AccountRole;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.repository.AccountRepository;
import com.weeklyplanning.repository.PersonRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DefaultAdminBootstrap implements ApplicationRunner {

    private final AccountRepository accountRepository;
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminBootstrapProperties properties;

    public DefaultAdminBootstrap(AccountRepository accountRepository,
                                 PersonRepository personRepository,
                                 PasswordEncoder passwordEncoder,
                                 AdminBootstrapProperties properties) {
        this.accountRepository = accountRepository;
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (accountRepository.count() > 0) {
            return;
        }

        Account account = Account.builder()
            .username(properties.getUsername().trim().toLowerCase())
            .email(properties.getEmail().trim().toLowerCase())
            .passwordHash(passwordEncoder.encode(properties.getPassword()))
            .role(AccountRole.ADMIN)
            .build();

        Account savedAccount = accountRepository.save(account);

        Person person = Person.builder()
            .account(savedAccount)
            .name(properties.getName().trim())
            .email(savedAccount.getEmail())
            .status(PersonStatus.ACTIVE)
            .build();

        personRepository.save(person);
    }
}
