package com.weeklyplanning.controller;

import com.weeklyplanning.service.AuthService;
import com.weeklyplanning.service.dto.ApiDtos;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/sessions")
    public ApiDtos.LoginResponse createAuthSession(@Valid @RequestBody ApiDtos.LoginRequest request) {
        return authService.createSession(request);
    }

    @DeleteMapping("/sessions/current")
    public ResponseEntity<Void> deleteCurrentAuthSession() {
        authService.deleteCurrentSession();
        return ResponseEntity.noContent().build();
    }
}
