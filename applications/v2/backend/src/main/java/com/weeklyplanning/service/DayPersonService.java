package com.weeklyplanning.service;

import com.weeklyplanning.service.dto.DayPersonDTO;
import com.weeklyplanning.domain.DayPerson;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Interface for managing {@link com.weeklyplanning.domain.DayPerson}.
 */
public interface DayPersonService {
    /**
     * Save a dayPerson.
     *
     * @param dayPersonDTO the entity to save.
     * @return the persisted entity.
     */
    DayPersonDTO save(DayPersonDTO dayPersonDTO);

    /**
     * Updates a dayPerson.
     *
     * @param dayPersonDTO the entity to update.
     * @return the persisted entity.
     */
    DayPersonDTO update(DayPersonDTO dayPersonDTO);

    /**
     * Partially updates a dayPerson.
     *
     * @param dayPersonDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DayPersonDTO> partialUpdate(DayPersonDTO dayPersonDTO);

    /**
     * Get all the dayPeople.
     *
     * @return the list of entities.
     */
    List<DayPersonDTO> findAll();

    DayPerson addPersonToDay(UUID weekId, LocalDate date, UUID personId);

    void removePersonFromDay(UUID weekId, LocalDate date, UUID personId);

    /**
     * Get the "id" dayPerson.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayPersonDTO> findOne(UUID id);

    /**
     * Delete the "id" dayPerson.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
