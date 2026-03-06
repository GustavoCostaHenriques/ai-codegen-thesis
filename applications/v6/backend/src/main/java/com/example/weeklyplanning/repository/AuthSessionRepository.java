package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.AuthSessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AuthSessionRepository extends JpaRepository<AuthSessionEntity, UUID> {

    Optional<AuthSessionEntity> findByTokenJti(String tokenJti);

    List<AuthSessionEntity> findByAccountIdAndRevokedAtIsNull(UUID accountId);

    void deleteByExpiresAtBefore(Instant threshold);
}
