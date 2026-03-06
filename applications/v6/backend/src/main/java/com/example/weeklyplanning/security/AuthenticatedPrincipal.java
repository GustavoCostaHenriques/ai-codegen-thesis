package com.example.weeklyplanning.security;

import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonStatus;

import java.util.UUID;

public class AuthenticatedPrincipal {

    private final UUID accountId;
    private final UUID personId;
    private final String username;
    private final AccountRole role;
    private final PersonStatus status;
    private final String tokenJti;

    public AuthenticatedPrincipal(UUID accountId, UUID personId, String username, AccountRole role, PersonStatus status, String tokenJti) {
        this.accountId = accountId;
        this.personId = personId;
        this.username = username;
        this.role = role;
        this.status = status;
        this.tokenJti = tokenJti;
    }

    public UUID getAccountId() {
        return accountId;
    }

    public UUID getPersonId() {
        return personId;
    }

    public String getUsername() {
        return username;
    }

    public AccountRole getRole() {
        return role;
    }

    public PersonStatus getStatus() {
        return status;
    }

    public String getTokenJti() {
        return tokenJti;
    }

    public boolean isAdmin() {
        return role == AccountRole.ADMIN;
    }
}
