package com.mycompany.weeklyplanning.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class DayUserProjectCriteriaTest {

    @Test
    void newDayUserProjectCriteriaHasAllFiltersNullTest() {
        var dayUserProjectEntityCriteria = new DayUserProjectCriteria();
        assertThat(dayUserProjectEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void dayUserProjectEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var dayUserProjectEntityCriteria = new DayUserProjectCriteria();

        setAllFilters(dayUserProjectEntityCriteria);

        assertThat(dayUserProjectEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void dayUserProjectEntityCriteriaCopyCreatesNullFilterTest() {
        var dayUserProjectEntityCriteria = new DayUserProjectCriteria();
        var copy = dayUserProjectEntityCriteria.copy();

        assertThat(dayUserProjectEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(dayUserProjectEntityCriteria)
        );
    }

    @Test
    void dayUserProjectEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var dayUserProjectEntityCriteria = new DayUserProjectCriteria();
        setAllFilters(dayUserProjectEntityCriteria);

        var copy = dayUserProjectEntityCriteria.copy();

        assertThat(dayUserProjectEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(dayUserProjectEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var dayUserProjectEntityCriteria = new DayUserProjectCriteria();

        assertThat(dayUserProjectEntityCriteria).hasToString("DayUserProjectCriteria{}");
    }

    private static void setAllFilters(DayUserProjectCriteria dayUserProjectEntityCriteria) {
        dayUserProjectEntityCriteria.id();
        dayUserProjectEntityCriteria.tasksId();
        dayUserProjectEntityCriteria.dayUserId();
        dayUserProjectEntityCriteria.projectId();
        dayUserProjectEntityCriteria.distinct();
    }

    private static Condition<DayUserProjectCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getTasksId()) &&
                condition.apply(criteria.getDayUserId()) &&
                condition.apply(criteria.getProjectId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<DayUserProjectCriteria> copyFiltersAre(
        DayUserProjectCriteria copy,
        BiFunction<Object, Object, Boolean> condition
    ) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getTasksId(), copy.getTasksId()) &&
                condition.apply(criteria.getDayUserId(), copy.getDayUserId()) &&
                condition.apply(criteria.getProjectId(), copy.getProjectId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
