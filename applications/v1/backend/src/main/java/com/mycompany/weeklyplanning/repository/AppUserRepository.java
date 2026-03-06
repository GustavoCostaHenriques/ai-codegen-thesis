package com.mycompany.weeklyplanning.repository;

import com.mycompany.weeklyplanning.domain.AppUserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppUserEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppUserRepository extends JpaRepository<AppUserEntity, Long>, JpaSpecificationExecutor<AppUserEntity> {
    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    Optional<AppUserEntity> findOneByEmailIgnoreCase(String email);
}
