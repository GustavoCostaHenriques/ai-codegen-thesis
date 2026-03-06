package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {

    Optional<TaskEntity> findByIdAndAssignmentId(UUID id, UUID assignmentId);
}
