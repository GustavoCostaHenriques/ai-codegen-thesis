package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.AuthSessionEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PersonStatus;
import com.example.weeklyplanning.repository.AccountRepository;
import com.example.weeklyplanning.repository.AuthSessionRepository;
import com.example.weeklyplanning.repository.PersonRepository;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.security.BruteForceProtectionService;
import com.example.weeklyplanning.security.JwtService;
import com.example.weeklyplanning.service.dto.AuthenticatedUser;
import com.example.weeklyplanning.service.dto.PasswordChangeRequest;
import com.example.weeklyplanning.service.dto.Session;
import com.example.weeklyplanning.service.dto.SessionCreateRequest;
import com.example.weeklyplanning.service.dto.SessionTokenType;
import com.example.weeklyplanning.service.mapper.ApiMapper;
import com.example.weeklyplanning.web.rest.errors.BadRequestException;
import com.example.weeklyplanning.web.rest.errors.UnauthorizedException;
import com.example.weeklyplanning.web.rest.errors.UnprocessableEntityException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class AuthenticationService {

    private final AccountRepository accountRepository;
    private final PersonRepository personRepository;
    private final AuthSessionRepository authSessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ApiMapper apiMapper;
    private final PasswordPolicyService passwordPolicyService;
    private final BruteForceProtectionService bruteForceProtectionService;
    private final AuditService auditService;

    public AuthenticationService(AccountRepository accountRepository,
                                 PersonRepository personRepository,
                                 AuthSessionRepository authSessionRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 ApiMapper apiMapper,
                                 PasswordPolicyService passwordPolicyService,
                                 BruteForceProtectionService bruteForceProtectionService,
                                 AuditService auditService) {
        this.accountRepository = accountRepository;
        this.personRepository = personRepository;
        this.authSessionRepository = authSessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.apiMapper = apiMapper;
        this.passwordPolicyService = passwordPolicyService;
        this.bruteForceProtectionService = bruteForceProtectionService;
        this.auditService = auditService;
    }

    public Session createSession(SessionCreateRequest request, HttpServletRequest servletRequest) {
        String normalizedUsername = request.username().trim();
        bruteForceProtectionService.verifyAllowed(normalizedUsername);

        AccountEntity account = accountRepository.findByUsernameIgnoreCase(normalizedUsername)
            .orElseThrow(() -> unauthorized(normalizedUsername, "Account not found"));

        PersonEntity person = personRepository.findByAccountId(account.getId())
            .orElseThrow(() -> unauthorized(normalizedUsername, "Person profile not found"));

        if (!account.isEnabled() || person.getStatus() != PersonStatus.ACTIVE) {
            throw unauthorized(normalizedUsername, "Account disabled or inactive");
        }

        if (!passwordEncoder.matches(request.password(), account.getPasswordHash())) {
            throw unauthorized(normalizedUsername, "Invalid password");
        }

        bruteForceProtectionService.recordSuccess(normalizedUsername);

        String jti = UUID.randomUUID().toString();
        String token = jwtService.generateAccessToken(account, person, jti);

        AuthSessionEntity sessionEntity = new AuthSessionEntity();
        sessionEntity.setAccount(account);
        sessionEntity.setTokenJti(jti);
        sessionEntity.setExpiresAt(Instant.now().plusSeconds(jwtService.getAccessTokenExpirationSeconds()));
        sessionEntity.setIpAddress(servletRequest.getRemoteAddr());
        sessionEntity.setUserAgent(servletRequest.getHeader("User-Agent"));
        authSessionRepository.save(sessionEntity);

        AuthenticatedUser authenticatedUser = apiMapper.toAuthenticatedUser(account, person);
        auditService.audit(account.getId(), account.getUsername(), "LOGIN", "SESSION", null, "Authentication succeeded", true);

        return new Session(token, SessionTokenType.Bearer, jwtService.getAccessTokenExpirationSeconds(), authenticatedUser);
    }

    @PreAuthorize("isAuthenticated()")
    public void deleteCurrentSession(AuthenticatedPrincipal principal) {
        authSessionRepository.findByTokenJti(principal.getTokenJti()).ifPresent(session -> {
            session.setRevokedAt(Instant.now());
            authSessionRepository.save(session);
        });
        auditService.audit(principal.getAccountId(), principal.getUsername(), "LOGOUT", "SESSION", null, "Session revoked", true);
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional(readOnly = true)
    public AuthenticatedUser getCurrentUser(AuthenticatedPrincipal principal) {
        AccountEntity account = accountRepository.findById(principal.getAccountId())
            .orElseThrow(() -> new UnauthorizedException("Invalid account context."));

        PersonEntity person = personRepository.findByAccountId(account.getId())
            .orElseThrow(() -> new UnauthorizedException("Invalid person context."));

        return apiMapper.toAuthenticatedUser(account, person);
    }

    @PreAuthorize("isAuthenticated()")
    public void changePassword(AuthenticatedPrincipal principal, PasswordChangeRequest request) {
        if (!principal.getUsername().equalsIgnoreCase(request.username())) {
            throw new BadRequestException("Username must match the authenticated user.");
        }
        if (!request.newPassword().equals(request.confirmNewPassword())) {
            throw new UnprocessableEntityException("New password confirmation does not match.");
        }

        AccountEntity account = accountRepository.findById(principal.getAccountId())
            .orElseThrow(() -> new UnauthorizedException("Account not found."));

        if (!passwordEncoder.matches(request.currentPassword(), account.getPasswordHash())) {
            throw new BadRequestException("Current password is invalid.");
        }

        passwordPolicyService.validate(request.newPassword());
        account.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        accountRepository.save(account);

        List<AuthSessionEntity> sessions = authSessionRepository.findByAccountIdAndRevokedAtIsNull(account.getId());
        Instant now = Instant.now();
        sessions.forEach(s -> s.setRevokedAt(now));
        authSessionRepository.saveAll(sessions);

        auditService.audit(account.getId(), account.getUsername(), "PASSWORD_CHANGE", "ACCOUNT", account.getId(), "Password changed", true);
    }

    private UnauthorizedException unauthorized(String username, String detail) {
        bruteForceProtectionService.recordFailure(username);
        auditService.audit(null, username, "LOGIN", "SESSION", null, detail, false);
        return new UnauthorizedException("Invalid username or password.");
    }
}
