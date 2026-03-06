package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.domain.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<ProjectEntity, UUID>, JpaSpecificationExecutor<ProjectEntity> {

    boolean existsByCodeIgnoreCase(String code);

    boolean existsByCodeIgnoreCaseAndIdNot(String code, UUID id);

    List<ProjectEntity> findByStatus(ProjectStatus status);

    long countByStatus(ProjectStatus status);
}
