package com.weeklyplanning.service.mapper;

import static com.weeklyplanning.domain.DayPlanAsserts.*;
import static com.weeklyplanning.domain.DayPlanTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DayPlanMapperTest {

    private DayPlanMapper dayPlanMapper;

    @BeforeEach
    void setUp() {
        dayPlanMapper = new DayPlanMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDayPlanSample1();
        var actual = dayPlanMapper.toEntity(dayPlanMapper.toDto(expected));
        assertDayPlanAllPropertiesEquals(expected, actual);
    }
}
