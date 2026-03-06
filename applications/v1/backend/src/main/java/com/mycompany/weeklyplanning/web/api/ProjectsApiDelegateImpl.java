package com.mycompany.weeklyplanning.web.api;

import com.mycompany.weeklyplanning.service.api.WeeklyPlanningApiService;
import com.mycompany.weeklyplanning.service.api.dto.Project;
import com.mycompany.weeklyplanning.service.api.dto.ProjectCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.ProjectUpdateRequest;
import com.mycompany.weeklyplanning.service.api.dto.ProjectsPage;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProjectsApiDelegateImpl implements ProjectsApiDelegate {

    private final WeeklyPlanningApiService apiService;

    public ProjectsApiDelegateImpl(WeeklyPlanningApiService apiService) {
        this.apiService = apiService;
    }

    @Override
    public ResponseEntity<Project> createProject(ProjectCreateRequest projectCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apiService.createProject(projectCreateRequest));
    }

    @Override
    public ResponseEntity<Void> deleteProject(UUID projectId) {
        apiService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Project> getProject(UUID projectId) {
        return ResponseEntity.ok(apiService.getProject(projectId));
    }

    @Override
    public ResponseEntity<ProjectsPage> listProjects(Integer page, Integer size, String sort) {
        return ResponseEntity.ok(apiService.listProjects(page, size, sort));
    }

    @Override
    public ResponseEntity<Project> updateProject(UUID projectId, ProjectUpdateRequest projectUpdateRequest) {
        return ResponseEntity.ok(apiService.updateProject(projectId, projectUpdateRequest));
    }
}

