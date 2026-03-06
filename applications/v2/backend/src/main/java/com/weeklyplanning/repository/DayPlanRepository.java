package com.weeklyplanning.repository;

import com.weeklyplanning.domain.DayPlan;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DayPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayPlanRepository extends JpaRepository<DayPlan, UUID> {
    Optional<DayPlan> findOneByWeekIdAndDate(UUID weekId, LocalDate date);

    @EntityGraph(attributePaths = { "people", "people.person", "people.projects", "people.projects.project", "people.projects.tasks" })
    List<DayPlan> findAllByWeekIdAndDateBetweenOrderByDateAsc(UUID weekId, LocalDate from, LocalDate to);

    List<DayPlan> findAllByWeekId(UUID weekId);
}
