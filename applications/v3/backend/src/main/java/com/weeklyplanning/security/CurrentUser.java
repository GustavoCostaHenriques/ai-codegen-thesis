package com.weeklyplanning.security;

import com.weeklyplanning.service.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUser {

    public ApiUserPrincipal require() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof ApiUserPrincipal principal)) {
            throw new UnauthorizedException("UNAUTHORIZED", "Authentication is required.");
        }
        return principal;
    }

    public boolean isAdmin() {
        return require().role().endsWith("ADMIN");
    }
}
