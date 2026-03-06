package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.domain.ProjectStatus;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.security.CurrentUserProvider;
import com.example.weeklyplanning.service.ProjectService;
import com.example.weeklyplanning.service.dto.PagedProjects;
import com.example.weeklyplanning.service.dto.Project;
import com.example.weeklyplanning.service.dto.ProjectCreateRequest;
import com.example.weeklyplanning.service.dto.ProjectUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
public class ProjectResource {

    private final ProjectService projectService;
    private final CurrentUserProvider currentUserProvider;

    public ProjectResource(ProjectService projectService, CurrentUserProvider currentUserProvider) {
        this.projectService = projectService;
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping
    public ResponseEntity<PagedProjects> listProjects(@RequestParam(defaultValue = "0") Integer page,
                                                      @RequestParam(defaultValue = "20") Integer size,
                                                      @RequestParam(required = false) String sort,
                                                      @RequestParam(required = false) ProjectStatus status,
                                                      @RequestParam(required = false) String search) {
        return ResponseEntity.ok(projectService.listProjects(page, size, sort, status, search));
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody ProjectCreateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        Project created = projectService.createProject(request, principal);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable UUID projectId) {
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable UUID projectId,
                                                 @Valid @RequestBody ProjectUpdateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(projectService.updateProject(projectId, request, principal));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID projectId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        projectService.deleteProject(projectId, principal);
        return ResponseEntity.noContent().build();
    }
}
