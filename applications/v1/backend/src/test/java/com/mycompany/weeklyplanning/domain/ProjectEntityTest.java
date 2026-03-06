package com.mycompany.weeklyplanning.domain;

import static com.mycompany.weeklyplanning.domain.DayUserProjectEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.ProjectEntityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProjectEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectEntity.class);
        ProjectEntity projectEntity1 = getProjectEntitySample1();
        ProjectEntity projectEntity2 = new ProjectEntity();
        assertThat(projectEntity1).isNotEqualTo(projectEntity2);

        projectEntity2.setId(projectEntity1.getId());
        assertThat(projectEntity1).isEqualTo(projectEntity2);

        projectEntity2 = getProjectEntitySample2();
        assertThat(projectEntity1).isNotEqualTo(projectEntity2);
    }

    @Test
    void assignmentsTest() {
        ProjectEntity projectEntity = getProjectEntityRandomSampleGenerator();
        DayUserProjectEntity dayUserProjectEntityBack = getDayUserProjectEntityRandomSampleGenerator();

        projectEntity.addAssignments(dayUserProjectEntityBack);
        assertThat(projectEntity.getAssignments()).containsOnly(dayUserProjectEntityBack);
        assertThat(dayUserProjectEntityBack.getProject()).isEqualTo(projectEntity);

        projectEntity.removeAssignments(dayUserProjectEntityBack);
        assertThat(projectEntity.getAssignments()).doesNotContain(dayUserProjectEntityBack);
        assertThat(dayUserProjectEntityBack.getProject()).isNull();

        projectEntity.assignments(new HashSet<>(Set.of(dayUserProjectEntityBack)));
        assertThat(projectEntity.getAssignments()).containsOnly(dayUserProjectEntityBack);
        assertThat(dayUserProjectEntityBack.getProject()).isEqualTo(projectEntity);

        projectEntity.setAssignments(new HashSet<>());
        assertThat(projectEntity.getAssignments()).doesNotContain(dayUserProjectEntityBack);
        assertThat(dayUserProjectEntityBack.getProject()).isNull();
    }
}
