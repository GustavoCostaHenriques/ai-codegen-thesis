package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.domain.enumeration.ProjectStatus;
import com.example.weeklyplanning.repository.DayPersonProjectRepository;
import com.example.weeklyplanning.repository.ProjectRepository;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.mapper.PageMapper;
import com.example.weeklyplanning.service.mapper.ProjectMapper;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final ProjectMapper projectMapper;
    private final PageMapper pageMapper;
    private final PaginationSupport paginationSupport;
    private final AuditService auditService;

    public ProjectService(
        ProjectRepository projectRepository,
        DayPersonProjectRepository dayPersonProjectRepository,
        ProjectMapper projectMapper,
        PageMapper pageMapper,
        PaginationSupport paginationSupport,
        AuditService auditService
    ) {
        this.projectRepository = projectRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.projectMapper = projectMapper;
        this.pageMapper = pageMapper;
        this.paginationSupport = paginationSupport;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public ApiSchemas.ProjectPage listProjects(
        Integer page,
        Integer size,
        String sort,
        String search,
        ProjectStatus status
    ) {
        Pageable pageable = paginationSupport.pageable(page, size, sort, Sort.by(Sort.Order.asc("name")));
        Specification<ProjectEntity> specification = buildSpecification(search, status);

        Page<ProjectEntity> result = projectRepository.findAll(specification, pageable);
        return new ApiSchemas.ProjectPage(
            result.getContent().stream().map(projectMapper::toSummary).toList(),
            pageMapper.toMetadata(result)
        );
    }

    @Transactional(readOnly = true)
    public ApiSchemas.ProjectDetail getProjectById(UUID projectId) {
        ProjectEntity project = projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("Project not found"));
        return projectMapper.toDetail(project);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ApiSchemas.ProjectDetail createProject(ApiSchemas.CreateProjectRequest request, String actor) {
        if (projectRepository.existsByCodeIgnoreCase(request.code())) {
            throw new ConflictException("Project code already in use");
        }

        ProjectEntity project = new ProjectEntity();
        project.setProjectId(UUID.randomUUID());
        project.setName(request.name());
        project.setCode(request.code().trim());
        project.setStatus(request.status());

        ProjectEntity saved = projectRepository.save(project);
        auditService.entityEvent("PROJECT", "CREATE", saved.getProjectId(), actor);
        return projectMapper.toDetail(saved);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ApiSchemas.ProjectDetail updateProjectById(UUID projectId, ApiSchemas.UpdateProjectRequest request, String actor) {
        ProjectEntity project = projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("Project not found"));

        if (projectRepository.existsByCodeIgnoreCaseAndProjectIdNot(request.code(), projectId)) {
            throw new ConflictException("Project code already in use");
        }

        project.setName(request.name());
        project.setCode(request.code().trim());
        project.setStatus(request.status());

        ProjectEntity saved = projectRepository.save(project);
        auditService.entityEvent("PROJECT", "UPDATE", saved.getProjectId(), actor);
        return projectMapper.toDetail(saved);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProjectById(UUID projectId, String actor) {
        ProjectEntity project = projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("Project not found"));

        if (dayPersonProjectRepository.existsByProject_ProjectId(projectId)) {
            throw new ConflictException("Project cannot be deleted because planning assignments exist");
        }

        projectRepository.delete(project);
        auditService.entityEvent("PROJECT", "DELETE", projectId, actor);
    }

    @Transactional(readOnly = true)
    public ProjectEntity findById(UUID projectId) {
        return projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("Project not found"));
    }

    private Specification<ProjectEntity> buildSpecification(String search, ProjectStatus status) {
        Specification<ProjectEntity> specification = Specification.where(null);

        if (search != null && !search.isBlank()) {
            String pattern = "%" + search.toLowerCase() + "%";
            specification = specification.and((root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), pattern),
                cb.like(cb.lower(root.get("code")), pattern)
            ));
        }

        if (status != null) {
            specification = specification.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        return specification;
    }
}
