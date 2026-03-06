package com.mycompany.weeklyplanning.service.mapper;

import static com.mycompany.weeklyplanning.domain.ProjectEntityAsserts.*;
import static com.mycompany.weeklyplanning.domain.ProjectEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProjectMapperTest {

    private ProjectMapper projectMapper;

    @BeforeEach
    void setUp() {
        projectMapper = new ProjectMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getProjectEntitySample1();
        var actual = projectMapper.toEntity(projectMapper.toDto(expected));
        assertProjectEntityAllPropertiesEquals(expected, actual);
    }
}
