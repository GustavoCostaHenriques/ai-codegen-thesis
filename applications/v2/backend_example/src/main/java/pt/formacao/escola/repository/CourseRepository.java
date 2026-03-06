package pt.formacao.escola.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pt.formacao.escola.domain.CourseEntity;

/**
 * Spring Data JPA repository for the CourseEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long>, JpaSpecificationExecutor<CourseEntity> {}
