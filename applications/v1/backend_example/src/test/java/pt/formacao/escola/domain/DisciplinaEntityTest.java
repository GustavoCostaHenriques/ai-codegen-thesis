package pt.formacao.escola.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static pt.formacao.escola.domain.CourseEntityTestSamples.*;
import static pt.formacao.escola.domain.DisciplinaEntityTestSamples.*;
import static pt.formacao.escola.domain.GradeEntityTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import pt.formacao.escola.web.rest.TestUtil;

class DisciplinaEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DisciplinaEntity.class);
        DisciplinaEntity disciplinaEntity1 = getDisciplinaEntitySample1();
        DisciplinaEntity disciplinaEntity2 = new DisciplinaEntity();
        assertThat(disciplinaEntity1).isNotEqualTo(disciplinaEntity2);

        disciplinaEntity2.setId(disciplinaEntity1.getId());
        assertThat(disciplinaEntity1).isEqualTo(disciplinaEntity2);

        disciplinaEntity2 = getDisciplinaEntitySample2();
        assertThat(disciplinaEntity1).isNotEqualTo(disciplinaEntity2);
    }

    @Test
    void gradeTest() {
        DisciplinaEntity disciplinaEntity = getDisciplinaEntityRandomSampleGenerator();
        GradeEntity gradeEntityBack = getGradeEntityRandomSampleGenerator();

        disciplinaEntity.addGrade(gradeEntityBack);
        assertThat(disciplinaEntity.getGrades()).containsOnly(gradeEntityBack);
        assertThat(gradeEntityBack.getDisciplina()).isEqualTo(disciplinaEntity);

        disciplinaEntity.removeGrade(gradeEntityBack);
        assertThat(disciplinaEntity.getGrades()).doesNotContain(gradeEntityBack);
        assertThat(gradeEntityBack.getDisciplina()).isNull();

        disciplinaEntity.grades(new HashSet<>(Set.of(gradeEntityBack)));
        assertThat(disciplinaEntity.getGrades()).containsOnly(gradeEntityBack);
        assertThat(gradeEntityBack.getDisciplina()).isEqualTo(disciplinaEntity);

        disciplinaEntity.setGrades(new HashSet<>());
        assertThat(disciplinaEntity.getGrades()).doesNotContain(gradeEntityBack);
        assertThat(gradeEntityBack.getDisciplina()).isNull();
    }

    @Test
    void courseTest() {
        DisciplinaEntity disciplinaEntity = getDisciplinaEntityRandomSampleGenerator();
        CourseEntity courseEntityBack = getCourseEntityRandomSampleGenerator();

        disciplinaEntity.setCourse(courseEntityBack);
        assertThat(disciplinaEntity.getCourse()).isEqualTo(courseEntityBack);

        disciplinaEntity.course(null);
        assertThat(disciplinaEntity.getCourse()).isNull();
    }
}
