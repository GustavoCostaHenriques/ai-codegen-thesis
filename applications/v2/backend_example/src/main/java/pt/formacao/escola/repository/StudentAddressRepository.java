package pt.formacao.escola.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pt.formacao.escola.domain.StudentAddressEntity;

/**
 * Spring Data JPA repository for the StudentAddressEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentAddressRepository
    extends JpaRepository<StudentAddressEntity, Long>, JpaSpecificationExecutor<StudentAddressEntity> {}
