package com.mycompany.weeklyplanning.service.mapper;

import com.mycompany.weeklyplanning.domain.DayUserProjectEntity;
import com.mycompany.weeklyplanning.domain.TaskEntity;
import com.mycompany.weeklyplanning.service.dto.DayUserProjectDTO;
import com.mycompany.weeklyplanning.service.dto.TaskDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TaskEntity} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskMapper extends EntityMapper<TaskDTO, TaskEntity> {
    @Mapping(target = "dayUserProject", source = "dayUserProject", qualifiedByName = "dayUserProjectId")
    TaskDTO toDto(TaskEntity s);

    @Named("dayUserProjectId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DayUserProjectDTO toDtoDayUserProjectId(DayUserProjectEntity dayUserProjectEntity);
}
