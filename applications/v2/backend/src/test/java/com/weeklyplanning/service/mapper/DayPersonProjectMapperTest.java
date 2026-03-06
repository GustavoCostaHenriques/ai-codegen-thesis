package com.weeklyplanning.service.mapper;

import static com.weeklyplanning.domain.DayPersonProjectAsserts.*;
import static com.weeklyplanning.domain.DayPersonProjectTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DayPersonProjectMapperTest {

    private DayPersonProjectMapper dayPersonProjectMapper;

    @BeforeEach
    void setUp() {
        dayPersonProjectMapper = new DayPersonProjectMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDayPersonProjectSample1();
        var actual = dayPersonProjectMapper.toEntity(dayPersonProjectMapper.toDto(expected));
        assertDayPersonProjectAllPropertiesEquals(expected, actual);
    }
}
