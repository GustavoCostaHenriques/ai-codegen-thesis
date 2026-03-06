package com.weeklyplanning.service.impl;

import com.weeklyplanning.domain.Task;
import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.DayPersonRepository;
import com.weeklyplanning.repository.DayPlanRepository;
import com.weeklyplanning.repository.TaskRepository;
import com.weeklyplanning.service.DayPlanService;
import com.weeklyplanning.service.TaskService;
import com.weeklyplanning.service.dto.TaskDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.service.mapper.TaskMapper;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import com.weeklyplanning.config.ApplicationProperties;

/**
 * Service Implementation for managing {@link com.weeklyplanning.domain.Task}.
 */
@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private static final Logger LOG = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskRepository taskRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final DayPersonRepository dayPersonRepository;
    private final DayPlanRepository dayPlanRepository;
    private final DayPlanService dayPlanService;
    private final ApplicationProperties applicationProperties;

    private final TaskMapper taskMapper;

    public TaskServiceImpl(
        TaskRepository taskRepository,
        DayPersonProjectRepository dayPersonProjectRepository,
        DayPersonRepository dayPersonRepository,
        DayPlanRepository dayPlanRepository,
        DayPlanService dayPlanService,
        ApplicationProperties applicationProperties,
        TaskMapper taskMapper
    ) {
        this.taskRepository = taskRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.dayPersonRepository = dayPersonRepository;
        this.dayPlanRepository = dayPlanRepository;
        this.dayPlanService = dayPlanService;
        this.applicationProperties = applicationProperties;
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskDTO save(TaskDTO taskDTO) {
        LOG.debug("Request to save Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    @Override
    public TaskDTO update(TaskDTO taskDTO) {
        LOG.debug("Request to update Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        return taskMapper.toDto(task);
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
    public List<TaskDTO> findAll() {
        LOG.debug("Request to get all Tasks");
        return taskRepository.findAll().stream().map(taskMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Task addTaskToProject(UUID weekId, LocalDate date, UUID personId, UUID projectId, String description) {
        Week week = requirePlannedWeek(weekId);
        validateDateInWeekRange(week, date);

        DayPersonProject assignment = requireAssignment(weekId, date, personId, projectId);

        String normalizedDescription = normalizeDescription(description);
        int minLength = applicationProperties.getTask().getMinLength();
        if (normalizedDescription.length() < minLength) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Task description is shorter than the minimum allowed length");
        }

        Task task = new Task();
        task.setDayPersonProject(assignment);
        task.setDescription(normalizedDescription);
        return taskRepository.save(task);
    }

    @Override
    public void removeTaskFromProject(UUID weekId, LocalDate date, UUID personId, UUID projectId, UUID taskId) {
        Week week = requirePlannedWeek(weekId);
        validateDateInWeekRange(week, date);

        DayPersonProject assignment = requireAssignment(weekId, date, personId, projectId);
        Task task = taskRepository
            .findOneByIdAndDayPersonProjectId(taskId, assignment.getId())
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Task is not assigned to this project"));
        taskRepository.delete(task);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TaskDTO> findOne(UUID id) {
        LOG.debug("Request to get Task : {}", id);
        return taskRepository.findById(id).map(taskMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete Task : {}", id);
        taskRepository.deleteById(id);
    }

    private Week requirePlannedWeek(UUID weekId) {
        Week week = dayPlanService.getWeekOrThrow(weekId);
        if (week.getStatus() == WeekStatus.COMPLETED) {
            throw new ApiException(HttpStatus.CONFLICT, "Planning operations are forbidden for completed weeks");
        }
        return week;
    }

    private DayPersonProject requireAssignment(UUID weekId, LocalDate date, UUID personId, UUID projectId) {
        DayPlan dayPlan = dayPlanRepository
            .findOneByWeekIdAndDate(weekId, date)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Day plan not found"));

        DayPerson dayPerson = dayPersonRepository
            .findOneByDayPlanIdAndPersonId(dayPlan.getId(), personId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Person is not assigned to this day"));

        return dayPersonProjectRepository
            .findOneByDayPersonIdAndProjectId(dayPerson.getId(), projectId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Project is not assigned to this person on this day"));
    }

    private String normalizeDescription(String description) {
        if (!StringUtils.hasText(description)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Task description is required");
        }
        return description.trim();
    }

    private void validateDateInWeekRange(Week week, LocalDate date) {
        if (date == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Date is required");
        }
        if (date.isBefore(week.getStartDate()) || date.isAfter(week.getEndDate())) {
            throw new ApiException(HttpStatus.CONFLICT, "Date is outside the selected week range");
        }
    }
}
