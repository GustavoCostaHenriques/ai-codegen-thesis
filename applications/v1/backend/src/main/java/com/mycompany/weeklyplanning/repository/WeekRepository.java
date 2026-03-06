package com.mycompany.weeklyplanning.repository;

import com.mycompany.weeklyplanning.domain.WeekEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the WeekEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WeekRepository extends JpaRepository<WeekEntity, Long>, JpaSpecificationExecutor<WeekEntity> {}
