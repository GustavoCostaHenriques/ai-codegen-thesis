package com.mycompany.weeklyplanning.domain;

import static com.mycompany.weeklyplanning.domain.DayUserProjectEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.TaskEntityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TaskEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskEntity.class);
        TaskEntity taskEntity1 = getTaskEntitySample1();
        TaskEntity taskEntity2 = new TaskEntity();
        assertThat(taskEntity1).isNotEqualTo(taskEntity2);

        taskEntity2.setId(taskEntity1.getId());
        assertThat(taskEntity1).isEqualTo(taskEntity2);

        taskEntity2 = getTaskEntitySample2();
        assertThat(taskEntity1).isNotEqualTo(taskEntity2);
    }

    @Test
    void dayUserProjectTest() {
        TaskEntity taskEntity = getTaskEntityRandomSampleGenerator();
        DayUserProjectEntity dayUserProjectEntityBack = getDayUserProjectEntityRandomSampleGenerator();

        taskEntity.setDayUserProject(dayUserProjectEntityBack);
        assertThat(taskEntity.getDayUserProject()).isEqualTo(dayUserProjectEntityBack);

        taskEntity.dayUserProject(null);
        assertThat(taskEntity.getDayUserProject()).isNull();
    }
}
