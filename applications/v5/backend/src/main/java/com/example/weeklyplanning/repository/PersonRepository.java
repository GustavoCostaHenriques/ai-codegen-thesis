package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PersonStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface PersonRepository extends JpaRepository<PersonEntity, UUID>, JpaSpecificationExecutor<PersonEntity> {

    Optional<PersonEntity> findByAccountId(UUID accountId);

    boolean existsByAccount(AccountEntity account);

    long countByStatus(PersonStatus status);
}
