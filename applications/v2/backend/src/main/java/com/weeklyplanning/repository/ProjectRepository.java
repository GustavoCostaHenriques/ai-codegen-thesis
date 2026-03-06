package com.weeklyplanning.repository;

import com.weeklyplanning.domain.Project;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    @EntityGraph(attributePaths = { "owner" })
    @Query(
        """
        select p
        from Project p
        where (:status is null or p.status = :status)
          and (:ownerId is null or p.owner.id = :ownerId)
          and (
            :q is null
            or lower(p.name) like lower(concat('%', cast(:q as string), '%'))
            or lower(p.code) like lower(concat('%', cast(:q as string), '%'))
          )
        """
    )
    Page<Project> search(
        @Param("status") ProjectStatus status,
        @Param("ownerId") UUID ownerId,
        @Param("q") String q,
        Pageable pageable
    );

    boolean existsByCodeIgnoreCase(String code);

    boolean existsByCodeIgnoreCaseAndIdNot(String code, UUID id);
}
