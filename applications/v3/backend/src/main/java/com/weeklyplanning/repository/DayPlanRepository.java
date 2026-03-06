package com.weeklyplanning.repository;

import com.weeklyplanning.domain.DayPlan;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayPlanRepository extends JpaRepository<DayPlan, UUID> {

    List<DayPlan> findByWeekIdOrderByDateAsc(UUID weekId);

    Optional<DayPlan> findByIdAndWeekId(UUID dayPlanId, UUID weekId);
}
