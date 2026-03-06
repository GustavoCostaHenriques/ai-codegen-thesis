package com.mycompany.weeklyplanning.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class DayUserCriteriaTest {

    @Test
    void newDayUserCriteriaHasAllFiltersNullTest() {
        var dayUserEntityCriteria = new DayUserCriteria();
        assertThat(dayUserEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void dayUserEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var dayUserEntityCriteria = new DayUserCriteria();

        setAllFilters(dayUserEntityCriteria);

        assertThat(dayUserEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void dayUserEntityCriteriaCopyCreatesNullFilterTest() {
        var dayUserEntityCriteria = new DayUserCriteria();
        var copy = dayUserEntityCriteria.copy();

        assertThat(dayUserEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(dayUserEntityCriteria)
        );
    }

    @Test
    void dayUserEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var dayUserEntityCriteria = new DayUserCriteria();
        setAllFilters(dayUserEntityCriteria);

        var copy = dayUserEntityCriteria.copy();

        assertThat(dayUserEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(dayUserEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var dayUserEntityCriteria = new DayUserCriteria();

        assertThat(dayUserEntityCriteria).hasToString("DayUserCriteria{}");
    }

    private static void setAllFilters(DayUserCriteria dayUserEntityCriteria) {
        dayUserEntityCriteria.id();
        dayUserEntityCriteria.assignmentsId();
        dayUserEntityCriteria.userId();
        dayUserEntityCriteria.dayPlanId();
        dayUserEntityCriteria.distinct();
    }

    private static Condition<DayUserCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getAssignmentsId()) &&
                condition.apply(criteria.getUserId()) &&
                condition.apply(criteria.getDayPlanId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<DayUserCriteria> copyFiltersAre(DayUserCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getAssignmentsId(), copy.getAssignmentsId()) &&
                condition.apply(criteria.getUserId(), copy.getUserId()) &&
                condition.apply(criteria.getDayPlanId(), copy.getDayPlanId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
