package com.example.weeklyplanning.config;

import com.example.weeklyplanning.domain.enumeration.AccountRole;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import com.example.weeklyplanning.service.AccountService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final AccountService accountService;

    public DataInitializer(AccountService accountService) {
        this.accountService = accountService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initialize() {
        accountService.ensureSystemAccount(
            "System Admin",
            "admin@weekly.local",
            "admin",
            "admin12345",
            AccountRole.ADMIN,
            PersonStatus.ACTIVE
        );

        accountService.ensureSystemAccount(
            "Default Viewer",
            "viewer@example.com",
            "viewer",
            "viewer12345",
            AccountRole.VIEWER,
            PersonStatus.ACTIVE
        );
    }
}
