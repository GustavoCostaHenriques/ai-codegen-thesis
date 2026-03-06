package com.mycompany.weeklyplanning.domain;

import static com.mycompany.weeklyplanning.domain.DayPlanEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.WeekEntityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class WeekEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WeekEntity.class);
        WeekEntity weekEntity1 = getWeekEntitySample1();
        WeekEntity weekEntity2 = new WeekEntity();
        assertThat(weekEntity1).isNotEqualTo(weekEntity2);

        weekEntity2.setId(weekEntity1.getId());
        assertThat(weekEntity1).isEqualTo(weekEntity2);

        weekEntity2 = getWeekEntitySample2();
        assertThat(weekEntity1).isNotEqualTo(weekEntity2);
    }

    @Test
    void dayPlansTest() {
        WeekEntity weekEntity = getWeekEntityRandomSampleGenerator();
        DayPlanEntity dayPlanEntityBack = getDayPlanEntityRandomSampleGenerator();

        weekEntity.addDayPlans(dayPlanEntityBack);
        assertThat(weekEntity.getDayPlans()).containsOnly(dayPlanEntityBack);
        assertThat(dayPlanEntityBack.getWeek()).isEqualTo(weekEntity);

        weekEntity.removeDayPlans(dayPlanEntityBack);
        assertThat(weekEntity.getDayPlans()).doesNotContain(dayPlanEntityBack);
        assertThat(dayPlanEntityBack.getWeek()).isNull();

        weekEntity.dayPlans(new HashSet<>(Set.of(dayPlanEntityBack)));
        assertThat(weekEntity.getDayPlans()).containsOnly(dayPlanEntityBack);
        assertThat(dayPlanEntityBack.getWeek()).isEqualTo(weekEntity);

        weekEntity.setDayPlans(new HashSet<>());
        assertThat(weekEntity.getDayPlans()).doesNotContain(dayPlanEntityBack);
        assertThat(dayPlanEntityBack.getWeek()).isNull();
    }
}
