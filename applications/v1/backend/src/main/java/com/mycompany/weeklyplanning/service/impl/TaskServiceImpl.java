package com.mycompany.weeklyplanning.service.impl;

import com.mycompany.weeklyplanning.domain.TaskEntity;
import com.mycompany.weeklyplanning.repository.TaskRepository;
import com.mycompany.weeklyplanning.service.TaskService;
import com.mycompany.weeklyplanning.service.dto.TaskDTO;
import com.mycompany.weeklyplanning.service.mapper.TaskMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.weeklyplanning.domain.TaskEntity}.
 */
@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private static final Logger LOG = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskDTO save(TaskDTO taskDTO) {
        LOG.debug("Request to save Task : {}", taskDTO);
        TaskEntity taskEntity = taskMapper.toEntity(taskDTO);
        taskEntity = taskRepository.save(taskEntity);
        return taskMapper.toDto(taskEntity);
    }

    @Override
    public TaskDTO update(TaskDTO taskDTO) {
        LOG.debug("Request to update Task : {}", taskDTO);
        TaskEntity taskEntity = taskMapper.toEntity(taskDTO);
        taskEntity = taskRepository.save(taskEntity);
        return taskMapper.toDto(taskEntity);
    }

    @Override
    public Optional<TaskDTO> partialUpdate(TaskDTO taskDTO) {
        LOG.debug("Request to partially update Task : {}", taskDTO);

        return taskRepository
            .findById(taskDTO.getId())
            .map(existingTask -> {
                taskMapper.partialUpdate(existingTask, taskDTO);

                return existingTask;
            })
            .map(taskRepository::save)
            .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TaskDTO> findOne(Long id) {
        LOG.debug("Request to get Task : {}", id);
        return taskRepository.findById(id).map(taskMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Task : {}", id);
        taskRepository.deleteById(id);
    }
}
