package com.mycompany.weeklyplanning.domain;

import static com.mycompany.weeklyplanning.domain.DayUserEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.DayUserProjectEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.ProjectEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.TaskEntityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DayUserProjectEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayUserProjectEntity.class);
        DayUserProjectEntity dayUserProjectEntity1 = getDayUserProjectEntitySample1();
        DayUserProjectEntity dayUserProjectEntity2 = new DayUserProjectEntity();
        assertThat(dayUserProjectEntity1).isNotEqualTo(dayUserProjectEntity2);

        dayUserProjectEntity2.setId(dayUserProjectEntity1.getId());
        assertThat(dayUserProjectEntity1).isEqualTo(dayUserProjectEntity2);

        dayUserProjectEntity2 = getDayUserProjectEntitySample2();
        assertThat(dayUserProjectEntity1).isNotEqualTo(dayUserProjectEntity2);
    }

    @Test
    void tasksTest() {
        DayUserProjectEntity dayUserProjectEntity = getDayUserProjectEntityRandomSampleGenerator();
        TaskEntity taskEntityBack = getTaskEntityRandomSampleGenerator();

        dayUserProjectEntity.addTasks(taskEntityBack);
        assertThat(dayUserProjectEntity.getTasks()).containsOnly(taskEntityBack);
        assertThat(taskEntityBack.getDayUserProject()).isEqualTo(dayUserProjectEntity);

        dayUserProjectEntity.removeTasks(taskEntityBack);
        assertThat(dayUserProjectEntity.getTasks()).doesNotContain(taskEntityBack);
        assertThat(taskEntityBack.getDayUserProject()).isNull();

        dayUserProjectEntity.tasks(new HashSet<>(Set.of(taskEntityBack)));
        assertThat(dayUserProjectEntity.getTasks()).containsOnly(taskEntityBack);
        assertThat(taskEntityBack.getDayUserProject()).isEqualTo(dayUserProjectEntity);

        dayUserProjectEntity.setTasks(new HashSet<>());
        assertThat(dayUserProjectEntity.getTasks()).doesNotContain(taskEntityBack);
        assertThat(taskEntityBack.getDayUserProject()).isNull();
    }

    @Test
    void dayUserTest() {
        DayUserProjectEntity dayUserProjectEntity = getDayUserProjectEntityRandomSampleGenerator();
        DayUserEntity dayUserEntityBack = getDayUserEntityRandomSampleGenerator();

        dayUserProjectEntity.setDayUser(dayUserEntityBack);
        assertThat(dayUserProjectEntity.getDayUser()).isEqualTo(dayUserEntityBack);

        dayUserProjectEntity.dayUser(null);
        assertThat(dayUserProjectEntity.getDayUser()).isNull();
    }

    @Test
    void projectTest() {
        DayUserProjectEntity dayUserProjectEntity = getDayUserProjectEntityRandomSampleGenerator();
        ProjectEntity projectEntityBack = getProjectEntityRandomSampleGenerator();

        dayUserProjectEntity.setProject(projectEntityBack);
        assertThat(dayUserProjectEntity.getProject()).isEqualTo(projectEntityBack);

        dayUserProjectEntity.project(null);
        assertThat(dayUserProjectEntity.getProject()).isNull();
    }
}
