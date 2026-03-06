package com.mycompany.weeklyplanning.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class ProjectCriteriaTest {

    @Test
    void newProjectCriteriaHasAllFiltersNullTest() {
        var projectEntityCriteria = new ProjectCriteria();
        assertThat(projectEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void projectEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var projectEntityCriteria = new ProjectCriteria();

        setAllFilters(projectEntityCriteria);

        assertThat(projectEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void projectEntityCriteriaCopyCreatesNullFilterTest() {
        var projectEntityCriteria = new ProjectCriteria();
        var copy = projectEntityCriteria.copy();

        assertThat(projectEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(projectEntityCriteria)
        );
    }

    @Test
    void projectEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var projectEntityCriteria = new ProjectCriteria();
        setAllFilters(projectEntityCriteria);

        var copy = projectEntityCriteria.copy();

        assertThat(projectEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(projectEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var projectEntityCriteria = new ProjectCriteria();

        assertThat(projectEntityCriteria).hasToString("ProjectCriteria{}");
    }

    private static void setAllFilters(ProjectCriteria projectEntityCriteria) {
        projectEntityCriteria.id();
        projectEntityCriteria.name();
        projectEntityCriteria.assignmentsId();
        projectEntityCriteria.distinct();
    }

    private static Condition<ProjectCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getName()) &&
                condition.apply(criteria.getAssignmentsId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<ProjectCriteria> copyFiltersAre(ProjectCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getName(), copy.getName()) &&
                condition.apply(criteria.getAssignmentsId(), copy.getAssignmentsId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
