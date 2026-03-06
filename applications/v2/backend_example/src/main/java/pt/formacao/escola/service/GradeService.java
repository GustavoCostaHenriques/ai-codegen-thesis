package pt.formacao.escola.service;

import java.util.Optional;
import pt.formacao.escola.service.dto.GradeDTO;

/**
 * Service Interface for managing {@link pt.formacao.escola.domain.GradeEntity}.
 */
public interface GradeService {
    /**
     * Save a grade.
     *
     * @param gradeDTO the entity to save.
     * @return the persisted entity.
     */
    GradeDTO save(GradeDTO gradeDTO);

    /**
     * Updates a grade.
     *
     * @param gradeDTO the entity to update.
     * @return the persisted entity.
     */
    GradeDTO update(GradeDTO gradeDTO);

    /**
     * Partially updates a grade.
     *
     * @param gradeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GradeDTO> partialUpdate(GradeDTO gradeDTO);

    /**
     * Get the "id" grade.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GradeDTO> findOne(Long id);

    /**
     * Delete the "id" grade.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
