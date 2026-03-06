package com.weeklyplanning.repository;

import com.weeklyplanning.domain.Task;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    Optional<Task> findOneByIdAndDayPersonProjectId(UUID id, UUID dayPersonProjectId);

    List<Task> findAllByDayPersonProjectIdIn(Collection<UUID> dayPersonProjectIds);
}
