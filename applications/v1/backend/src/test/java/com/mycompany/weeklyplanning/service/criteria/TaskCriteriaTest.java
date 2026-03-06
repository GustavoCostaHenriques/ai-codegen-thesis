package com.mycompany.weeklyplanning.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class TaskCriteriaTest {

    @Test
    void newTaskCriteriaHasAllFiltersNullTest() {
        var taskEntityCriteria = new TaskCriteria();
        assertThat(taskEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void taskEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var taskEntityCriteria = new TaskCriteria();

        setAllFilters(taskEntityCriteria);

        assertThat(taskEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void taskEntityCriteriaCopyCreatesNullFilterTest() {
        var taskEntityCriteria = new TaskCriteria();
        var copy = taskEntityCriteria.copy();

        assertThat(taskEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(taskEntityCriteria)
        );
    }

    @Test
    void taskEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var taskEntityCriteria = new TaskCriteria();
        setAllFilters(taskEntityCriteria);

        var copy = taskEntityCriteria.copy();

        assertThat(taskEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(taskEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var taskEntityCriteria = new TaskCriteria();

        assertThat(taskEntityCriteria).hasToString("TaskCriteria{}");
    }

    private static void setAllFilters(TaskCriteria taskEntityCriteria) {
        taskEntityCriteria.id();
        taskEntityCriteria.text();
        taskEntityCriteria.dayUserProjectId();
        taskEntityCriteria.distinct();
    }

    private static Condition<TaskCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getText()) &&
                condition.apply(criteria.getDayUserProjectId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<TaskCriteria> copyFiltersAre(TaskCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getText(), copy.getText()) &&
                condition.apply(criteria.getDayUserProjectId(), copy.getDayUserProjectId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
