package pt.formacao.escola.service;

import java.util.List;
import java.util.Optional;
import pt.formacao.escola.service.dto.StudentAddressDTO;

/**
 * Service Interface for managing {@link pt.formacao.escola.domain.StudentAddressEntity}.
 */
public interface StudentAddressService {
    /**
     * Save a studentAddress.
     *
     * @param studentAddressDTO the entity to save.
     * @return the persisted entity.
     */
    StudentAddressDTO save(StudentAddressDTO studentAddressDTO);

    /**
     * Updates a studentAddress.
     *
     * @param studentAddressDTO the entity to update.
     * @return the persisted entity.
     */
    StudentAddressDTO update(StudentAddressDTO studentAddressDTO);

    /**
     * Partially updates a studentAddress.
     *
     * @param studentAddressDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StudentAddressDTO> partialUpdate(StudentAddressDTO studentAddressDTO);

    /**
     * Get all the StudentAddressDTO where Student is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<StudentAddressDTO> findAllWhereStudentIsNull();

    /**
     * Get the "id" studentAddress.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentAddressDTO> findOne(Long id);

    /**
     * Delete the "id" studentAddress.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
