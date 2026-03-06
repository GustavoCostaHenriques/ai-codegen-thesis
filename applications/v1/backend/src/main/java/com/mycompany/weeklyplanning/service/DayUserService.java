package com.mycompany.weeklyplanning.service;

import com.mycompany.weeklyplanning.service.dto.DayUserDTO;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.weeklyplanning.domain.DayUserEntity}.
 */
public interface DayUserService {
    /**
     * Save a dayUser.
     *
     * @param dayUserDTO the entity to save.
     * @return the persisted entity.
     */
    DayUserDTO save(DayUserDTO dayUserDTO);

    /**
     * Updates a dayUser.
     *
     * @param dayUserDTO the entity to update.
     * @return the persisted entity.
     */
    DayUserDTO update(DayUserDTO dayUserDTO);

    /**
     * Partially updates a dayUser.
     *
     * @param dayUserDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DayUserDTO> partialUpdate(DayUserDTO dayUserDTO);

    /**
     * Get the "id" dayUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayUserDTO> findOne(Long id);

    /**
     * Delete the "id" dayUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
