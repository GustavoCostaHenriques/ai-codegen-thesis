package com.weeklyplanning.service;

import com.weeklyplanning.service.dto.WeekDTO;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.weeklyplanning.domain.Week}.
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
     * Get all the weeks.
     *
     * @return the list of entities.
     */
    List<WeekDTO> findAll();

    Page<WeekDTO> search(WeekStatus status, LocalDate startDateFrom, LocalDate startDateTo, Pageable pageable);

    /**
     * Get the "id" week.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WeekDTO> findOne(UUID id);

    /**
     * Delete the "id" week.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
