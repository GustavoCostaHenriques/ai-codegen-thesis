package com.mycompany.weeklyplanning.service.mapper;

import static com.mycompany.weeklyplanning.domain.TaskEntityAsserts.*;
import static com.mycompany.weeklyplanning.domain.TaskEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TaskMapperTest {

    private TaskMapper taskMapper;

    @BeforeEach
    void setUp() {
        taskMapper = new TaskMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTaskEntitySample1();
        var actual = taskMapper.toEntity(taskMapper.toDto(expected));
        assertTaskEntityAllPropertiesEquals(expected, actual);
    }
}
