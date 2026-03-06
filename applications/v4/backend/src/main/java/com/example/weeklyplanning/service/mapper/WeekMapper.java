package com.example.weeklyplanning.service.mapper;

import com.example.weeklyplanning.domain.WeekEntity;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import org.springframework.stereotype.Component;

@Component
public class WeekMapper {

    public ApiSchemas.WeekSummary toSummary(WeekEntity week) {
        return new ApiSchemas.WeekSummary(
            week.getWeekId(),
            week.getWeekStart(),
            week.getWeekEnd(),
            week.getStatus()
        );
    }

    public ApiSchemas.WeekDetail toDetail(WeekEntity week) {
        return new ApiSchemas.WeekDetail(
            week.getWeekId(),
            week.getWeekStart(),
            week.getWeekEnd(),
            week.getStatus(),
            week.getCreatedAt(),
            week.getUpdatedAt()
        );
    }
}
