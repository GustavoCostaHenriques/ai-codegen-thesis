package com.weeklyplanning.repository;

import com.weeklyplanning.domain.DayPersonProject;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayPersonProjectRepository extends JpaRepository<DayPersonProject, UUID> {

    boolean existsByDayPersonIdAndProjectId(UUID dayPersonId, UUID projectId);

    boolean existsByProjectId(UUID projectId);
}
