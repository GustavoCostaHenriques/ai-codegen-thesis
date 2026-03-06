package com.weeklyplanning.service.mapper;

import static com.weeklyplanning.domain.WeekAsserts.*;
import static com.weeklyplanning.domain.WeekTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WeekMapperTest {

    private WeekMapper weekMapper;

    @BeforeEach
    void setUp() {
        weekMapper = new WeekMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getWeekSample1();
        var actual = weekMapper.toEntity(weekMapper.toDto(expected));
        assertWeekAllPropertiesEquals(expected, actual);
    }
}
