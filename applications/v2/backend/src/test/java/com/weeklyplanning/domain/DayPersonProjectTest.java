package com.weeklyplanning.domain;

import static com.weeklyplanning.domain.DayPersonProjectTestSamples.*;
import static com.weeklyplanning.domain.DayPersonTestSamples.*;
import static com.weeklyplanning.domain.ProjectTestSamples.*;
import static com.weeklyplanning.domain.TaskTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DayPersonProjectTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayPersonProject.class);
        DayPersonProject dayPersonProject1 = getDayPersonProjectSample1();
        DayPersonProject dayPersonProject2 = new DayPersonProject();
        assertThat(dayPersonProject1).isNotEqualTo(dayPersonProject2);

        dayPersonProject2.setId(dayPersonProject1.getId());
        assertThat(dayPersonProject1).isEqualTo(dayPersonProject2);

        dayPersonProject2 = getDayPersonProjectSample2();
        assertThat(dayPersonProject1).isNotEqualTo(dayPersonProject2);
    }

    @Test
    void tasksTest() {
        DayPersonProject dayPersonProject = getDayPersonProjectRandomSampleGenerator();
        Task taskBack = getTaskRandomSampleGenerator();

        dayPersonProject.addTasks(taskBack);
        assertThat(dayPersonProject.getTasks()).containsOnly(taskBack);
        assertThat(taskBack.getDayPersonProject()).isEqualTo(dayPersonProject);

        dayPersonProject.removeTasks(taskBack);
        assertThat(dayPersonProject.getTasks()).doesNotContain(taskBack);
        assertThat(taskBack.getDayPersonProject()).isNull();

        dayPersonProject.tasks(new HashSet<>(Set.of(taskBack)));
        assertThat(dayPersonProject.getTasks()).containsOnly(taskBack);
        assertThat(taskBack.getDayPersonProject()).isEqualTo(dayPersonProject);

        dayPersonProject.setTasks(new HashSet<>());
        assertThat(dayPersonProject.getTasks()).doesNotContain(taskBack);
        assertThat(taskBack.getDayPersonProject()).isNull();
    }

    @Test
    void projectTest() {
        DayPersonProject dayPersonProject = getDayPersonProjectRandomSampleGenerator();
        Project projectBack = getProjectRandomSampleGenerator();

        dayPersonProject.setProject(projectBack);
        assertThat(dayPersonProject.getProject()).isEqualTo(projectBack);

        dayPersonProject.project(null);
        assertThat(dayPersonProject.getProject()).isNull();
    }

    @Test
    void dayPersonTest() {
        DayPersonProject dayPersonProject = getDayPersonProjectRandomSampleGenerator();
        DayPerson dayPersonBack = getDayPersonRandomSampleGenerator();

        dayPersonProject.setDayPerson(dayPersonBack);
        assertThat(dayPersonProject.getDayPerson()).isEqualTo(dayPersonBack);

        dayPersonProject.dayPerson(null);
        assertThat(dayPersonProject.getDayPerson()).isNull();
    }
}
