package com.weeklyplanning.repository;

import com.weeklyplanning.domain.DayPerson;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayPersonRepository extends JpaRepository<DayPerson, UUID> {

    boolean existsByDayPlanIdAndPersonId(UUID dayPlanId, UUID personId);

    boolean existsByPersonId(UUID personId);
}
