package com.mycompany.weeklyplanning.service;

import com.mycompany.weeklyplanning.service.dto.DayUserProjectDTO;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.weeklyplanning.domain.DayUserProjectEntity}.
 */
public interface DayUserProjectService {
    /**
     * Save a dayUserProject.
     *
     * @param dayUserProjectDTO the entity to save.
     * @return the persisted entity.
     */
    DayUserProjectDTO save(DayUserProjectDTO dayUserProjectDTO);

    /**
     * Updates a dayUserProject.
     *
     * @param dayUserProjectDTO the entity to update.
     * @return the persisted entity.
     */
    DayUserProjectDTO update(DayUserProjectDTO dayUserProjectDTO);

    /**
     * Partially updates a dayUserProject.
     *
     * @param dayUserProjectDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DayUserProjectDTO> partialUpdate(DayUserProjectDTO dayUserProjectDTO);

    /**
     * Get the "id" dayUserProject.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayUserProjectDTO> findOne(Long id);

    /**
     * Delete the "id" dayUserProject.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
