package com.mycompany.weeklyplanning.domain;

import static com.mycompany.weeklyplanning.domain.DayPlanEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.DayUserEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.WeekEntityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DayPlanEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayPlanEntity.class);
        DayPlanEntity dayPlanEntity1 = getDayPlanEntitySample1();
        DayPlanEntity dayPlanEntity2 = new DayPlanEntity();
        assertThat(dayPlanEntity1).isNotEqualTo(dayPlanEntity2);

        dayPlanEntity2.setId(dayPlanEntity1.getId());
        assertThat(dayPlanEntity1).isEqualTo(dayPlanEntity2);

        dayPlanEntity2 = getDayPlanEntitySample2();
        assertThat(dayPlanEntity1).isNotEqualTo(dayPlanEntity2);
    }

    @Test
    void dayUsersTest() {
        DayPlanEntity dayPlanEntity = getDayPlanEntityRandomSampleGenerator();
        DayUserEntity dayUserEntityBack = getDayUserEntityRandomSampleGenerator();

        dayPlanEntity.addDayUsers(dayUserEntityBack);
        assertThat(dayPlanEntity.getDayUsers()).containsOnly(dayUserEntityBack);
        assertThat(dayUserEntityBack.getDayPlan()).isEqualTo(dayPlanEntity);

        dayPlanEntity.removeDayUsers(dayUserEntityBack);
        assertThat(dayPlanEntity.getDayUsers()).doesNotContain(dayUserEntityBack);
        assertThat(dayUserEntityBack.getDayPlan()).isNull();

        dayPlanEntity.dayUsers(new HashSet<>(Set.of(dayUserEntityBack)));
        assertThat(dayPlanEntity.getDayUsers()).containsOnly(dayUserEntityBack);
        assertThat(dayUserEntityBack.getDayPlan()).isEqualTo(dayPlanEntity);

        dayPlanEntity.setDayUsers(new HashSet<>());
        assertThat(dayPlanEntity.getDayUsers()).doesNotContain(dayUserEntityBack);
        assertThat(dayUserEntityBack.getDayPlan()).isNull();
    }

    @Test
    void weekTest() {
        DayPlanEntity dayPlanEntity = getDayPlanEntityRandomSampleGenerator();
        WeekEntity weekEntityBack = getWeekEntityRandomSampleGenerator();

        dayPlanEntity.setWeek(weekEntityBack);
        assertThat(dayPlanEntity.getWeek()).isEqualTo(weekEntityBack);

        dayPlanEntity.week(null);
        assertThat(dayPlanEntity.getWeek()).isNull();
    }
}
