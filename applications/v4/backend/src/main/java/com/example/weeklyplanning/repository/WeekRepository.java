package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.WeekEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface WeekRepository extends JpaRepository<WeekEntity, UUID>, JpaSpecificationExecutor<WeekEntity> {

    boolean existsByWeekStartAndWeekEnd(LocalDate weekStart, LocalDate weekEnd);

    
    Optional<WeekEntity> findByWeekId(UUID weekId);
}
