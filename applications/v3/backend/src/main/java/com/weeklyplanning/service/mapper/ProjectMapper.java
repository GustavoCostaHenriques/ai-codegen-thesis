package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.Project;
import com.weeklyplanning.service.dto.ApiDtos;

public final class ProjectMapper {

    private ProjectMapper() {
    }

    public static ApiDtos.ProjectSummary toSummary(Project project) {
        return new ApiDtos.ProjectSummary(
            project.getId(),
            project.getName(),
            project.getCode(),
            project.getStatus()
        );
    }

    public static ApiDtos.ProjectDetail toDetail(Project project) {
        return new ApiDtos.ProjectDetail(
            project.getId(),
            project.getName(),
            project.getCode(),
            project.getStatus(),
            project.getCreatedAt(),
            project.getUpdatedAt()
        );
    }

    public static ApiDtos.ProjectReference toReference(Project project) {
        return new ApiDtos.ProjectReference(
            project.getId(),
            project.getName(),
            project.getCode(),
            project.getStatus()
        );
    }
}
