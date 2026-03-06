package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.Project;
import com.weeklyplanning.service.dto.PersonDTO;
import com.weeklyplanning.service.dto.ProjectDTO;
import java.util.Objects;
import java.util.UUID;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Project} and its DTO {@link ProjectDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProjectMapper extends EntityMapper<ProjectDTO, Project> {
    @Mapping(target = "owner", source = "owner", qualifiedByName = "personSummary")
    ProjectDTO toDto(Project s);

    @Named("personSummary")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    PersonDTO toDtoPersonSummary(Person person);

    default String map(UUID value) {
        return Objects.toString(value, null);
    }
}
