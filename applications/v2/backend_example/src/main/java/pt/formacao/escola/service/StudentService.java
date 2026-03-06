package pt.formacao.escola.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import pt.formacao.escola.service.api.dto.CreateStudentRest;
import pt.formacao.escola.service.api.dto.StudentInfoRest;
import pt.formacao.escola.service.dto.StudentDTO;

/**
 * Service Interface for managing {@link pt.formacao.escola.domain.StudentEntity}.
 */
public interface StudentService {
    /**
     * Save a student.
     *
     * @param studentDTO the entity to save.
     * @return the persisted entity.
     */
    StudentDTO save(StudentDTO studentDTO);

    /**
     * Updates a student.
     *
     * @param studentDTO the entity to update.
     * @return the persisted entity.
     */
    StudentDTO update(StudentDTO studentDTO);

    /**
     * Partially updates a student.
     *
     * @param studentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StudentDTO> partialUpdate(StudentDTO studentDTO);

    /**
     * Get the "id" student.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentDTO> findOne(Long id);

    /**
     * Delete the "id" student.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Long getByName(String name);

    StudentInfoRest getStudentInfoById(Long id);

    StudentDTO createStudent(CreateStudentRest createStudentRest);

    StudentDTO updateStudent(Long id, StudentDTO request);

    List<StudentDTO> findAll();

    List<StudentDTO> listStudents(Integer age, Pageable pageable);

    StudentInfoRest getStudentInfoByIdProjection(Long id);
}
