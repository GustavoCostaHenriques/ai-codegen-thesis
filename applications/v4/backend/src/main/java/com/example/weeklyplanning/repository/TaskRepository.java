package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {

    Optional<TaskEntity> findByTaskIdAndDayPersonProject_DayPersonProjectIdAndDayPersonProject_DayPerson_DayPersonIdAndDayPersonProject_DayPerson_DayPlan_DayPlanIdAndDayPersonProject_DayPerson_DayPlan_Week_WeekId(
        UUID taskId,
        UUID dayPersonProjectId,
        UUID dayPersonId,
        UUID dayPlanId,
        UUID weekId
    );
}
