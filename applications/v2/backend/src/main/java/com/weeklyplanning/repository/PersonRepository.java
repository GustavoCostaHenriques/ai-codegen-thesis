package com.weeklyplanning.repository;

import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Person entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonRepository extends JpaRepository<Person, UUID> {
    @Query(
        """
        select p
        from Person p
        where (:status is null or p.status = :status)
          and (
            :q is null
            or lower(p.name) like lower(concat('%', cast(:q as string), '%'))
            or lower(p.email) like lower(concat('%', cast(:q as string), '%'))
            or lower(p.role) like lower(concat('%', cast(:q as string), '%'))
          )
        """
    )
    Page<Person> search(@Param("status") PersonStatus status, @Param("q") String q, Pageable pageable);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);
}
