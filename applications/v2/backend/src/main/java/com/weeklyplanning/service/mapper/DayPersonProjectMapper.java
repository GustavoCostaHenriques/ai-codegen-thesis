package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.Project;
import com.weeklyplanning.service.dto.DayPersonDTO;
import com.weeklyplanning.service.dto.DayPersonProjectDTO;
import com.weeklyplanning.service.dto.ProjectDTO;
import java.util.Objects;
import java.util.UUID;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DayPersonProject} and its DTO {@link DayPersonProjectDTO}.
 */
@Mapper(componentModel = "spring")
public interface DayPersonProjectMapper extends EntityMapper<DayPersonProjectDTO, DayPersonProject> {
    @Mapping(target = "project", source = "project", qualifiedByName = "projectId")
    @Mapping(target = "dayPerson", source = "dayPerson", qualifiedByName = "dayPersonId")
    DayPersonProjectDTO toDto(DayPersonProject s);

    @Named("projectId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectDTO toDtoProjectId(Project project);

    @Named("dayPersonId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DayPersonDTO toDtoDayPersonId(DayPerson dayPerson);

    default String map(UUID value) {
        return Objects.toString(value, null);
    }
}
