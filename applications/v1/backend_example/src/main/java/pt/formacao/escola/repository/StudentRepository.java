package pt.formacao.escola.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pt.formacao.escola.domain.StudentEntity;
import pt.formacao.escola.domain.projection.StudentInfoProjection;

/**
 * Spring Data JPA repository for the StudentEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long>, JpaSpecificationExecutor<StudentEntity> {
    StudentEntity findByName(String name);

    List<StudentEntity> findAllByAge(Integer age);

    @Query("Select student " + "from StudentEntity " + "student where student.age > :age")
    Page<StudentEntity> listStudents(@Param("age") Integer age, Pageable pageable);

    @Query(
        " SELECT student.name as name, student.age as age, student.studentAddress.country as country " +
        "FROM StudentEntity student " +
        "WHERE student.id = :id"
    )
    Optional<StudentInfoProjection> findByIdProjection(Long id);
}
