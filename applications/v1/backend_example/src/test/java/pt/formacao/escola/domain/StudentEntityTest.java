package pt.formacao.escola.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static pt.formacao.escola.domain.CourseEntityTestSamples.*;
import static pt.formacao.escola.domain.GradeEntityTestSamples.*;
import static pt.formacao.escola.domain.StudentAddressEntityTestSamples.*;
import static pt.formacao.escola.domain.StudentEntityTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import pt.formacao.escola.web.rest.TestUtil;

class StudentEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentEntity.class);
        StudentEntity studentEntity1 = getStudentEntitySample1();
        StudentEntity studentEntity2 = new StudentEntity();
        assertThat(studentEntity1).isNotEqualTo(studentEntity2);

        studentEntity2.setId(studentEntity1.getId());
        assertThat(studentEntity1).isEqualTo(studentEntity2);

        studentEntity2 = getStudentEntitySample2();
        assertThat(studentEntity1).isNotEqualTo(studentEntity2);
    }

    @Test
    void studentAddressTest() {
        StudentEntity studentEntity = getStudentEntityRandomSampleGenerator();
        StudentAddressEntity studentAddressEntityBack = getStudentAddressEntityRandomSampleGenerator();

        studentEntity.setStudentAddress(studentAddressEntityBack);
        assertThat(studentEntity.getStudentAddress()).isEqualTo(studentAddressEntityBack);

        studentEntity.studentAddress(null);
        assertThat(studentEntity.getStudentAddress()).isNull();
    }

    @Test
    void gradeTest() {
        StudentEntity studentEntity = getStudentEntityRandomSampleGenerator();
        GradeEntity gradeEntityBack = getGradeEntityRandomSampleGenerator();

        studentEntity.addGrade(gradeEntityBack);
        assertThat(studentEntity.getGrades()).containsOnly(gradeEntityBack);
        assertThat(gradeEntityBack.getStudent()).isEqualTo(studentEntity);

        studentEntity.removeGrade(gradeEntityBack);
        assertThat(studentEntity.getGrades()).doesNotContain(gradeEntityBack);
        assertThat(gradeEntityBack.getStudent()).isNull();

        studentEntity.grades(new HashSet<>(Set.of(gradeEntityBack)));
        assertThat(studentEntity.getGrades()).containsOnly(gradeEntityBack);
        assertThat(gradeEntityBack.getStudent()).isEqualTo(studentEntity);

        studentEntity.setGrades(new HashSet<>());
        assertThat(studentEntity.getGrades()).doesNotContain(gradeEntityBack);
        assertThat(gradeEntityBack.getStudent()).isNull();
    }

    @Test
    void courseTest() {
        StudentEntity studentEntity = getStudentEntityRandomSampleGenerator();
        CourseEntity courseEntityBack = getCourseEntityRandomSampleGenerator();

        studentEntity.setCourse(courseEntityBack);
        assertThat(studentEntity.getCourse()).isEqualTo(courseEntityBack);

        studentEntity.course(null);
        assertThat(studentEntity.getCourse()).isNull();
    }
}
