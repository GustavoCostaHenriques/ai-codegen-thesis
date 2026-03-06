package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.enumeration.AccountRole;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import com.example.weeklyplanning.repository.AccountRepository;
import com.example.weeklyplanning.repository.PersonRepository;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.mapper.PersonMapper;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.security.PasswordPolicyService;
import com.example.weeklyplanning.web.rest.errors.BadRequestException;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.ForbiddenOperationException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;
import com.example.weeklyplanning.web.rest.errors.UnauthorizedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final PersonRepository personRepository;
    private final PersonMapper personMapper;
    private final PasswordEncoder passwordEncoder;
    private final PasswordPolicyService passwordPolicyService;
    private final UsernameService usernameService;
    private final AuditService auditService;

    public AccountService(
        AccountRepository accountRepository,
        PersonRepository personRepository,
        PersonMapper personMapper,
        PasswordEncoder passwordEncoder,
        PasswordPolicyService passwordPolicyService,
        UsernameService usernameService,
        AuditService auditService
    ) {
        this.accountRepository = accountRepository;
        this.personRepository = personRepository;
        this.personMapper = personMapper;
        this.passwordEncoder = passwordEncoder;
        this.passwordPolicyService = passwordPolicyService;
        this.usernameService = usernameService;
        this.auditService = auditService;
    }

    @Transactional
    public ApiSchemas.AccountRegistrationResponse register(ApiSchemas.AccountRegistrationRequest request) {
        passwordPolicyService.validate(request.password());
        String normalizedEmail = request.email().trim().toLowerCase();

        if (accountRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new ConflictException("Email already in use");
        }

        String username;
        if (request.username() != null && !request.username().isBlank()) {
            username = usernameService.normalize(request.username());
            if (usernameService.isTaken(username, null)) {
                throw new ConflictException("Username already in use");
            }
        } else {
            username = usernameService.resolveUnique(null, normalizedEmail, null);
        }

        PersonEntity person = new PersonEntity();
        person.setPersonId(UUID.randomUUID());
        person.setName(request.name());
        person.setStatus(PersonStatus.ACTIVE);

        AccountEntity account = new AccountEntity();
        account.setAccountId(UUID.randomUUID());
        account.setUsername(username);
        account.setEmail(normalizedEmail);
        account.setPasswordHash(passwordEncoder.encode(request.password()));
        account.setRole(AccountRole.VIEWER);
        account.setPerson(person);

        person.setAccount(account);

        PersonEntity saved = personRepository.save(person);
        auditService.entityEvent("ACCOUNT", "CREATE", saved.getAccount().getAccountId(), username);
        return personMapper.toAccountRegistrationResponse(saved.getAccount());
    }

    @Transactional(readOnly = true)
    public ApiSchemas.AuthenticatedAccount getCurrentAccount(AuthenticatedPrincipal principal) {
        if (principal == null) {
            throw new UnauthorizedException("Authentication required");
        }
        AccountEntity account = accountRepository.findByAccountId(principal.getAccountId())
            .orElseThrow(() -> new UnauthorizedException("Account not found"));
        return personMapper.toAuthenticatedAccount(account);
    }

    @Transactional
    public void changePassword(ApiSchemas.PasswordChangeRequest request) {
        if (!request.newPassword().equals(request.confirmNewPassword())) {
            throw new BadRequestException("New password confirmation does not match");
        }
        passwordPolicyService.validate(request.newPassword());

        AccountEntity account = findByIdentifier(request.username())
            .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!passwordEncoder.matches(request.currentPassword(), account.getPasswordHash())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        if (account.getPerson().getStatus() != PersonStatus.ACTIVE) {
            throw new ForbiddenOperationException("Account is inactive");
        }

        account.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        accountRepository.save(account);
        auditService.authenticationEvent("CHANGE_PASSWORD", account.getUsername(), true, "Password updated");
    }

    @Transactional
    public void ensureSystemAccount(
        String name,
        String email,
        String username,
        String rawPassword,
        AccountRole role,
        PersonStatus status
    ) {
        if (accountRepository.existsByEmailIgnoreCase(email)) {
            return;
        }

        passwordPolicyService.validate(rawPassword);

        PersonEntity person = new PersonEntity();
        person.setPersonId(UUID.randomUUID());
        person.setName(name);
        person.setStatus(status);

        AccountEntity account = new AccountEntity();
        account.setAccountId(UUID.randomUUID());
        account.setUsername(usernameService.resolveUnique(username, email, null));
        account.setEmail(email.toLowerCase());
        account.setPasswordHash(passwordEncoder.encode(rawPassword));
        account.setRole(role);
        account.setPerson(person);

        person.setAccount(account);
        personRepository.save(person);
        auditService.entityEvent("ACCOUNT", "SEED", account.getAccountId(), username);
    }

    @Transactional(readOnly = true)
    public AccountEntity getAccountById(UUID accountId) {
        return accountRepository.findByAccountId(accountId)
            .orElseThrow(() -> new NotFoundException("Account not found"));
    }

    @Transactional(readOnly = true)
    public AccountEntity getAccountByIdentifierOrThrow(String identifier) {
        return findByIdentifier(identifier)
            .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
    }

    private java.util.Optional<AccountEntity> findByIdentifier(String identifier) {
        java.util.Optional<AccountEntity> byUsername = accountRepository.findByUsernameIgnoreCase(identifier);
        if (byUsername.isPresent()) {
            return byUsername;
        }
        return accountRepository.findByEmailIgnoreCase(identifier);
    }
}
