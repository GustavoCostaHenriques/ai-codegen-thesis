package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.TaskItem;
import com.weeklyplanning.service.dto.ApiDtos;
import java.util.List;

public final class PlanningMapper {

    private PlanningMapper() {
    }

    public static ApiDtos.DayPlanResponse toDayPlan(DayPlan dayPlan) {
        return new ApiDtos.DayPlanResponse(
            dayPlan.getId(),
            dayPlan.getWeek().getId(),
            dayPlan.getDate(),
            dayPlan.getDayOfWeek(),
            dayPlan.getDayPersons().stream().map(dayPerson -> new ApiDtos.DayPersonResponse(
                dayPerson.getId(),
                PersonMapper.toReference(dayPerson.getPerson()),
                dayPerson.getDayPersonProjects().stream().map(PlanningMapper::toDayPersonProject).toList()
            )).toList()
        );
    }

    public static ApiDtos.DayPersonProjectResponse toDayPersonProject(DayPersonProject dayPersonProject) {
        return new ApiDtos.DayPersonProjectResponse(
            dayPersonProject.getId(),
            ProjectMapper.toReference(dayPersonProject.getProject()),
            dayPersonProject.getTasks().stream().map(PlanningMapper::toTask).toList()
        );
    }

    public static ApiDtos.TaskResponse toTask(TaskItem taskItem) {
        return new ApiDtos.TaskResponse(
            taskItem.getId(),
            taskItem.getDescription(),
            taskItem.getCreatedAt(),
            taskItem.getUpdatedAt()
        );
    }

    public static ApiDtos.DayPlanResponse stripAssignments(ApiDtos.DayPlanResponse dayPlan) {
        return new ApiDtos.DayPlanResponse(
            dayPlan.dayPlanId(),
            dayPlan.weekId(),
            dayPlan.date(),
            dayPlan.dayOfWeek(),
            List.of()
        );
    }
}
