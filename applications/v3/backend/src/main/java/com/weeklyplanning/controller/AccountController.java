package com.weeklyplanning.controller;

import com.weeklyplanning.service.AccountService;
import com.weeklyplanning.service.dto.ApiDtos;
import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/accounts")
    public ResponseEntity<ApiDtos.AccountRegistrationResponse> registerAccount(
        @Valid @RequestBody ApiDtos.AccountRegistrationRequest request
    ) {
        ApiDtos.AccountRegistrationResponse response = accountService.registerAccount(request);
        return ResponseEntity.created(URI.create("/api/v1/persons/" + response.personId())).body(response);
    }

    @GetMapping("/accounts/me")
    public ApiDtos.AuthenticatedAccount getCurrentAccount() {
        return accountService.getCurrentAccount();
    }

    @PostMapping("/password-changes")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ApiDtos.PasswordChangeRequest request) {
        System.out.println("Received password change request for username: " + request.username());
        System.out.println("Current password: " + request.currentPassword());
        System.out.println("New password: " + request.newPassword());
        System.out.println("Confirm new password: " + request.confirmNewPassword());
        accountService.changePassword(request);
        return ResponseEntity.noContent().build();
    }
}
