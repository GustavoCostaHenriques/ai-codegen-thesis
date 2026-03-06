package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.domain.ProjectStatus;
import com.example.weeklyplanning.repository.DayProjectRepository;
import com.example.weeklyplanning.repository.PlanningAssignmentRepository;
import com.example.weeklyplanning.repository.ProjectRepository;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.dto.PagedProjects;
import com.example.weeklyplanning.service.dto.Project;
import com.example.weeklyplanning.service.dto.ProjectCreateRequest;
import com.example.weeklyplanning.service.dto.ProjectSummary;
import com.example.weeklyplanning.service.dto.ProjectUpdateRequest;
import com.example.weeklyplanning.service.mapper.ApiMapper;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class ProjectService {

    private static final Set<String> PROJECT_SORT_FIELDS = Set.of("name", "code", "status", "createdAt", "updatedAt");

    private final ProjectRepository projectRepository;
    private final PaginationService paginationService;
    private final ApiMapper apiMapper;
    private final AuditService auditService;
    private final PlanningAssignmentRepository planningAssignmentRepository;
    private final DayProjectRepository dayProjectRepository;

    public ProjectService(ProjectRepository projectRepository,
                          PaginationService paginationService,
                          ApiMapper apiMapper,
                          AuditService auditService,
                          PlanningAssignmentRepository planningAssignmentRepository, 
                          DayProjectRepository dayProjectRepository) {
        this.projectRepository = projectRepository;
        this.paginationService = paginationService;
        this.apiMapper = apiMapper;
        this.auditService = auditService;
        this.planningAssignmentRepository = planningAssignmentRepository;
        this.dayProjectRepository = dayProjectRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public PagedProjects listProjects(Integer page,
                                      Integer size,
                                      String sort,
                                      ProjectStatus status,
                                      String search) {
        Pageable pageable = paginationService.toPageable(page, size, sort, PROJECT_SORT_FIELDS);
        Specification<ProjectEntity> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        if (search != null && !search.isBlank()) {
            String like = "%" + search.trim().toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), like),
                cb.like(cb.lower(root.get("code")), like)
            ));
        }

        Page<ProjectEntity> entityPage = projectRepository.findAll(spec, pageable);
        List<ProjectSummary> content = entityPage.getContent().stream().map(apiMapper::toProjectSummary).toList();
        return new PagedProjects(content, apiMapper.toPageMetadata(entityPage));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Project createProject(ProjectCreateRequest request, AuthenticatedPrincipal actor) {
        String normalizedCode = request.code().trim();
        if (projectRepository.existsByCodeIgnoreCase(normalizedCode)) {
            throw new ConflictException("Project code already exists.");
        }

        ProjectEntity entity = new ProjectEntity();
        entity.setName(request.name().trim());
        entity.setCode(normalizedCode);
        entity.setStatus(request.status());
        projectRepository.save(entity);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "CREATE_PROJECT", "PROJECT", entity.getId(), "Project created", true);
        return apiMapper.toProject(entity);
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public Project getProjectById(UUID projectId) {
        ProjectEntity entity = projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("Project not found."));
        return apiMapper.toProject(entity);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Project updateProject(UUID projectId, ProjectUpdateRequest request, AuthenticatedPrincipal actor) {
        ProjectEntity entity = projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("Project not found."));

        String normalizedCode = request.code().trim();
        if (projectRepository.existsByCodeIgnoreCaseAndIdNot(normalizedCode, projectId)) {
            throw new ConflictException("Project code already exists.");
        }

        entity.setName(request.name().trim());
        entity.setCode(normalizedCode);
        entity.setStatus(request.status());
        projectRepository.save(entity);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "UPDATE_PROJECT", "PROJECT", entity.getId(), "Project updated", true);
        return apiMapper.toProject(entity);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProject(UUID projectId, AuthenticatedPrincipal actor) {
        ProjectEntity entity = projectRepository.findById(projectId)
            .orElseThrow(() -> new NotFoundException("Project not found."));

        planningAssignmentRepository.deleteAllByProjectId(projectId);
        dayProjectRepository.deleteAllByProjectId(projectId);
        projectRepository.delete(entity);
        auditService.audit(actor.getAccountId(), actor.getUsername(), "DELETE_PROJECT", "PROJECT", entity.getId(), "Project removed", true);
    }
}
