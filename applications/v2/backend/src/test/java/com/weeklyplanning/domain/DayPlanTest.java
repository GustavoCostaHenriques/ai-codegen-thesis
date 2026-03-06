package com.weeklyplanning.domain;

import static com.weeklyplanning.domain.DayPersonTestSamples.*;
import static com.weeklyplanning.domain.DayPlanTestSamples.*;
import static com.weeklyplanning.domain.WeekTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DayPlanTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayPlan.class);
        DayPlan dayPlan1 = getDayPlanSample1();
        DayPlan dayPlan2 = new DayPlan();
        assertThat(dayPlan1).isNotEqualTo(dayPlan2);

        dayPlan2.setId(dayPlan1.getId());
        assertThat(dayPlan1).isEqualTo(dayPlan2);

        dayPlan2 = getDayPlanSample2();
        assertThat(dayPlan1).isNotEqualTo(dayPlan2);
    }

    @Test
    void peopleTest() {
        DayPlan dayPlan = getDayPlanRandomSampleGenerator();
        DayPerson dayPersonBack = getDayPersonRandomSampleGenerator();

        dayPlan.addPeople(dayPersonBack);
        assertThat(dayPlan.getPeople()).containsOnly(dayPersonBack);
        assertThat(dayPersonBack.getDayPlan()).isEqualTo(dayPlan);

        dayPlan.removePeople(dayPersonBack);
        assertThat(dayPlan.getPeople()).doesNotContain(dayPersonBack);
        assertThat(dayPersonBack.getDayPlan()).isNull();

        dayPlan.people(new HashSet<>(Set.of(dayPersonBack)));
        assertThat(dayPlan.getPeople()).containsOnly(dayPersonBack);
        assertThat(dayPersonBack.getDayPlan()).isEqualTo(dayPlan);

        dayPlan.setPeople(new HashSet<>());
        assertThat(dayPlan.getPeople()).doesNotContain(dayPersonBack);
        assertThat(dayPersonBack.getDayPlan()).isNull();
    }

    @Test
    void weekTest() {
        DayPlan dayPlan = getDayPlanRandomSampleGenerator();
        Week weekBack = getWeekRandomSampleGenerator();

        dayPlan.setWeek(weekBack);
        assertThat(dayPlan.getWeek()).isEqualTo(weekBack);

        dayPlan.week(null);
        assertThat(dayPlan.getWeek()).isNull();
    }
}
