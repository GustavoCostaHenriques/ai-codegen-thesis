package com.weeklyplanning.service.dto;

import com.weeklyplanning.domain.enumeration.AccountRole;
import java.io.Serializable;
import java.util.UUID;

public class AccountDTO implements Serializable {

    private UUID id;
    private String username;
    private AccountRole role;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public AccountRole getRole() {
        return role;
    }

    public void setRole(AccountRole role) {
        this.role = role;
    }
}
