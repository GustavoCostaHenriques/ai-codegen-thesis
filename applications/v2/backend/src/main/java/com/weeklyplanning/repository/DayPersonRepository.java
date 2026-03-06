package com.weeklyplanning.repository;

import com.weeklyplanning.domain.DayPerson;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DayPerson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayPersonRepository extends JpaRepository<DayPerson, UUID> {
    @EntityGraph(attributePaths = { "person", "dayPlan", "projects", "projects.project", "projects.tasks" })
    Optional<DayPerson> findOneByDayPlanIdAndPersonId(UUID dayPlanId, UUID personId);

    boolean existsByDayPlanIdAndPersonId(UUID dayPlanId, UUID personId);

    List<DayPerson> findAllByDayPlanIdIn(Collection<UUID> dayPlanIds);

    List<DayPerson> findAllByPersonId(UUID personId);

    boolean existsByPersonId(UUID personId);
}
