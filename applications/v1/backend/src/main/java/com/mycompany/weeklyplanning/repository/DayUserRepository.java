package com.mycompany.weeklyplanning.repository;

import com.mycompany.weeklyplanning.domain.DayUserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DayUserEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayUserRepository extends JpaRepository<DayUserEntity, Long>, JpaSpecificationExecutor<DayUserEntity> {
    boolean existsByDayPlanIdAndUserId(Long dayPlanId, Long userId);

    Optional<DayUserEntity> findOneByDayPlanIdAndUserId(Long dayPlanId, Long userId);

    List<DayUserEntity> findAllByDayPlanIdOrderByIdAsc(Long dayPlanId);

    long countByDayPlanId(Long dayPlanId);

    boolean existsByUserId(Long userId);
}
