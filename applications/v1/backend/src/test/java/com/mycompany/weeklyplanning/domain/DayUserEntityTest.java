package com.mycompany.weeklyplanning.domain;

import static com.mycompany.weeklyplanning.domain.AppUserEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.DayPlanEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.DayUserEntityTestSamples.*;
import static com.mycompany.weeklyplanning.domain.DayUserProjectEntityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DayUserEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayUserEntity.class);
        DayUserEntity dayUserEntity1 = getDayUserEntitySample1();
        DayUserEntity dayUserEntity2 = new DayUserEntity();
        assertThat(dayUserEntity1).isNotEqualTo(dayUserEntity2);

        dayUserEntity2.setId(dayUserEntity1.getId());
        assertThat(dayUserEntity1).isEqualTo(dayUserEntity2);

        dayUserEntity2 = getDayUserEntitySample2();
        assertThat(dayUserEntity1).isNotEqualTo(dayUserEntity2);
    }

    @Test
    void assignmentsTest() {
        DayUserEntity dayUserEntity = getDayUserEntityRandomSampleGenerator();
        DayUserProjectEntity dayUserProjectEntityBack = getDayUserProjectEntityRandomSampleGenerator();

        dayUserEntity.addAssignments(dayUserProjectEntityBack);
        assertThat(dayUserEntity.getAssignments()).containsOnly(dayUserProjectEntityBack);
        assertThat(dayUserProjectEntityBack.getDayUser()).isEqualTo(dayUserEntity);

        dayUserEntity.removeAssignments(dayUserProjectEntityBack);
        assertThat(dayUserEntity.getAssignments()).doesNotContain(dayUserProjectEntityBack);
        assertThat(dayUserProjectEntityBack.getDayUser()).isNull();

        dayUserEntity.assignments(new HashSet<>(Set.of(dayUserProjectEntityBack)));
        assertThat(dayUserEntity.getAssignments()).containsOnly(dayUserProjectEntityBack);
        assertThat(dayUserProjectEntityBack.getDayUser()).isEqualTo(dayUserEntity);

        dayUserEntity.setAssignments(new HashSet<>());
        assertThat(dayUserEntity.getAssignments()).doesNotContain(dayUserProjectEntityBack);
        assertThat(dayUserProjectEntityBack.getDayUser()).isNull();
    }

    @Test
    void userTest() {
        DayUserEntity dayUserEntity = getDayUserEntityRandomSampleGenerator();
        AppUserEntity appUserEntityBack = getAppUserEntityRandomSampleGenerator();

        dayUserEntity.setUser(appUserEntityBack);
        assertThat(dayUserEntity.getUser()).isEqualTo(appUserEntityBack);

        dayUserEntity.user(null);
        assertThat(dayUserEntity.getUser()).isNull();
    }

    @Test
    void dayPlanTest() {
        DayUserEntity dayUserEntity = getDayUserEntityRandomSampleGenerator();
        DayPlanEntity dayPlanEntityBack = getDayPlanEntityRandomSampleGenerator();

        dayUserEntity.setDayPlan(dayPlanEntityBack);
        assertThat(dayUserEntity.getDayPlan()).isEqualTo(dayPlanEntityBack);

        dayUserEntity.dayPlan(null);
        assertThat(dayUserEntity.getDayPlan()).isNull();
    }
}
