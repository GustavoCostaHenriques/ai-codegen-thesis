package com.weeklyplanning.repository;

import com.weeklyplanning.domain.DayPersonProject;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DayPersonProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayPersonProjectRepository extends JpaRepository<DayPersonProject, UUID> {
    @EntityGraph(attributePaths = { "project", "dayPerson", "dayPerson.dayPlan", "tasks" })
    Optional<DayPersonProject> findOneByDayPersonIdAndProjectId(UUID dayPersonId, UUID projectId);

    boolean existsByDayPersonIdAndProjectId(UUID dayPersonId, UUID projectId);

    List<DayPersonProject> findAllByDayPersonIdIn(Collection<UUID> dayPersonIds);

    List<DayPersonProject> findAllByProjectId(UUID projectId);

    boolean existsByProjectId(UUID projectId);
}
