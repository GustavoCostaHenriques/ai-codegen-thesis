package com.weeklyplanning.domain;

import static com.weeklyplanning.domain.DayPersonProjectTestSamples.*;
import static com.weeklyplanning.domain.DayPersonTestSamples.*;
import static com.weeklyplanning.domain.DayPlanTestSamples.*;
import static com.weeklyplanning.domain.PersonTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DayPersonTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayPerson.class);
        DayPerson dayPerson1 = getDayPersonSample1();
        DayPerson dayPerson2 = new DayPerson();
        assertThat(dayPerson1).isNotEqualTo(dayPerson2);

        dayPerson2.setId(dayPerson1.getId());
        assertThat(dayPerson1).isEqualTo(dayPerson2);

        dayPerson2 = getDayPersonSample2();
        assertThat(dayPerson1).isNotEqualTo(dayPerson2);
    }

    @Test
    void projectsTest() {
        DayPerson dayPerson = getDayPersonRandomSampleGenerator();
        DayPersonProject dayPersonProjectBack = getDayPersonProjectRandomSampleGenerator();

        dayPerson.addProjects(dayPersonProjectBack);
        assertThat(dayPerson.getProjects()).containsOnly(dayPersonProjectBack);
        assertThat(dayPersonProjectBack.getDayPerson()).isEqualTo(dayPerson);

        dayPerson.removeProjects(dayPersonProjectBack);
        assertThat(dayPerson.getProjects()).doesNotContain(dayPersonProjectBack);
        assertThat(dayPersonProjectBack.getDayPerson()).isNull();

        dayPerson.projects(new HashSet<>(Set.of(dayPersonProjectBack)));
        assertThat(dayPerson.getProjects()).containsOnly(dayPersonProjectBack);
        assertThat(dayPersonProjectBack.getDayPerson()).isEqualTo(dayPerson);

        dayPerson.setProjects(new HashSet<>());
        assertThat(dayPerson.getProjects()).doesNotContain(dayPersonProjectBack);
        assertThat(dayPersonProjectBack.getDayPerson()).isNull();
    }

    @Test
    void personTest() {
        DayPerson dayPerson = getDayPersonRandomSampleGenerator();
        Person personBack = getPersonRandomSampleGenerator();

        dayPerson.setPerson(personBack);
        assertThat(dayPerson.getPerson()).isEqualTo(personBack);

        dayPerson.person(null);
        assertThat(dayPerson.getPerson()).isNull();
    }

    @Test
    void dayPlanTest() {
        DayPerson dayPerson = getDayPersonRandomSampleGenerator();
        DayPlan dayPlanBack = getDayPlanRandomSampleGenerator();

        dayPerson.setDayPlan(dayPlanBack);
        assertThat(dayPerson.getDayPlan()).isEqualTo(dayPlanBack);

        dayPerson.dayPlan(null);
        assertThat(dayPerson.getDayPlan()).isNull();
    }
}
