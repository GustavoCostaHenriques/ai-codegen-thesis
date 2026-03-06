package com.mycompany.weeklyplanning.service.mapper;

import com.mycompany.weeklyplanning.domain.ProjectEntity;
import com.mycompany.weeklyplanning.service.dto.ProjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProjectEntity} and its DTO {@link ProjectDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProjectMapper extends EntityMapper<ProjectDTO, ProjectEntity> {}
