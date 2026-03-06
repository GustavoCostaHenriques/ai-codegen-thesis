package com.mycompany.weeklyplanning.service.mapper;

import static com.mycompany.weeklyplanning.domain.DayUserProjectEntityAsserts.*;
import static com.mycompany.weeklyplanning.domain.DayUserProjectEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DayUserProjectMapperTest {

    private DayUserProjectMapper dayUserProjectMapper;

    @BeforeEach
    void setUp() {
        dayUserProjectMapper = new DayUserProjectMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDayUserProjectEntitySample1();
        var actual = dayUserProjectMapper.toEntity(dayUserProjectMapper.toDto(expected));
        assertDayUserProjectEntityAllPropertiesEquals(expected, actual);
    }
}
