package com.mycompany.weeklyplanning.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class DayPlanCriteriaTest {

    @Test
    void newDayPlanCriteriaHasAllFiltersNullTest() {
        var dayPlanEntityCriteria = new DayPlanCriteria();
        assertThat(dayPlanEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void dayPlanEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var dayPlanEntityCriteria = new DayPlanCriteria();

        setAllFilters(dayPlanEntityCriteria);

        assertThat(dayPlanEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void dayPlanEntityCriteriaCopyCreatesNullFilterTest() {
        var dayPlanEntityCriteria = new DayPlanCriteria();
        var copy = dayPlanEntityCriteria.copy();

        assertThat(dayPlanEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(dayPlanEntityCriteria)
        );
    }

    @Test
    void dayPlanEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var dayPlanEntityCriteria = new DayPlanCriteria();
        setAllFilters(dayPlanEntityCriteria);

        var copy = dayPlanEntityCriteria.copy();

        assertThat(dayPlanEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(dayPlanEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var dayPlanEntityCriteria = new DayPlanCriteria();

        assertThat(dayPlanEntityCriteria).hasToString("DayPlanCriteria{}");
    }

    private static void setAllFilters(DayPlanCriteria dayPlanEntityCriteria) {
        dayPlanEntityCriteria.id();
        dayPlanEntityCriteria.date();
        dayPlanEntityCriteria.dayUsersId();
        dayPlanEntityCriteria.weekId();
        dayPlanEntityCriteria.distinct();
    }

    private static Condition<DayPlanCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getDate()) &&
                condition.apply(criteria.getDayUsersId()) &&
                condition.apply(criteria.getWeekId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<DayPlanCriteria> copyFiltersAre(DayPlanCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getDate(), copy.getDate()) &&
                condition.apply(criteria.getDayUsersId(), copy.getDayUsersId()) &&
                condition.apply(criteria.getWeekId(), copy.getWeekId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
