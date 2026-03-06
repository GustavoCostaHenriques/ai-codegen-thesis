package com.weeklyplanning.repository;

import com.weeklyplanning.domain.Account;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {
    Optional<Account> findOneByUsernameIgnoreCase(String username);

    boolean existsByUsernameIgnoreCase(String username);
}
