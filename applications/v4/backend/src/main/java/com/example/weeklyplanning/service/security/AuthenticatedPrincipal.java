package com.example.weeklyplanning.service.security;

import com.example.weeklyplanning.domain.enumeration.AccountRole;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class AuthenticatedPrincipal implements UserDetails {

    private final UUID accountId;
    private final UUID personId;
    private final String username;
    private final String passwordHash;
    private final AccountRole role;
    private final PersonStatus status;

    public AuthenticatedPrincipal(
        UUID accountId,
        UUID personId,
        String username,
        String passwordHash,
        AccountRole role,
        PersonStatus status
    ) {
        this.accountId = accountId;
        this.personId = personId;
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
        this.status = status;
    }

    public UUID getAccountId() {
        return accountId;
    }

    public UUID getPersonId() {
        return personId;
    }

    public AccountRole getRole() {
        return role;
    }

    public PersonStatus getStatus() {
        return status;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return status == PersonStatus.ACTIVE;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status == PersonStatus.ACTIVE;
    }
}
