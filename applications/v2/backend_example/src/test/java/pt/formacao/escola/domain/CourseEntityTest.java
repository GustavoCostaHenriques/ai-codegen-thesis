package pt.formacao.escola.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static pt.formacao.escola.domain.CourseEntityTestSamples.*;
import static pt.formacao.escola.domain.DisciplinaEntityTestSamples.*;
import static pt.formacao.escola.domain.StudentEntityTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import pt.formacao.escola.web.rest.TestUtil;

class CourseEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseEntity.class);
        CourseEntity courseEntity1 = getCourseEntitySample1();
        CourseEntity courseEntity2 = new CourseEntity();
        assertThat(courseEntity1).isNotEqualTo(courseEntity2);

        courseEntity2.setId(courseEntity1.getId());
        assertThat(courseEntity1).isEqualTo(courseEntity2);

        courseEntity2 = getCourseEntitySample2();
        assertThat(courseEntity1).isNotEqualTo(courseEntity2);
    }

    @Test
    void disciplinaTest() {
        CourseEntity courseEntity = getCourseEntityRandomSampleGenerator();
        DisciplinaEntity disciplinaEntityBack = getDisciplinaEntityRandomSampleGenerator();

        courseEntity.addDisciplina(disciplinaEntityBack);
        assertThat(courseEntity.getDisciplinas()).containsOnly(disciplinaEntityBack);
        assertThat(disciplinaEntityBack.getCourse()).isEqualTo(courseEntity);

        courseEntity.removeDisciplina(disciplinaEntityBack);
        assertThat(courseEntity.getDisciplinas()).doesNotContain(disciplinaEntityBack);
        assertThat(disciplinaEntityBack.getCourse()).isNull();

        courseEntity.disciplinas(new HashSet<>(Set.of(disciplinaEntityBack)));
        assertThat(courseEntity.getDisciplinas()).containsOnly(disciplinaEntityBack);
        assertThat(disciplinaEntityBack.getCourse()).isEqualTo(courseEntity);

        courseEntity.setDisciplinas(new HashSet<>());
        assertThat(courseEntity.getDisciplinas()).doesNotContain(disciplinaEntityBack);
        assertThat(disciplinaEntityBack.getCourse()).isNull();
    }

    @Test
    void studentTest() {
        CourseEntity courseEntity = getCourseEntityRandomSampleGenerator();
        StudentEntity studentEntityBack = getStudentEntityRandomSampleGenerator();

        courseEntity.addStudent(studentEntityBack);
        assertThat(courseEntity.getStudents()).containsOnly(studentEntityBack);
        assertThat(studentEntityBack.getCourse()).isEqualTo(courseEntity);

        courseEntity.removeStudent(studentEntityBack);
        assertThat(courseEntity.getStudents()).doesNotContain(studentEntityBack);
        assertThat(studentEntityBack.getCourse()).isNull();

        courseEntity.students(new HashSet<>(Set.of(studentEntityBack)));
        assertThat(courseEntity.getStudents()).containsOnly(studentEntityBack);
        assertThat(studentEntityBack.getCourse()).isEqualTo(courseEntity);

        courseEntity.setStudents(new HashSet<>());
        assertThat(courseEntity.getStudents()).doesNotContain(studentEntityBack);
        assertThat(studentEntityBack.getCourse()).isNull();
    }
}
