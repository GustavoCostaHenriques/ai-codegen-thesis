package com.weeklyplanning.service.mapper;

import static com.weeklyplanning.domain.DayPersonAsserts.*;
import static com.weeklyplanning.domain.DayPersonTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DayPersonMapperTest {

    private DayPersonMapper dayPersonMapper;

    @BeforeEach
    void setUp() {
        dayPersonMapper = new DayPersonMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDayPersonSample1();
        var actual = dayPersonMapper.toEntity(dayPersonMapper.toDto(expected));
        assertDayPersonAllPropertiesEquals(expected, actual);
    }
}
