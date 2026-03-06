package com.weeklyplanning.service;

import com.weeklyplanning.domain.Project;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.ProjectRepository;
import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.ConflictException;
import com.weeklyplanning.service.exception.NotFoundException;
import com.weeklyplanning.service.mapper.PageMapper;
import com.weeklyplanning.service.mapper.ProjectMapper;
import jakarta.transaction.Transactional;
import java.util.Locale;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;

    public ProjectService(ProjectRepository projectRepository, DayPersonProjectRepository dayPersonProjectRepository) {
        this.projectRepository = projectRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
    }

    public ApiDtos.ProjectPage listProjects(Pageable pageable,
                                            com.weeklyplanning.domain.enumeration.ProjectStatus status,
                                            String search) {
        Specification<Project> spec = Specification.where(null);

        if (search != null && !search.isBlank()) {
            String value = "%" + search.trim().toLowerCase(Locale.ROOT) + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), value),
                cb.like(cb.lower(root.get("code")), value)
            ));
        }

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        Page<Project> page = projectRepository.findAll(spec, pageable);
        return new ApiDtos.ProjectPage(page.map(ProjectMapper::toSummary).getContent(), PageMapper.toPageMetadata(page));
    }

    public ApiDtos.ProjectDetail createProject(ApiDtos.CreateProjectRequest request) {
        if (projectRepository.existsByCodeIgnoreCase(request.code())) {
            throw new ConflictException("PROJECT_CODE_ALREADY_EXISTS", "Project code already exists.");
        }

        Project project = Project.builder()
            .name(request.name().trim())
            .code(request.code().trim())
            .status(request.status())
            .build();

        return ProjectMapper.toDetail(projectRepository.save(project));
    }

    public ApiDtos.ProjectDetail getProjectById(UUID projectId) {
        return ProjectMapper.toDetail(findProject(projectId));
    }

    public ApiDtos.ProjectDetail updateProject(UUID projectId, ApiDtos.UpdateProjectRequest request) {
        Project project = findProject(projectId);

        if (projectRepository.existsByCodeIgnoreCaseAndIdNot(request.code().trim(), projectId)) {
            throw new ConflictException("PROJECT_CODE_ALREADY_EXISTS", "Project code already exists.");
        }

        project.setName(request.name().trim());
        project.setCode(request.code().trim());
        project.setStatus(request.status());

        return ProjectMapper.toDetail(projectRepository.save(project));
    }

    public void deleteProject(UUID projectId) {
        Project project = findProject(projectId);

        if (dayPersonProjectRepository.existsByProjectId(projectId)) {
            throw new ConflictException("PROJECT_HAS_PLANNING", "Project is assigned in planning and cannot be removed.");
        }

        projectRepository.delete(project);
    }

    public Project findProject(UUID projectId) {
        return projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("PROJECT_NOT_FOUND", "Project not found."));
    }
}
