package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.mapper.PersonMapper;
import com.example.weeklyplanning.service.security.AccountSecurityService;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.security.JwtTokenService;
import com.example.weeklyplanning.service.security.LoginAttemptService;
import com.example.weeklyplanning.service.security.TokenBlacklistService;
import com.example.weeklyplanning.web.rest.errors.UnauthorizedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Locale;

@Service
public class AuthService {

    private final AccountService accountService;
    private final AccountSecurityService accountSecurityService;
    private final JwtTokenService jwtTokenService;
    private final TokenBlacklistService tokenBlacklistService;
    private final LoginAttemptService loginAttemptService;
    private final PasswordEncoder passwordEncoder;
    private final PersonMapper personMapper;
    private final AuditService auditService;

    public AuthService(
        AccountService accountService,
        AccountSecurityService accountSecurityService,
        JwtTokenService jwtTokenService,
        TokenBlacklistService tokenBlacklistService,
        LoginAttemptService loginAttemptService,
        PasswordEncoder passwordEncoder,
        PersonMapper personMapper,
        AuditService auditService
    ) {
        this.accountService = accountService;
        this.accountSecurityService = accountSecurityService;
        this.jwtTokenService = jwtTokenService;
        this.tokenBlacklistService = tokenBlacklistService;
        this.loginAttemptService = loginAttemptService;
        this.passwordEncoder = passwordEncoder;
        this.personMapper = personMapper;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public ApiSchemas.LoginResponse createSession(ApiSchemas.LoginRequest request, String clientIp) {
        String key = loginAttemptKey(request.username(), clientIp);
        if (loginAttemptService.isBlocked(key)) {
            auditService.authenticationEvent("LOGIN", request.username(), false, "Blocked by brute force policy");
            throw new UnauthorizedException("Invalid credentials");
        }

        AccountEntity account;
        try {
            account = accountService.getAccountByIdentifierOrThrow(request.username());
        } catch (UnauthorizedException ex) {
            loginAttemptService.recordFailure(key);
            auditService.authenticationEvent("LOGIN", request.username(), false, "Unknown user");
            throw ex;
        }

        if (!passwordEncoder.matches(request.password(), account.getPasswordHash())) {
            loginAttemptService.recordFailure(key);
            auditService.authenticationEvent("LOGIN", request.username(), false, "Invalid password");
            throw new UnauthorizedException("Invalid credentials");
        }

        if (account.getPerson().getStatus() != PersonStatus.ACTIVE) {
            loginAttemptService.recordFailure(key);
            auditService.authenticationEvent("LOGIN", request.username(), false, "Inactive account");
            throw new UnauthorizedException("Invalid credentials");
        }

        loginAttemptService.clearFailures(key);
        AuthenticatedPrincipal principal = accountSecurityService.toPrincipal(account);
        String token = jwtTokenService.generateToken(principal);
        auditService.authenticationEvent("LOGIN", principal.getUsername(), true, "Authenticated");

        return new ApiSchemas.LoginResponse(
            token,
            "Bearer",
            jwtTokenService.getExpiresInSeconds(),
            personMapper.toAuthenticatedAccount(account)
        );
    }

    public void deleteCurrentSession(String authorizationHeader, String usernameForAudit) {
        String token = extractToken(authorizationHeader);
        Instant expiresAt = jwtTokenService.extractExpiration(token);
        tokenBlacklistService.blacklist(token, expiresAt);
        auditService.authenticationEvent("LOGOUT", usernameForAudit, true, "Session invalidated");
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Bearer token is required");
        }
        return authorizationHeader.substring(7);
    }

    private String loginAttemptKey(String username, String clientIp) {
        return username.trim().toLowerCase(Locale.ROOT) + "|" + clientIp;
    }
}
