package pt.formacao.escola.service.mapper;

import static pt.formacao.escola.domain.GradeEntityAsserts.*;
import static pt.formacao.escola.domain.GradeEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GradeMapperTest {

    private GradeMapper gradeMapper;

    @BeforeEach
    void setUp() {
        gradeMapper = new GradeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getGradeEntitySample1();
        var actual = gradeMapper.toEntity(gradeMapper.toDto(expected));
        assertGradeEntityAllPropertiesEquals(expected, actual);
    }
}
