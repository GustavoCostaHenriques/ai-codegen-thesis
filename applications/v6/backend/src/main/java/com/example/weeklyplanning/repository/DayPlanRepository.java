package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.DayPlanEntity;
import com.example.weeklyplanning.domain.PlanningDayOfWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DayPlanRepository extends JpaRepository<DayPlanEntity, UUID> {

    @Query("""
        select dp from DayPlanEntity dp
        where dp.week.id = :weekId
        order by dp.date
    """)
    List<DayPlanEntity> findPlanningBoardByWeekId(UUID weekId);

    @Query("""
        select dp from DayPlanEntity dp
        where dp.week.id = :weekId and dp.id = :dayPlanId
    """)
    Optional<DayPlanEntity> findPlanningBoardDayByWeekIdAndDayPlanId(UUID weekId, UUID dayPlanId);

    List<DayPlanEntity> findByWeekIdOrderByDate(UUID weekId);

    Optional<DayPlanEntity> findByIdAndWeekId(UUID id, UUID weekId);

    Optional<DayPlanEntity> findByWeekIdAndDayOfWeek(UUID weekId, PlanningDayOfWeek dayOfWeek);

    Optional<DayPlanEntity> findByWeekIdAndDate(UUID weekId, LocalDate date);
}
