package com.example.weeklyplanning.service.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserService {

    public AuthenticatedPrincipal getCurrentUserOrNull() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof AuthenticatedPrincipal authenticatedPrincipal) {
            return authenticatedPrincipal;
        }
        return null;
    }

    public String getCurrentUsername() {
        AuthenticatedPrincipal principal = getCurrentUserOrNull();
        return principal == null ? "anonymous" : principal.getUsername();
    }
}
