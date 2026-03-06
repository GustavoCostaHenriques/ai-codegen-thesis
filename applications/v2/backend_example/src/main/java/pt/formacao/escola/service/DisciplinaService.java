package pt.formacao.escola.service;

import java.util.Optional;
import pt.formacao.escola.service.dto.DisciplinaDTO;

/**
 * Service Interface for managing {@link pt.formacao.escola.domain.DisciplinaEntity}.
 */
public interface DisciplinaService {
    /**
     * Save a disciplina.
     *
     * @param disciplinaDTO the entity to save.
     * @return the persisted entity.
     */
    DisciplinaDTO save(DisciplinaDTO disciplinaDTO);

    /**
     * Updates a disciplina.
     *
     * @param disciplinaDTO the entity to update.
     * @return the persisted entity.
     */
    DisciplinaDTO update(DisciplinaDTO disciplinaDTO);

    /**
     * Partially updates a disciplina.
     *
     * @param disciplinaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DisciplinaDTO> partialUpdate(DisciplinaDTO disciplinaDTO);

    /**
     * Get the "id" disciplina.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DisciplinaDTO> findOne(Long id);

    /**
     * Delete the "id" disciplina.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
