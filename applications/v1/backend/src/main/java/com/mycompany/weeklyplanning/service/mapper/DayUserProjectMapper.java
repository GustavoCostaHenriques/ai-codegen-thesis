package com.mycompany.weeklyplanning.service.mapper;

import com.mycompany.weeklyplanning.domain.DayUserEntity;
import com.mycompany.weeklyplanning.domain.DayUserProjectEntity;
import com.mycompany.weeklyplanning.domain.ProjectEntity;
import com.mycompany.weeklyplanning.service.dto.DayUserDTO;
import com.mycompany.weeklyplanning.service.dto.DayUserProjectDTO;
import com.mycompany.weeklyplanning.service.dto.ProjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DayUserProjectEntity} and its DTO {@link DayUserProjectDTO}.
 */
@Mapper(componentModel = "spring")
public interface DayUserProjectMapper extends EntityMapper<DayUserProjectDTO, DayUserProjectEntity> {
    @Mapping(target = "dayUser", source = "dayUser", qualifiedByName = "dayUserId")
    @Mapping(target = "project", source = "project", qualifiedByName = "projectId")
    DayUserProjectDTO toDto(DayUserProjectEntity s);

    @Named("dayUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DayUserDTO toDtoDayUserId(DayUserEntity dayUserEntity);

    @Named("projectId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectDTO toDtoProjectId(ProjectEntity projectEntity);
}
