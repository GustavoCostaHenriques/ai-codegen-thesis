package com.mycompany.weeklyplanning.repository;

import com.mycompany.weeklyplanning.domain.DayUserProjectEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DayUserProjectEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayUserProjectRepository
    extends JpaRepository<DayUserProjectEntity, Long>, JpaSpecificationExecutor<DayUserProjectEntity> {
    boolean existsByDayUserIdAndProjectId(Long dayUserId, Long projectId);

    Optional<DayUserProjectEntity> findOneByDayUserIdAndProjectId(Long dayUserId, Long projectId);

    List<DayUserProjectEntity> findAllByDayUserIdOrderByIdAsc(Long dayUserId);

    long countByDayUserId(Long dayUserId);

    boolean existsByProjectId(Long projectId);
}
