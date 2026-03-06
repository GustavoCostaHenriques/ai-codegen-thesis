package com.example.weeklyplanning.service.mapper;

import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

    public ApiSchemas.ProjectSummary toSummary(ProjectEntity project) {
        return new ApiSchemas.ProjectSummary(
            project.getProjectId(),
            project.getName(),
            project.getCode(),
            project.getStatus()
        );
    }

    public ApiSchemas.ProjectDetail toDetail(ProjectEntity project) {
        return new ApiSchemas.ProjectDetail(
            project.getProjectId(),
            project.getName(),
            project.getCode(),
            project.getStatus(),
            project.getCreatedAt(),
            project.getUpdatedAt()
        );
    }

    public ApiSchemas.ProjectReference toReference(ProjectEntity project) {
        return new ApiSchemas.ProjectReference(
            project.getProjectId(),
            project.getName(),
            project.getCode(),
            project.getStatus()
        );
    }
}
