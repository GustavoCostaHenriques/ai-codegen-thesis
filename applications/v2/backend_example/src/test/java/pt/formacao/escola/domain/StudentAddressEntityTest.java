package pt.formacao.escola.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static pt.formacao.escola.domain.StudentAddressEntityTestSamples.*;
import static pt.formacao.escola.domain.StudentEntityTestSamples.*;

import org.junit.jupiter.api.Test;
import pt.formacao.escola.web.rest.TestUtil;

class StudentAddressEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentAddressEntity.class);
        StudentAddressEntity studentAddressEntity1 = getStudentAddressEntitySample1();
        StudentAddressEntity studentAddressEntity2 = new StudentAddressEntity();
        assertThat(studentAddressEntity1).isNotEqualTo(studentAddressEntity2);

        studentAddressEntity2.setId(studentAddressEntity1.getId());
        assertThat(studentAddressEntity1).isEqualTo(studentAddressEntity2);

        studentAddressEntity2 = getStudentAddressEntitySample2();
        assertThat(studentAddressEntity1).isNotEqualTo(studentAddressEntity2);
    }

    @Test
    void studentTest() {
        StudentAddressEntity studentAddressEntity = getStudentAddressEntityRandomSampleGenerator();
        StudentEntity studentEntityBack = getStudentEntityRandomSampleGenerator();

        studentAddressEntity.setStudent(studentEntityBack);
        assertThat(studentAddressEntity.getStudent()).isEqualTo(studentEntityBack);
        assertThat(studentEntityBack.getStudentAddress()).isEqualTo(studentAddressEntity);

        studentAddressEntity.student(null);
        assertThat(studentAddressEntity.getStudent()).isNull();
        assertThat(studentEntityBack.getStudentAddress()).isNull();
    }
}
