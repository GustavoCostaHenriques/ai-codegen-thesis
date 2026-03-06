package com.weeklyplanning.repository;

import com.weeklyplanning.domain.TaskItem;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskItem, UUID> {

    Optional<TaskItem> findByIdAndDayPersonProjectId(UUID id, UUID dayPersonProjectId);
}
