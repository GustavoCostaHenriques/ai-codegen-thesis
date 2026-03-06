package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.DayPersonProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DayPersonProjectRepository extends JpaRepository<DayPersonProjectEntity, UUID> {

    Optional<DayPersonProjectEntity> findByDayPersonProjectIdAndDayPerson_DayPersonIdAndDayPerson_DayPlan_DayPlanIdAndDayPerson_DayPlan_Week_WeekId(
        UUID dayPersonProjectId,
        UUID dayPersonId,
        UUID dayPlanId,
        UUID weekId
    );

    boolean existsByDayPerson_DayPersonIdAndProject_ProjectId(UUID dayPersonId, UUID projectId);

    boolean existsByProject_ProjectId(UUID projectId);
}
