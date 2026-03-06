package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.security.CurrentUserProvider;
import com.example.weeklyplanning.service.AuthenticationService;
import com.example.weeklyplanning.service.dto.AuthenticatedUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ProfileResource {

    private final AuthenticationService authenticationService;
    private final CurrentUserProvider currentUserProvider;

    public ProfileResource(AuthenticationService authenticationService, CurrentUserProvider currentUserProvider) {
        this.authenticationService = authenticationService;
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping("/me")
    public ResponseEntity<AuthenticatedUser> getCurrentUser() {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(authenticationService.getCurrentUser(principal));
    }
}
