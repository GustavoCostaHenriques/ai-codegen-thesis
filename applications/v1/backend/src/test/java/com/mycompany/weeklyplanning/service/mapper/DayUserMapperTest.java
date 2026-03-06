package com.mycompany.weeklyplanning.service.mapper;

import static com.mycompany.weeklyplanning.domain.DayUserEntityAsserts.*;
import static com.mycompany.weeklyplanning.domain.DayUserEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DayUserMapperTest {

    private DayUserMapper dayUserMapper;

    @BeforeEach
    void setUp() {
        dayUserMapper = new DayUserMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDayUserEntitySample1();
        var actual = dayUserMapper.toEntity(dayUserMapper.toDto(expected));
        assertDayUserEntityAllPropertiesEquals(expected, actual);
    }
}
