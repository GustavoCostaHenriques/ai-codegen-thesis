package com.weeklyplanning.service;

import com.weeklyplanning.service.dto.DayPersonProjectDTO;
import com.weeklyplanning.domain.DayPersonProject;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Interface for managing {@link com.weeklyplanning.domain.DayPersonProject}.
 */
public interface DayPersonProjectService {
    /**
     * Save a dayPersonProject.
     *
     * @param dayPersonProjectDTO the entity to save.
     * @return the persisted entity.
     */
    DayPersonProjectDTO save(DayPersonProjectDTO dayPersonProjectDTO);

    /**
     * Updates a dayPersonProject.
     *
     * @param dayPersonProjectDTO the entity to update.
     * @return the persisted entity.
     */
    DayPersonProjectDTO update(DayPersonProjectDTO dayPersonProjectDTO);

    /**
     * Partially updates a dayPersonProject.
     *
     * @param dayPersonProjectDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DayPersonProjectDTO> partialUpdate(DayPersonProjectDTO dayPersonProjectDTO);

    /**
     * Get all the dayPersonProjects.
     *
     * @return the list of entities.
     */
    List<DayPersonProjectDTO> findAll();

    DayPersonProject addProjectToPerson(UUID weekId, LocalDate date, UUID personId, UUID projectId);

    void removeProjectFromPerson(UUID weekId, LocalDate date, UUID personId, UUID projectId);

    /**
     * Get the "id" dayPersonProject.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayPersonProjectDTO> findOne(UUID id);

    /**
     * Delete the "id" dayPersonProject.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
