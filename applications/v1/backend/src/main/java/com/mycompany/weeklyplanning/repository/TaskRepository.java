package com.mycompany.weeklyplanning.repository;

import com.mycompany.weeklyplanning.domain.TaskEntity;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TaskEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long>, JpaSpecificationExecutor<TaskEntity> {
    List<TaskEntity> findAllByDayUserProjectIdOrderByIdAsc(Long dayUserProjectId);

    long countByDayUserProjectId(Long dayUserProjectId);
}
