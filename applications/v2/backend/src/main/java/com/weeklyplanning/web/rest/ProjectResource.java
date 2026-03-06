package com.weeklyplanning.web.rest;

import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.service.ProjectService;
import com.weeklyplanning.service.dto.PersonDTO;
import com.weeklyplanning.service.dto.ProjectDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.web.rest.api.ApiModels;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectResource {

    private final ProjectService projectService;

    public ProjectResource(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN, T(com.weeklyplanning.security.AuthoritiesConstants).VIEWER)")
    public ResponseEntity<ApiModels.ProjectsPage> listProjects(
        @RequestParam(name = "status", required = false) ProjectStatus status,
        @RequestParam(name = "ownerId", required = false) UUID ownerId,
        @RequestParam(name = "q", required = false) String q,
        Pageable pageable
    ) {
        validatePageable(pageable);
        Page<ProjectDTO> page = projectService.search(status, ownerId, q, pageable);
        List<ApiModels.Project> items = page.getContent().stream().map(this::toApiProject).toList();
        ApiModels.ProjectsPage body = new ApiModels.ProjectsPage(items, toPageInfo(page));
        return ResponseEntity.ok(body);
    }

    @PostMapping
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.Project> createProject(@Valid @RequestBody ApiModels.ProjectUpsertRequest request) {
        ProjectDTO projectDTO = toProjectDTO(request);
        ProjectDTO created = projectService.save(projectDTO);
        return ResponseEntity.created(URI.create("/api/projects/" + created.getId())).body(toApiProject(created));
    }

    @GetMapping("/{projectId}")
    @PreAuthorize("hasAnyAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN, T(com.weeklyplanning.security.AuthoritiesConstants).VIEWER)")
    public ResponseEntity<ApiModels.Project> getProject(@PathVariable UUID projectId) {
        ProjectDTO project = projectService.findOne(projectId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Project not found"));
        return ResponseEntity.ok(toApiProject(project));
    }

    @PutMapping("/{projectId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.Project> updateProject(
        @PathVariable UUID projectId,
        @Valid @RequestBody ApiModels.ProjectUpsertRequest request
    ) {
        ProjectDTO projectDTO = toProjectDTO(request);
        projectDTO.setId(projectId);
        ProjectDTO updated = projectService.update(projectDTO);
        return ResponseEntity.ok(toApiProject(updated));
    }

    @DeleteMapping("/{projectId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID projectId) {
        projectService.findOne(projectId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Project not found"));
        projectService.delete(projectId);
        return ResponseEntity.noContent().build();
    }

    private ProjectDTO toProjectDTO(ApiModels.ProjectUpsertRequest request) {
        ProjectDTO dto = new ProjectDTO();
        dto.setName(request.name());
        dto.setCode(request.code());
        dto.setStatus(request.status());
        PersonDTO owner = new PersonDTO();
        owner.setId(request.ownerId());
        dto.setOwner(owner);
        return dto;
    }

    private ApiModels.Project toApiProject(ProjectDTO dto) {
        PersonDTO owner = dto.getOwner();
        ApiModels.PersonSummary ownerSummary = owner == null ? null : new ApiModels.PersonSummary(owner.getId(), owner.getName());
        return new ApiModels.Project(dto.getId(), dto.getName(), dto.getCode(), ownerSummary, dto.getStatus());
    }

    private ApiModels.PageInfo toPageInfo(Page<?> page) {
        List<ApiModels.SortInfo> sort = page
            .getSort()
            .stream()
            .map(order ->
                new ApiModels.SortInfo(
                    order.getProperty(),
                    order.isAscending() ? ApiModels.SortDirection.ASC : ApiModels.SortDirection.DESC
                )
            )
            .toList();
        return new ApiModels.PageInfo(page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages(), sort);
    }

    private void validatePageable(Pageable pageable) {
        if (pageable.getPageNumber() < 0 || pageable.getPageSize() < 1 || pageable.getPageSize() > 200) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid pagination parameters");
        }
    }
}
