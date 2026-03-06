package com.weeklyplanning.security;

import java.util.Collection;
import java.util.UUID;
import org.springframework.security.core.GrantedAuthority;

public record ApiUserPrincipal(
    UUID accountId,
    UUID personId,
    String username,
    String role,
    Collection<? extends GrantedAuthority> authorities
) {
}
