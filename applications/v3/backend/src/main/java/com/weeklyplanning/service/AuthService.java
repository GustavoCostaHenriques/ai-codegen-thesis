package com.weeklyplanning.service;

import com.weeklyplanning.domain.Account;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.security.JwtTokenService;
import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.UnauthorizedException;
import com.weeklyplanning.service.mapper.AccountMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public AuthService(AccountService accountService, PasswordEncoder passwordEncoder, JwtTokenService jwtTokenService) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
    }

    public ApiDtos.LoginResponse createSession(ApiDtos.LoginRequest request) {
        try{
            
        Account account = accountService.findAccountByUsernameOrEmail(request.username())
            .orElseThrow(() -> new UnauthorizedException("INVALID_CREDENTIALS", "Invalid username/email or password."));

        Person person = account.getPerson();
        if (person == null) {
            throw new UnauthorizedException("INVALID_ACCOUNT_STATE", "Account is not linked to a person.");
        }

        if (person.getStatus() != PersonStatus.ACTIVE) {
            throw new UnauthorizedException("ACCOUNT_INACTIVE", "Account is inactive.");
        }

        if (!passwordEncoder.matches(request.password(), account.getPasswordHash())) {
            throw new UnauthorizedException("INVALID_CREDENTIALS", "Invalid username/email or password.");
        }

        String token = jwtTokenService.createToken(account, person);
        return new ApiDtos.LoginResponse(
            token,
            "Bearer",
            jwtTokenService.getExpirationSeconds(),
            AccountMapper.toAuthenticatedAccount(account, person)
        );
        } catch (Exception ex) {
            ex.printStackTrace(); // 👈 IMPORTANTE
            throw ex;
        }

       
    }

    public void deleteCurrentSession() {
        // Stateless JWT logout is client-side token disposal.
    }
}
