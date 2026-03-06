package com.mycompany.weeklyplanning.service.mapper;

import static com.mycompany.weeklyplanning.domain.DayPlanEntityAsserts.*;
import static com.mycompany.weeklyplanning.domain.DayPlanEntityTestSamples.*;

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
        var expected = getDayPlanEntitySample1();
        var actual = dayPlanMapper.toEntity(dayPlanMapper.toDto(expected));
        assertDayPlanEntityAllPropertiesEquals(expected, actual);
    }
}
