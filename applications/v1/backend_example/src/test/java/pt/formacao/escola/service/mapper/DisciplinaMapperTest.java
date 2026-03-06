package pt.formacao.escola.service.mapper;

import static pt.formacao.escola.domain.DisciplinaEntityAsserts.*;
import static pt.formacao.escola.domain.DisciplinaEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DisciplinaMapperTest {

    private DisciplinaMapper disciplinaMapper;

    @BeforeEach
    void setUp() {
        disciplinaMapper = new DisciplinaMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDisciplinaEntitySample1();
        var actual = disciplinaMapper.toEntity(disciplinaMapper.toDto(expected));
        assertDisciplinaEntityAllPropertiesEquals(expected, actual);
    }
}
