package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.PersonEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface PersonRepository extends JpaRepository<PersonEntity, UUID>, JpaSpecificationExecutor<PersonEntity> {

    @EntityGraph(attributePaths = {"account"})
    Optional<PersonEntity> findByPersonId(UUID personId);

    boolean existsByAccount_EmailIgnoreCase(String email);

    boolean existsByAccount_UsernameIgnoreCase(String username);
}
