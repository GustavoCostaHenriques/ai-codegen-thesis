package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.Account;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.service.dto.ApiDtos;

public final class PersonMapper {

    private PersonMapper() {
    }

    public static ApiDtos.PersonSummary toSummary(Person person) {
        Account account = person.getAccount();
        return new ApiDtos.PersonSummary(
            person.getId(),
            account.getId(),
            account.getUsername(),
            person.getName(),
            person.getEmail(),
            account.getRole(),
            person.getStatus()
        );
    }

    public static ApiDtos.PersonDetail toDetail(Person person) {
        Account account = person.getAccount();
        return new ApiDtos.PersonDetail(
            person.getId(),
            account.getId(),
            account.getUsername(),
            person.getName(),
            person.getEmail(),
            account.getRole(),
            person.getStatus(),
            person.getCreatedAt(),
            person.getUpdatedAt()
        );
    }

    public static ApiDtos.PersonReference toReference(Person person) {
        return new ApiDtos.PersonReference(
            person.getId(),
            person.getName(),
            person.getEmail(),
            person.getStatus()
        );
    }
}
