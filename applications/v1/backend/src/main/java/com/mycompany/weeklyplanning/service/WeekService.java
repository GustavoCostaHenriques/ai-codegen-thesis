package com.mycompany.weeklyplanning.service;

import com.mycompany.weeklyplanning.service.dto.WeekDTO;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.weeklyplanning.domain.WeekEntity}.
 */
public interface WeekService {
    /**
     * Save a week.
     *
     * @param weekDTO the entity to save.
     * @return the persisted entity.
     */
    WeekDTO save(WeekDTO weekDTO);

    /**
     * Updates a week.
     *
     * @param weekDTO the entity to update.
     * @return the persisted entity.
     */
    WeekDTO update(WeekDTO weekDTO);

    /**
     * Partially updates a week.
     *
     * @param weekDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WeekDTO> partialUpdate(WeekDTO weekDTO);

    /**
     * Get the "id" week.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WeekDTO> findOne(Long id);

    /**
     * Delete the "id" week.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
