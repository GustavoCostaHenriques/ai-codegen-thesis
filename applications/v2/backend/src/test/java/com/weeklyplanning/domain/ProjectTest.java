package com.weeklyplanning.domain;

import static com.weeklyplanning.domain.PersonTestSamples.*;
import static com.weeklyplanning.domain.ProjectTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProjectTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Project.class);
        Project project1 = getProjectSample1();
        Project project2 = new Project();
        assertThat(project1).isNotEqualTo(project2);

        project2.setId(project1.getId());
        assertThat(project1).isEqualTo(project2);

        project2 = getProjectSample2();
        assertThat(project1).isNotEqualTo(project2);
    }

    @Test
    void ownerTest() {
        Project project = getProjectRandomSampleGenerator();
        Person personBack = getPersonRandomSampleGenerator();

        project.setOwner(personBack);
        assertThat(project.getOwner()).isEqualTo(personBack);

        project.owner(null);
        assertThat(project.getOwner()).isNull();
    }
}
