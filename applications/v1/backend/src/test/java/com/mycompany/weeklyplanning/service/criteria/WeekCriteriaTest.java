package com.mycompany.weeklyplanning.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class WeekCriteriaTest {

    @Test
    void newWeekCriteriaHasAllFiltersNullTest() {
        var weekEntityCriteria = new WeekCriteria();
        assertThat(weekEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void weekEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var weekEntityCriteria = new WeekCriteria();

        setAllFilters(weekEntityCriteria);

        assertThat(weekEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void weekEntityCriteriaCopyCreatesNullFilterTest() {
        var weekEntityCriteria = new WeekCriteria();
        var copy = weekEntityCriteria.copy();

        assertThat(weekEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(weekEntityCriteria)
        );
    }

    @Test
    void weekEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var weekEntityCriteria = new WeekCriteria();
        setAllFilters(weekEntityCriteria);

        var copy = weekEntityCriteria.copy();

        assertThat(weekEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(weekEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var weekEntityCriteria = new WeekCriteria();

        assertThat(weekEntityCriteria).hasToString("WeekCriteria{}");
    }

    private static void setAllFilters(WeekCriteria weekEntityCriteria) {
        weekEntityCriteria.id();
        weekEntityCriteria.label();
        weekEntityCriteria.startDate();
        weekEntityCriteria.endDate();
        weekEntityCriteria.dayPlansId();
        weekEntityCriteria.distinct();
    }

    private static Condition<WeekCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getLabel()) &&
                condition.apply(criteria.getStartDate()) &&
                condition.apply(criteria.getEndDate()) &&
                condition.apply(criteria.getDayPlansId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<WeekCriteria> copyFiltersAre(WeekCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getLabel(), copy.getLabel()) &&
                condition.apply(criteria.getStartDate(), copy.getStartDate()) &&
                condition.apply(criteria.getEndDate(), copy.getEndDate()) &&
                condition.apply(criteria.getDayPlansId(), copy.getDayPlansId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
