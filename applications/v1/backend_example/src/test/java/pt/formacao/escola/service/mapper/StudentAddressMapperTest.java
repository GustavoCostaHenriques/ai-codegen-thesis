package pt.formacao.escola.service.mapper;

import static pt.formacao.escola.domain.StudentAddressEntityAsserts.*;
import static pt.formacao.escola.domain.StudentAddressEntityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudentAddressMapperTest {

    private StudentAddressMapper studentAddressMapper;

    @BeforeEach
    void setUp() {
        studentAddressMapper = new StudentAddressMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getStudentAddressEntitySample1();
        var actual = studentAddressMapper.toEntity(studentAddressMapper.toDto(expected));
        assertStudentAddressEntityAllPropertiesEquals(expected, actual);
    }
}
