package com.weeklyplanning.repository;

import com.weeklyplanning.domain.Account;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, UUID> {

    @EntityGraph(attributePaths = "person")
    Optional<Account> findByUsernameIgnoreCase(String username);

    @EntityGraph(attributePaths = "person")
    Optional<Account> findByEmailIgnoreCase(String email);

    boolean existsByUsernameIgnoreCase(String username);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);

    boolean existsByUsernameIgnoreCaseAndIdNot(String username, UUID id);
}
