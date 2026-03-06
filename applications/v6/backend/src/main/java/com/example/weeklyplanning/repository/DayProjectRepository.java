package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.DayProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface DayProjectRepository extends JpaRepository<DayProjectEntity, UUID> {

    Optional<DayProjectEntity> findByDayPlanIdAndProjectId(UUID dayPlanId, UUID projectId);

    Optional<DayProjectEntity> findByIdAndDayPlanId(UUID id, UUID dayPlanId);

    @Modifying
    @Query("delete from DayProjectEntity dp where dp.project.id = :projectId")
    int deleteAllByProjectId(@Param("projectId") UUID projectId);
}
