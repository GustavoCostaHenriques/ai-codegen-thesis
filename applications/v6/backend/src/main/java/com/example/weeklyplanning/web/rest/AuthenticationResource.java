package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.security.CurrentUserProvider;
import com.example.weeklyplanning.service.AuthenticationService;
import com.example.weeklyplanning.service.dto.PasswordChangeRequest;
import com.example.weeklyplanning.service.dto.Session;
import com.example.weeklyplanning.service.dto.SessionCreateRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class AuthenticationResource {

    private final AuthenticationService authenticationService;
    private final CurrentUserProvider currentUserProvider;

    public AuthenticationResource(AuthenticationService authenticationService, CurrentUserProvider currentUserProvider) {
        this.authenticationService = authenticationService;
        this.currentUserProvider = currentUserProvider;
    }

    @PostMapping("/sessions")
    public ResponseEntity<Session> createSession(@Valid @RequestBody SessionCreateRequest request,
                                                 HttpServletRequest servletRequest) {
        Session session = authenticationService.createSession(request, servletRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(session);
    }

    @DeleteMapping("/sessions/current")
    public ResponseEntity<Void> deleteCurrentSession() {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        authenticationService.deleteCurrentSession(principal);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/password-changes")
    public ResponseEntity<Void> createPasswordChange(@Valid @RequestBody PasswordChangeRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        authenticationService.changePassword(principal, request);
        return ResponseEntity.noContent().build();
    }
}
