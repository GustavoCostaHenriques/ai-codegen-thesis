package pt.formacao.escola.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pt.formacao.escola.domain.DisciplinaEntity;

/**
 * Spring Data JPA repository for the DisciplinaEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisciplinaRepository extends JpaRepository<DisciplinaEntity, Long>, JpaSpecificationExecutor<DisciplinaEntity> {}
