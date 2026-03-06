package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.WeekEntity;
import com.example.weeklyplanning.domain.WeekStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface WeekRepository extends JpaRepository<WeekEntity, UUID>, JpaSpecificationExecutor<WeekEntity> {

    Optional<WeekEntity> findByWeekStartAndWeekEnd(LocalDate weekStart, LocalDate weekEnd);

    boolean existsByWeekStartAndWeekEndAndIdNot(LocalDate weekStart, LocalDate weekEnd, UUID id);

    boolean existsByCodeIgnoreCase(String code);

    long countByStatus(WeekStatus status);
}
