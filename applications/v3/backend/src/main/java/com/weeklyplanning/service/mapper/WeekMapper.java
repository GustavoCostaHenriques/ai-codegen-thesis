package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.Week;
import com.weeklyplanning.service.dto.ApiDtos;

public final class WeekMapper {

    private WeekMapper() {
    }

    public static ApiDtos.WeekSummary toSummary(Week week) {
        return new ApiDtos.WeekSummary(
            week.getId(),
            week.getWeekStart(),
            week.getWeekEnd(),
            week.getStatus()
        );
    }

    public static ApiDtos.WeekDetail toDetail(Week week) {
        return new ApiDtos.WeekDetail(
            week.getId(),
            week.getWeekStart(),
            week.getWeekEnd(),
            week.getStatus(),
            week.getCreatedAt(),
            week.getUpdatedAt()
        );
    }
}
