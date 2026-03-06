package com.weeklyplanning.domain;

import static com.weeklyplanning.domain.DayPersonProjectTestSamples.*;
import static com.weeklyplanning.domain.TaskTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TaskTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task.class);
        Task task1 = getTaskSample1();
        Task task2 = new Task();
        assertThat(task1).isNotEqualTo(task2);

        task2.setId(task1.getId());
        assertThat(task1).isEqualTo(task2);

        task2 = getTaskSample2();
        assertThat(task1).isNotEqualTo(task2);
    }

    @Test
    void dayPersonProjectTest() {
        Task task = getTaskRandomSampleGenerator();
        DayPersonProject dayPersonProjectBack = getDayPersonProjectRandomSampleGenerator();

        task.setDayPersonProject(dayPersonProjectBack);
        assertThat(task.getDayPersonProject()).isEqualTo(dayPersonProjectBack);

        task.dayPersonProject(null);
        assertThat(task.getDayPersonProject()).isNull();
    }
}
