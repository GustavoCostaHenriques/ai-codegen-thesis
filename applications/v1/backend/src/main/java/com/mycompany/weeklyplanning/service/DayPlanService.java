package com.mycompany.weeklyplanning.service;

import com.mycompany.weeklyplanning.service.dto.DayPlanDTO;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.weeklyplanning.domain.DayPlanEntity}.
 */
public interface DayPlanService {
    /**
     * Save a dayPlan.
     *
     * @param dayPlanDTO the entity to save.
     * @return the persisted entity.
     */
    DayPlanDTO save(DayPlanDTO dayPlanDTO);

    /**
     * Updates a dayPlan.
     *
     * @param dayPlanDTO the entity to update.
     * @return the persisted entity.
     */
    DayPlanDTO update(DayPlanDTO dayPlanDTO);

    /**
     * Partially updates a dayPlan.
     *
     * @param dayPlanDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DayPlanDTO> partialUpdate(DayPlanDTO dayPlanDTO);

    /**
     * Get the "id" dayPlan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayPlanDTO> findOne(Long id);

    /**
     * Delete the "id" dayPlan.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
