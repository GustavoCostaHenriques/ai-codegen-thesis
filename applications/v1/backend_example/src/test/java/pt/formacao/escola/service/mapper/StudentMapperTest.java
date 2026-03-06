package pt.formacao.escola.service.mapper;

import static pt.formacao.escola.domain.StudentEntityAsserts.*;
import static pt.formacao.escola.domain.StudentEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudentMapperTest {

    private StudentMapper studentMapper;

    @BeforeEach
    void setUp() {
        studentMapper = new StudentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getStudentEntitySample1();
        var actual = studentMapper.toEntity(studentMapper.toDto(expected));
        assertStudentEntityAllPropertiesEquals(expected, actual);
    }
}
