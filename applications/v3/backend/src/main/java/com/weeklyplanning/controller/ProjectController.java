package com.weeklyplanning.controller;

import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.service.ProjectService;
import com.weeklyplanning.service.dto.ApiDtos;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import java.net.URI;
import java.util.UUID;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/projects")
@Validated
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ApiDtos.ProjectPage listProjects(
        @PageableDefault(size = 20, sort = "name", direction = Sort.Direction.ASC)
        Pageable pageable,
        @RequestParam(name = "search", required = false)
        @Size(min = 1, max = 120) String search,
        @RequestParam(name = "status", required = false)
        ProjectStatus status
    ) {
        return projectService.listProjects(pageable, status, search);
    }


    @PostMapping
    public ResponseEntity<ApiDtos.ProjectDetail> createProject(@Valid @RequestBody ApiDtos.CreateProjectRequest request) {
        ApiDtos.ProjectDetail response = projectService.createProject(request);
        return ResponseEntity.created(URI.create("/api/v1/projects/" + response.projectId())).body(response);
    }

    @GetMapping("/{projectId}")
    public ApiDtos.ProjectDetail getProjectById(@PathVariable(name = "projectId") UUID projectId) {
        return projectService.getProjectById(projectId);
    }

    @PutMapping("/{projectId}")
    public ApiDtos.ProjectDetail updateProjectById(@PathVariable(name = "projectId") UUID projectId,
                                                    @Valid @RequestBody ApiDtos.UpdateProjectRequest request) {
        return projectService.updateProject(projectId, request);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProjectById(@PathVariable(name = "projectId") UUID projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}
