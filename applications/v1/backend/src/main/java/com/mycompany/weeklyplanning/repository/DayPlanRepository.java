package com.mycompany.weeklyplanning.repository;

import com.mycompany.weeklyplanning.domain.DayPlanEntity;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DayPlanEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayPlanRepository extends JpaRepository<DayPlanEntity, Long>, JpaSpecificationExecutor<DayPlanEntity> {
    Optional<DayPlanEntity> findOneByWeekIdAndDate(Long weekId, LocalDate date);

    List<DayPlanEntity> findAllByWeekIdOrderByDateAsc(Long weekId);

    boolean existsByWeekIdAndDate(Long weekId, LocalDate date);
}
