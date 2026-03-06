package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.Account;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.service.dto.ApiDtos;

public final class AccountMapper {

    private AccountMapper() {
    }

    public static ApiDtos.AuthenticatedAccount toAuthenticatedAccount(Account account, Person person) {
        return new ApiDtos.AuthenticatedAccount(
            account.getId(),
            person.getId(),
            account.getUsername(),
            person.getName(),
            person.getEmail(),
            account.getRole(),
            person.getStatus()
        );
    }

    public static ApiDtos.AccountRegistrationResponse toRegistrationResponse(Account account, Person person) {
        return new ApiDtos.AccountRegistrationResponse(
            account.getId(),
            person.getId(),
            account.getUsername(),
            person.getName(),
            person.getEmail(),
            account.getRole(),
            person.getStatus(),
            account.getCreatedAt()
        );
    }
}
