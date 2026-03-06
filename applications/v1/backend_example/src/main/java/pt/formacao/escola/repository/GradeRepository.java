package pt.formacao.escola.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pt.formacao.escola.domain.GradeEntity;

/**
 * Spring Data JPA repository for the GradeEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GradeRepository extends JpaRepository<GradeEntity, Long>, JpaSpecificationExecutor<GradeEntity> {}
