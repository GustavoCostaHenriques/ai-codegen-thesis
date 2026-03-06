package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.Task;
import com.weeklyplanning.service.dto.DayPersonProjectDTO;
import com.weeklyplanning.service.dto.TaskDTO;
import java.util.Objects;
import java.util.UUID;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Task} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {
    @Mapping(target = "dayPersonProject", source = "dayPersonProject", qualifiedByName = "dayPersonProjectId")
    TaskDTO toDto(Task s);

    @Named("dayPersonProjectId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DayPersonProjectDTO toDtoDayPersonProjectId(DayPersonProject dayPersonProject);

    default String map(UUID value) {
        return Objects.toString(value, null);
    }
}
