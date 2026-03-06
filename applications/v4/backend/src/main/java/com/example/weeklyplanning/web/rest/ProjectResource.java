package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.domain.enumeration.ProjectStatus;
import com.example.weeklyplanning.service.ProjectService;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@Validated
public class ProjectResource {

    private final ProjectService projectService;

    public ProjectResource(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiSchemas.ProjectPage> listProjects(
        @RequestParam(value = "page", required = false) @Min(0) Integer page,
        @RequestParam(value = "size", required = false) @Min(1) @Max(100) Integer size,
        @RequestParam(value = "sort", required = false) String sort,
        @RequestParam(value = "search", required = false) @Size(min = 1, max = 120) String search,
        @RequestParam(value = "status", required = false) ProjectStatus status
    ) {
        return ResponseEntity.ok(projectService.listProjects(page, size, sort, search, status));
    }

    @PostMapping("/projects")
    public ResponseEntity<ApiSchemas.ProjectDetail> createProject(
        @Valid @RequestBody ApiSchemas.CreateProjectRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        ApiSchemas.ProjectDetail response = projectService.createProject(request, actor);
        return ResponseEntity.created(URI.create("/api/v1/projects/" + response.projectId())).body(response);
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<ApiSchemas.ProjectDetail> getProjectById(@PathVariable UUID projectId) {
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }

    @PutMapping("/projects/{projectId}")
    public ResponseEntity<ApiSchemas.ProjectDetail> updateProjectById(
        @PathVariable UUID projectId,
        @Valid @RequestBody ApiSchemas.UpdateProjectRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        return ResponseEntity.ok(projectService.updateProjectById(projectId, request, actor));
    }

    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<Void> deleteProjectById(
        @PathVariable UUID projectId,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        projectService.deleteProjectById(projectId, actor);
        return ResponseEntity.noContent().build();
    }
}
