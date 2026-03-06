package com.weeklyplanning.service.impl;

import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Project;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.repository.DayPersonRepository;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.DayPlanRepository;
import com.weeklyplanning.repository.ProjectRepository;
import com.weeklyplanning.repository.TaskRepository;
import com.weeklyplanning.service.DayPlanService;
import com.weeklyplanning.service.DayPersonProjectService;
import com.weeklyplanning.service.dto.DayPersonProjectDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.service.mapper.DayPersonProjectMapper;
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

/**
 * Service Implementation for managing {@link com.weeklyplanning.domain.DayPersonProject}.
 */
@Service
@Transactional
public class DayPersonProjectServiceImpl implements DayPersonProjectService {

    private static final Logger LOG = LoggerFactory.getLogger(DayPersonProjectServiceImpl.class);

    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final DayPersonRepository dayPersonRepository;
    private final DayPlanRepository dayPlanRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final DayPlanService dayPlanService;

    private final DayPersonProjectMapper dayPersonProjectMapper;

    public DayPersonProjectServiceImpl(
        DayPersonProjectRepository dayPersonProjectRepository,
        DayPersonRepository dayPersonRepository,
        DayPlanRepository dayPlanRepository,
        ProjectRepository projectRepository,
        TaskRepository taskRepository,
        DayPlanService dayPlanService,
        DayPersonProjectMapper dayPersonProjectMapper
    ) {
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.dayPersonRepository = dayPersonRepository;
        this.dayPlanRepository = dayPlanRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.dayPlanService = dayPlanService;
        this.dayPersonProjectMapper = dayPersonProjectMapper;
    }

    @Override
    public DayPersonProjectDTO save(DayPersonProjectDTO dayPersonProjectDTO) {
        LOG.debug("Request to save DayPersonProject : {}", dayPersonProjectDTO);
        DayPersonProject dayPersonProject = dayPersonProjectMapper.toEntity(dayPersonProjectDTO);
        dayPersonProject = dayPersonProjectRepository.save(dayPersonProject);
        return dayPersonProjectMapper.toDto(dayPersonProject);
    }

    @Override
    public DayPersonProjectDTO update(DayPersonProjectDTO dayPersonProjectDTO) {
        LOG.debug("Request to update DayPersonProject : {}", dayPersonProjectDTO);
        DayPersonProject dayPersonProject = dayPersonProjectMapper.toEntity(dayPersonProjectDTO);
        dayPersonProject = dayPersonProjectRepository.save(dayPersonProject);
        return dayPersonProjectMapper.toDto(dayPersonProject);
    }

    @Override
    public Optional<DayPersonProjectDTO> partialUpdate(DayPersonProjectDTO dayPersonProjectDTO) {
        LOG.debug("Request to partially update DayPersonProject : {}", dayPersonProjectDTO);

        return dayPersonProjectRepository
            .findById(dayPersonProjectDTO.getId())
            .map(existingDayPersonProject -> {
                dayPersonProjectMapper.partialUpdate(existingDayPersonProject, dayPersonProjectDTO);

                return existingDayPersonProject;
            })
            .map(dayPersonProjectRepository::save)
            .map(dayPersonProjectMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DayPersonProjectDTO> findAll() {
        LOG.debug("Request to get all DayPersonProjects");
        return dayPersonProjectRepository
            .findAll()
            .stream()
            .map(dayPersonProjectMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public DayPersonProject addProjectToPerson(UUID weekId, LocalDate date, UUID personId, UUID projectId) {
        Week week = requirePlannedWeek(weekId);
        validateDateInWeekRange(week, date);
        DayPerson dayPerson = requireDayPerson(weekId, date, personId);

        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Project not found"));
        if (project.getStatus() != ProjectStatus.ACTIVE) {
            throw new ApiException(HttpStatus.CONFLICT, "Inactive projects cannot be assigned to planning");
        }

        if (dayPersonProjectRepository.existsByDayPersonIdAndProjectId(dayPerson.getId(), projectId)) {
            throw new ApiException(HttpStatus.CONFLICT, "Project is already assigned to this person on this day");
        }

        DayPersonProject assignment = new DayPersonProject();
        assignment.setDayPerson(dayPerson);
        assignment.setProject(project);
        dayPersonProjectRepository.save(assignment);

        return dayPersonProjectRepository
            .findOneByDayPersonIdAndProjectId(dayPerson.getId(), projectId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Project assignment not found after creation"));
    }

    @Override
    public void removeProjectFromPerson(UUID weekId, LocalDate date, UUID personId, UUID projectId) {
        Week week = requirePlannedWeek(weekId);
        validateDateInWeekRange(week, date);
        DayPerson dayPerson = requireDayPerson(weekId, date, personId);

        DayPersonProject assignment = dayPersonProjectRepository
            .findOneByDayPersonIdAndProjectId(dayPerson.getId(), projectId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Project is not assigned to this person on this day"));

        taskRepository.deleteAll(taskRepository.findAllByDayPersonProjectIdIn(List.of(assignment.getId())));
        dayPersonProjectRepository.delete(assignment);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DayPersonProjectDTO> findOne(UUID id) {
        LOG.debug("Request to get DayPersonProject : {}", id);
        return dayPersonProjectRepository.findById(id).map(dayPersonProjectMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete DayPersonProject : {}", id);
        dayPersonProjectRepository.deleteById(id);
    }

    private Week requirePlannedWeek(UUID weekId) {
        Week week = dayPlanService.getWeekOrThrow(weekId);
        if (week.getStatus() == WeekStatus.COMPLETED) {
            throw new ApiException(HttpStatus.CONFLICT, "Planning operations are forbidden for completed weeks");
        }
        return week;
    }

    private DayPerson requireDayPerson(UUID weekId, LocalDate date, UUID personId) {
        DayPlan dayPlan = dayPlanRepository
            .findOneByWeekIdAndDate(weekId, date)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Day plan not found"));

        return dayPersonRepository
            .findOneByDayPlanIdAndPersonId(dayPlan.getId(), personId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Person is not assigned to this day"));
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
