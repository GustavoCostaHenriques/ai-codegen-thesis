package com.example.weeklyplanning.service.mapper;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import org.springframework.stereotype.Component;

@Component
public class PersonMapper {

    public ApiSchemas.AuthenticatedAccount toAuthenticatedAccount(AccountEntity account) {
        return new ApiSchemas.AuthenticatedAccount(
            account.getAccountId(),
            account.getPerson().getPersonId(),
            account.getUsername(),
            account.getPerson().getName(),
            account.getEmail(),
            account.getRole(),
            account.getPerson().getStatus()
        );
    }

    public ApiSchemas.AccountRegistrationResponse toAccountRegistrationResponse(AccountEntity account) {
        return new ApiSchemas.AccountRegistrationResponse(
            account.getAccountId(),
            account.getPerson().getPersonId(),
            account.getUsername(),
            account.getPerson().getName(),
            account.getEmail(),
            account.getRole(),
            account.getPerson().getStatus(),
            account.getCreatedAt()
        );
    }

    public ApiSchemas.PersonSummary toSummary(PersonEntity person) {
        return new ApiSchemas.PersonSummary(
            person.getPersonId(),
            person.getAccount().getAccountId(),
            person.getAccount().getUsername(),
            person.getName(),
            person.getAccount().getEmail(),
            person.getAccount().getRole(),
            person.getStatus()
        );
    }

    public ApiSchemas.PersonDetail toDetail(PersonEntity person) {
        return new ApiSchemas.PersonDetail(
            person.getPersonId(),
            person.getAccount().getAccountId(),
            person.getAccount().getUsername(),
            person.getName(),
            person.getAccount().getEmail(),
            person.getAccount().getRole(),
            person.getStatus(),
            person.getCreatedAt(),
            person.getUpdatedAt()
        );
    }

    public ApiSchemas.PersonReference toReference(PersonEntity person) {
        return new ApiSchemas.PersonReference(
            person.getPersonId(),
            person.getName(),
            person.getAccount().getEmail(),
            person.getStatus()
        );
    }
}
