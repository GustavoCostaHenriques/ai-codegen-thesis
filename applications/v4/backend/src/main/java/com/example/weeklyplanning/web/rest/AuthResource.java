package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.service.AuthService;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AuthResource {

    private final AuthService authService;

    public AuthResource(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/sessions")
    public ResponseEntity<ApiSchemas.LoginResponse> createAuthSession(
        @Valid @RequestBody ApiSchemas.LoginRequest request,
        HttpServletRequest servletRequest
    ) {
        String clientIp = servletRequest.getHeader("X-Forwarded-For");
        if (clientIp == null || clientIp.isBlank()) {
            clientIp = servletRequest.getRemoteAddr();
        }

        ApiSchemas.LoginResponse response = authService.createSession(request, clientIp);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/auth/sessions/current")
    public ResponseEntity<Void> deleteCurrentAuthSession(
        @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String username = principal == null ? "anonymous" : principal.getUsername();
        authService.deleteCurrentSession(authorizationHeader, username);
        return ResponseEntity.noContent().build();
    }
}
