package com.weeklyplanning.service;

import com.weeklyplanning.domain.Account;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.enumeration.AccountRole;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.repository.AccountRepository;
import com.weeklyplanning.repository.PersonRepository;
import com.weeklyplanning.security.CurrentUser;
import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.BadRequestException;
import com.weeklyplanning.service.exception.ConflictException;
import com.weeklyplanning.service.exception.ForbiddenException;
import com.weeklyplanning.service.exception.NotFoundException;
import com.weeklyplanning.service.mapper.AccountMapper;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsernameResolver usernameResolver;
    private final CurrentUser currentUser;

    public AccountService(AccountRepository accountRepository,
                          PersonRepository personRepository,
                          PasswordEncoder passwordEncoder,
                          UsernameResolver usernameResolver,
                          CurrentUser currentUser) {
        this.accountRepository = accountRepository;
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        this.usernameResolver = usernameResolver;
        this.currentUser = currentUser;
    }

    public ApiDtos.AccountRegistrationResponse registerAccount(ApiDtos.AccountRegistrationRequest request) {
        if (accountRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ConflictException("EMAIL_ALREADY_EXISTS", "Email is already in use.");
        }

        String username;
        if (request.username() != null && !request.username().isBlank()) {
            if (accountRepository.existsByUsernameIgnoreCase(request.username().trim())) {
                throw new ConflictException("USERNAME_ALREADY_EXISTS", "Username is already in use.");
            }
            username = request.username().trim().toLowerCase();
        } else {
            username = usernameResolver.resolveForCreate(null, request.email());
        }

        Account account = Account.builder()
            .username(username)
            .email(request.email().trim().toLowerCase())
            .passwordHash(passwordEncoder.encode(request.password()))
            .role(AccountRole.VIEWER)
            .build();

        Account savedAccount = accountRepository.save(account);

        Person person = Person.builder()
            .account(savedAccount)
            .name(request.name().trim())
            .email(savedAccount.getEmail())
            .status(PersonStatus.ACTIVE)
            .build();

        Person savedPerson = personRepository.save(person);
        return AccountMapper.toRegistrationResponse(savedAccount, savedPerson);
    }

    public ApiDtos.AuthenticatedAccount getCurrentAccount() {
        var principal = currentUser.require();
        Account account = accountRepository.findById(principal.accountId())
            .orElseThrow(() -> new NotFoundException("ACCOUNT_NOT_FOUND", "Account not found."));

        Person person = personRepository.findByAccountId(account.getId())
            .orElseThrow(() -> new NotFoundException("PERSON_NOT_FOUND", "Person not found."));

        return AccountMapper.toAuthenticatedAccount(account, person);
    }

    public void changePassword(ApiDtos.PasswordChangeRequest request) {
        System.out.println("USERNAME: " + request.username());
        System.out.println("CURRENT PASSWORD: " + request.currentPassword());

        if (!request.newPassword().equals(request.confirmNewPassword())) {
            throw new BadRequestException("PASSWORD_CONFIRMATION_MISMATCH", "New password confirmation does not match.");
        }

        Account account = findAccountByUsernameOrEmail(request.username())
            .orElseThrow(() -> new ForbiddenException("FORBIDDEN", "Invalid username or unauthorized operation."));

        /* var principal = currentUser.require();
        if (!currentUser.isAdmin() && !principal.accountId().equals(account.getId())) {
            throw new ForbiddenException("FORBIDDEN", "You can only change your own password.");
        } */

        if (!passwordEncoder.matches(request.currentPassword(), account.getPasswordHash())) {
            throw new ForbiddenException("INVALID_CURRENT_PASSWORD", "Current password is invalid.");
        }

        account.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        accountRepository.save(account);
    }

    Optional<Account> findAccountByUsernameOrEmail(String identifier) {
        return accountRepository.findByUsernameIgnoreCase(identifier)
            .or(() -> accountRepository.findByEmailIgnoreCase(identifier));
    }
}
