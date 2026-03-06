package com.weeklyplanning.service.mapper;

import static com.weeklyplanning.domain.PersonAsserts.*;
import static com.weeklyplanning.domain.PersonTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PersonMapperTest {

    private PersonMapper personMapper;

    @BeforeEach
    void setUp() {
        personMapper = new PersonMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getPersonSample1();
        var actual = personMapper.toEntity(personMapper.toDto(expected));
        assertPersonAllPropertiesEquals(expected, actual);
    }
}
