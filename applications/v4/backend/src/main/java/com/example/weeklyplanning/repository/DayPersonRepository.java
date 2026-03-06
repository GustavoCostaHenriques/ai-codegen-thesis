package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.DayPersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DayPersonRepository extends JpaRepository<DayPersonEntity, UUID> {

    Optional<DayPersonEntity> findByDayPersonIdAndDayPlan_DayPlanIdAndDayPlan_Week_WeekId(
        UUID dayPersonId,
        UUID dayPlanId,
        UUID weekId
    );

    boolean existsByDayPlan_DayPlanIdAndPerson_PersonId(UUID dayPlanId, UUID personId);

    boolean existsByPerson_PersonId(UUID personId);
}
