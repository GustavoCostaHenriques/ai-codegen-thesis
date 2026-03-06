package com.weeklyplanning.service;

import com.weeklyplanning.service.dto.PersonDTO;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.weeklyplanning.domain.Person}.
 */
public interface PersonService {
    /**
     * Save a person.
     *
     * @param personDTO the entity to save.
     * @return the persisted entity.
     */
    PersonDTO save(PersonDTO personDTO);

    /**
     * Updates a person.
     *
     * @param personDTO the entity to update.
     * @return the persisted entity.
     */
    PersonDTO update(PersonDTO personDTO);

    /**
     * Partially updates a person.
     *
     * @param personDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PersonDTO> partialUpdate(PersonDTO personDTO);

    /**
     * Get all the people.
     *
     * @return the list of entities.
     */
    List<PersonDTO> findAll();

    Page<PersonDTO> search(PersonStatus status, String q, Pageable pageable);

    /**
     * Get the "id" person.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PersonDTO> findOne(UUID id);

    /**
     * Delete the "id" person.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
