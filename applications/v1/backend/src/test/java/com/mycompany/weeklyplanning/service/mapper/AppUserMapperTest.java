package com.mycompany.weeklyplanning.service.mapper;

import static com.mycompany.weeklyplanning.domain.AppUserEntityAsserts.*;
import static com.mycompany.weeklyplanning.domain.AppUserEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AppUserMapperTest {

    private AppUserMapper appUserMapper;

    @BeforeEach
    void setUp() {
        appUserMapper = new AppUserMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAppUserEntitySample1();
        var actual = appUserMapper.toEntity(appUserMapper.toDto(expected));
        assertAppUserEntityAllPropertiesEquals(expected, actual);
    }
}
