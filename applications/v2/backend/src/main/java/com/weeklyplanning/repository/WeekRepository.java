package com.weeklyplanning.repository;

import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import java.time.LocalDate;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Week entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WeekRepository extends JpaRepository<Week, UUID> {
    @Query(
        """
        select w
        from Week w
        where (:status is null or w.status = :status)
          and (:startDateFrom is null or w.startDate >= :startDateFrom)
          and (:startDateTo is null or w.startDate <= :startDateTo)
        """
    )
    Page<Week> search(
        @Param("status") WeekStatus status,
        @Param("startDateFrom") LocalDate startDateFrom,
        @Param("startDateTo") LocalDate startDateTo,
        Pageable pageable
    );
}
