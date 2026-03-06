package com.weeklyplanning.service.dto;

import com.weeklyplanning.domain.enumeration.AccountRole;
import java.io.Serializable;

public class AccountCreateDTO implements Serializable {

    private String username;
    private String password;
    private AccountRole role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AccountRole getRole() {
        return role;
    }

    public void setRole(AccountRole role) {
        this.role = role;
    }
}
