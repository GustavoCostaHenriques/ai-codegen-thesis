package pt.formacao.escola.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static pt.formacao.escola.domain.DisciplinaEntityTestSamples.*;
import static pt.formacao.escola.domain.GradeEntityTestSamples.*;
import static pt.formacao.escola.domain.StudentEntityTestSamples.*;

import org.junit.jupiter.api.Test;
import pt.formacao.escola.web.rest.TestUtil;

class GradeEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GradeEntity.class);
        GradeEntity gradeEntity1 = getGradeEntitySample1();
        GradeEntity gradeEntity2 = new GradeEntity();
        assertThat(gradeEntity1).isNotEqualTo(gradeEntity2);

        gradeEntity2.setId(gradeEntity1.getId());
        assertThat(gradeEntity1).isEqualTo(gradeEntity2);

        gradeEntity2 = getGradeEntitySample2();
        assertThat(gradeEntity1).isNotEqualTo(gradeEntity2);
    }

    @Test
    void studentTest() {
        GradeEntity gradeEntity = getGradeEntityRandomSampleGenerator();
        StudentEntity studentEntityBack = getStudentEntityRandomSampleGenerator();

        gradeEntity.setStudent(studentEntityBack);
        assertThat(gradeEntity.getStudent()).isEqualTo(studentEntityBack);

        gradeEntity.student(null);
        assertThat(gradeEntity.getStudent()).isNull();
    }

    @Test
    void disciplinaTest() {
        GradeEntity gradeEntity = getGradeEntityRandomSampleGenerator();
        DisciplinaEntity disciplinaEntityBack = getDisciplinaEntityRandomSampleGenerator();

        gradeEntity.setDisciplina(disciplinaEntityBack);
        assertThat(gradeEntity.getDisciplina()).isEqualTo(disciplinaEntityBack);

        gradeEntity.disciplina(null);
        assertThat(gradeEntity.getDisciplina()).isNull();
    }
}
