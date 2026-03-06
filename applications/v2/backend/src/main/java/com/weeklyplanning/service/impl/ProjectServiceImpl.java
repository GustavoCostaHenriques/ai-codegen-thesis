package com.weeklyplanning.service.impl;

import com.weeklyplanning.domain.Project;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.PersonRepository;
import com.weeklyplanning.repository.ProjectRepository;
import com.weeklyplanning.repository.TaskRepository;
import com.weeklyplanning.service.ProjectService;
import com.weeklyplanning.service.dto.ProjectDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.service.mapper.ProjectMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

/**
 * Service Implementation for managing {@link com.weeklyplanning.domain.Project}.
 */
@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private static final Logger LOG = LoggerFactory.getLogger(ProjectServiceImpl.class);

    private final ProjectRepository projectRepository;
    private final PersonRepository personRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final TaskRepository taskRepository;

    private final ProjectMapper projectMapper;

    public ProjectServiceImpl(
        ProjectRepository projectRepository,
        PersonRepository personRepository,
        DayPersonProjectRepository dayPersonProjectRepository,
        TaskRepository taskRepository,
        ProjectMapper projectMapper
    ) {
        this.projectRepository = projectRepository;
        this.personRepository = personRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.taskRepository = taskRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public ProjectDTO save(ProjectDTO projectDTO) {
        LOG.debug("Request to save Project : {}", projectDTO);
        validateOwner(projectDTO);
        String normalizedCode = normalizeCode(projectDTO.getCode());
        if (projectRepository.existsByCodeIgnoreCase(normalizedCode)) {
            throw new ApiException(HttpStatus.CONFLICT, "Project code already exists");
        }
        projectDTO.setCode(normalizedCode);
        Project project = projectMapper.toEntity(projectDTO);
        project = projectRepository.save(project);
        return projectMapper.toDto(project);
    }

    @Override
    public ProjectDTO update(ProjectDTO projectDTO) {
        LOG.debug("Request to update Project : {}", projectDTO);
        if (projectDTO.getId() == null || !projectRepository.existsById(projectDTO.getId())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Project not found");
        }
        validateOwner(projectDTO);
        String normalizedCode = normalizeCode(projectDTO.getCode());
        if (projectRepository.existsByCodeIgnoreCaseAndIdNot(normalizedCode, projectDTO.getId())) {
            throw new ApiException(HttpStatus.CONFLICT, "Project code already exists");
        }
        projectDTO.setCode(normalizedCode);
        Project project = projectMapper.toEntity(projectDTO);
        project = projectRepository.save(project);
        return projectMapper.toDto(project);
    }

    @Override
    public Optional<ProjectDTO> partialUpdate(ProjectDTO projectDTO) {
        LOG.debug("Request to partially update Project : {}", projectDTO);

        return projectRepository
            .findById(projectDTO.getId())
            .map(existingProject -> {
                projectMapper.partialUpdate(existingProject, projectDTO);

                return existingProject;
            })
            .map(projectRepository::save)
            .map(projectMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDTO> findAll() {
        LOG.debug("Request to get all Projects");
        return projectRepository.findAll().stream().map(projectMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectDTO> search(ProjectStatus status, UUID ownerId, String q, Pageable pageable) {
        LOG.debug("Request to search Projects with status {}, ownerId {}, q {}", status, ownerId, q);
        String normalizedQ = normalizeSearchTerm(q);
        return projectRepository.search(status, ownerId, normalizedQ, pageable).map(projectMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProjectDTO> findOne(UUID id) {
        LOG.debug("Request to get Project : {}", id);
        return projectRepository.findById(id).map(projectMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete Project : {}", id);
        List<DayPersonProject> assignments = dayPersonProjectRepository.findAllByProjectId(id);
        List<UUID> assignmentIds = assignments.stream().map(DayPersonProject::getId).toList();
        if (!assignmentIds.isEmpty()) {
            taskRepository.deleteAll(taskRepository.findAllByDayPersonProjectIdIn(assignmentIds));
            dayPersonProjectRepository.deleteAll(assignments);
        }
        projectRepository.deleteById(id);
    }

    private void validateOwner(ProjectDTO projectDTO) {
        if (projectDTO.getOwner() == null || projectDTO.getOwner().getId() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Owner is required");
        }

        personRepository
            .findById(projectDTO.getOwner().getId())
            .filter(person -> person.getStatus() == PersonStatus.ACTIVE)
            .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Owner must be an active person"));
    }

    private String normalizeCode(String code) {
        if (!StringUtils.hasText(code)) {
            return code;
        }
        return code.trim().toUpperCase(Locale.ROOT);
    }

    private String normalizeSearchTerm(String query) {
        if (!StringUtils.hasText(query)) {
            return null;
        }
        String normalized = query.trim();
        return normalized.isEmpty() ? null : normalized;
    }
}
