package com.weeklyplanning.domain;

import static com.weeklyplanning.domain.DayPlanTestSamples.*;
import static com.weeklyplanning.domain.WeekTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class WeekTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Week.class);
        Week week1 = getWeekSample1();
        Week week2 = new Week();
        assertThat(week1).isNotEqualTo(week2);

        week2.setId(week1.getId());
        assertThat(week1).isEqualTo(week2);

        week2 = getWeekSample2();
        assertThat(week1).isNotEqualTo(week2);
    }

    @Test
    void dayPlansTest() {
        Week week = getWeekRandomSampleGenerator();
        DayPlan dayPlanBack = getDayPlanRandomSampleGenerator();

        week.addDayPlans(dayPlanBack);
        assertThat(week.getDayPlans()).containsOnly(dayPlanBack);
        assertThat(dayPlanBack.getWeek()).isEqualTo(week);

        week.removeDayPlans(dayPlanBack);
        assertThat(week.getDayPlans()).doesNotContain(dayPlanBack);
        assertThat(dayPlanBack.getWeek()).isNull();

        week.dayPlans(new HashSet<>(Set.of(dayPlanBack)));
        assertThat(week.getDayPlans()).containsOnly(dayPlanBack);
        assertThat(dayPlanBack.getWeek()).isEqualTo(week);

        week.setDayPlans(new HashSet<>());
        assertThat(week.getDayPlans()).doesNotContain(dayPlanBack);
        assertThat(dayPlanBack.getWeek()).isNull();
    }
}
