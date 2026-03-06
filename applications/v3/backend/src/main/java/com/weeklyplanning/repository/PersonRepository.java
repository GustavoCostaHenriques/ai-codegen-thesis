package com.weeklyplanning.repository;

import com.weeklyplanning.domain.Person;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PersonRepository extends JpaRepository<Person, UUID>, JpaSpecificationExecutor<Person> {

    Optional<Person> findByAccountId(UUID accountId);

    Optional<Person> findByAccountUsernameIgnoreCase(String username);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);

    boolean existsByEmailIgnoreCase(String email);
}
