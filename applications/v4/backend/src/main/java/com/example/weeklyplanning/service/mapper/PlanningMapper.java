package com.example.weeklyplanning.service.mapper;

import com.example.weeklyplanning.domain.DayPersonEntity;
import com.example.weeklyplanning.domain.DayPersonProjectEntity;
import com.example.weeklyplanning.domain.DayPlanEntity;
import com.example.weeklyplanning.domain.TaskEntity;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class PlanningMapper {

    private final PersonMapper personMapper;
    private final ProjectMapper projectMapper;

    public PlanningMapper(PersonMapper personMapper, ProjectMapper projectMapper) {
        this.personMapper = personMapper;
        this.projectMapper = projectMapper;
    }

    public ApiSchemas.DayPlan toDayPlan(DayPlanEntity entity) {
        return toDayPlan(entity, null, true);
    }

    public ApiSchemas.DayPlan toDayPlan(DayPlanEntity entity, UUID filterPersonId, boolean includeAssignments) {
        List<ApiSchemas.DayPerson> dayPersons = includeAssignments
            ? entity.getDayPersons().stream()
            .filter(dp -> filterPersonId == null || dp.getPerson().getPersonId().equals(filterPersonId))
            .map(this::toDayPerson)
            .toList()
            : List.of();

        return new ApiSchemas.DayPlan(
            entity.getDayPlanId(),
            entity.getWeek().getWeekId(),
            entity.getDate(),
            entity.getDayOfWeek(),
            dayPersons
        );
    }

    public ApiSchemas.DayPerson toDayPerson(DayPersonEntity entity) {
        List<ApiSchemas.DayPersonProject> projects = entity.getDayPersonProjects().stream()
            .map(this::toDayPersonProject)
            .toList();

        return new ApiSchemas.DayPerson(
            entity.getDayPersonId(),
            personMapper.toReference(entity.getPerson()),
            projects
        );
    }

    public ApiSchemas.DayPersonProject toDayPersonProject(DayPersonProjectEntity entity) {
        List<ApiSchemas.Task> tasks = entity.getTasks().stream()
            .map(this::toTask)
            .toList();

        return new ApiSchemas.DayPersonProject(
            entity.getDayPersonProjectId(),
            projectMapper.toReference(entity.getProject()),
            tasks
        );
    }

    public ApiSchemas.Task toTask(TaskEntity entity) {
        return new ApiSchemas.Task(
            entity.getTaskId(),
            entity.getDescription(),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }
}
