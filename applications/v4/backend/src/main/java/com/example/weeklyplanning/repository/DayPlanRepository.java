package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.DayPlanEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DayPlanRepository extends JpaRepository<DayPlanEntity, UUID> {
    /* 
    SELECT *
    FROM day_plan dp
    JOIN week w ON dp.week_id = w.week_id
    WHERE dp.day_plan_id = :dayPlanId
    AND w.week_id = :weekId; */
    Optional<DayPlanEntity> findByDayPlanIdAndWeek_WeekId(UUID dayPlanId, UUID weekId);

    List<DayPlanEntity> findByWeek_WeekIdOrderByDateAsc(UUID weekId);
}
