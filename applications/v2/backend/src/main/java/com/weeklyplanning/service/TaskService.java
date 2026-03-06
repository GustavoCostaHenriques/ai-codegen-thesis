package com.weeklyplanning.service;

import com.weeklyplanning.service.dto.TaskDTO;
import com.weeklyplanning.domain.Task;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Interface for managing {@link com.weeklyplanning.domain.Task}.
 */
public interface TaskService {
    /**
     * Save a task.
     *
     * @param taskDTO the entity to save.
     * @return the persisted entity.
     */
    TaskDTO save(TaskDTO taskDTO);

    /**
     * Updates a task.
     *
     * @param taskDTO the entity to update.
     * @return the persisted entity.
     */
    TaskDTO update(TaskDTO taskDTO);

    /**
     * Partially updates a task.
     *
     * @param taskDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TaskDTO> partialUpdate(TaskDTO taskDTO);

    /**
     * Get all the tasks.
     *
     * @return the list of entities.
     */
    List<TaskDTO> findAll();

    Task addTaskToProject(UUID weekId, LocalDate date, UUID personId, UUID projectId, String description);

    void removeTaskFromProject(UUID weekId, LocalDate date, UUID personId, UUID projectId, UUID taskId);

    /**
     * Get the "id" task.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TaskDTO> findOne(UUID id);

    /**
     * Delete the "id" task.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
