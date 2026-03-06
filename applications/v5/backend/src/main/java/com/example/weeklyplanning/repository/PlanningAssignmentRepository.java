package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.PlanningAssignmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface PlanningAssignmentRepository extends JpaRepository<PlanningAssignmentEntity, UUID> {

    Optional<PlanningAssignmentEntity> findByIdAndDayProjectId(UUID id, UUID dayProjectId);

    Optional<PlanningAssignmentEntity> findByDayProjectIdAndPersonId(UUID dayProjectId, UUID personId);

    @Query("""
        select a from PlanningAssignmentEntity a
        join a.dayProject dp
        join dp.dayPlan dpl
        where a.id = :assignmentId
          and dp.project.id = :projectId
          and dpl.id = :dayPlanId
          and dpl.week.id = :weekId
        """)
    Optional<PlanningAssignmentEntity> findByHierarchy(UUID weekId, UUID dayPlanId, UUID projectId, UUID assignmentId);

    @Modifying
    @Query("delete from PlanningAssignmentEntity a where a.person.id = :personId")
    int deleteAllByPersonId(@Param("personId") UUID personId);

    @Modifying
    @Query("delete from PlanningAssignmentEntity a where a.dayProject.project.id = :projectId")
    int deleteAllByProjectId(UUID projectId);
}
