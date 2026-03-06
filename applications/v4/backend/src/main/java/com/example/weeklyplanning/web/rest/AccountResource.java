package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.service.AccountService;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/v1")
public class AccountResource {

    private final AccountService accountService;

    public AccountResource(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/accounts")
    public ResponseEntity<ApiSchemas.AccountRegistrationResponse> registerAccount(
        @Valid @RequestBody ApiSchemas.AccountRegistrationRequest request
    ) {
        ApiSchemas.AccountRegistrationResponse response = accountService.register(request);
        URI location = URI.create("/api/v1/persons/" + response.personId());
        return ResponseEntity.created(location).body(response);
    }

    @GetMapping("/accounts/me")
    public ResponseEntity<ApiSchemas.AuthenticatedAccount> getCurrentAccount(
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        return ResponseEntity.ok(accountService.getCurrentAccount(principal));
    }

    @PostMapping("/password-changes")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ApiSchemas.PasswordChangeRequest request) {
        accountService.changePassword(request);
        return ResponseEntity.noContent().build();
    }
}
