package com.weeklyplanning.repository;

import com.weeklyplanning.domain.Week;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WeekRepository extends JpaRepository<Week, UUID>, JpaSpecificationExecutor<Week> {

    boolean existsByCodeIgnoreCase(String code);
}
