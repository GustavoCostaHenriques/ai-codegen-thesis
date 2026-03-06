package com.weeklyplanning.service;

import com.weeklyplanning.service.dto.DayPlanDTO;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Week;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Interface for managing {@link com.weeklyplanning.domain.DayPlan}.
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
     * Get all the dayPlans.
     *
     * @return the list of entities.
     */
    List<DayPlanDTO> findAll();

    List<DayPlan> findPlanningDays(UUID weekId);

    DayPlan getOrCreateDayPlan(UUID weekId, LocalDate date);

    Week getWeekOrThrow(UUID weekId);

    /**
     * Get the "id" dayPlan.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayPlanDTO> findOne(UUID id);

    /**
     * Delete the "id" dayPlan.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
