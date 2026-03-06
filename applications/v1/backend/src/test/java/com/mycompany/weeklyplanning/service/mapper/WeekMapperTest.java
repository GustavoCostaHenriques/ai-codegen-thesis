package com.mycompany.weeklyplanning.service.mapper;

import static com.mycompany.weeklyplanning.domain.WeekEntityAsserts.*;
import static com.mycompany.weeklyplanning.domain.WeekEntityTestSamples.*;

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
        var expected = getWeekEntitySample1();
        var actual = weekMapper.toEntity(weekMapper.toDto(expected));
        assertWeekEntityAllPropertiesEquals(expected, actual);
    }
}
