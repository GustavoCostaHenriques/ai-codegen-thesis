package com.mycompany.weeklyplanning.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class AppUserCriteriaTest {

    @Test
    void newAppUserCriteriaHasAllFiltersNullTest() {
        var appUserEntityCriteria = new AppUserCriteria();
        assertThat(appUserEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void appUserEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var appUserEntityCriteria = new AppUserCriteria();

        setAllFilters(appUserEntityCriteria);

        assertThat(appUserEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void appUserEntityCriteriaCopyCreatesNullFilterTest() {
        var appUserEntityCriteria = new AppUserCriteria();
        var copy = appUserEntityCriteria.copy();

        assertThat(appUserEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(appUserEntityCriteria)
        );
    }

    @Test
    void appUserEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var appUserEntityCriteria = new AppUserCriteria();
        setAllFilters(appUserEntityCriteria);

        var copy = appUserEntityCriteria.copy();

        assertThat(appUserEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(appUserEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var appUserEntityCriteria = new AppUserCriteria();

        assertThat(appUserEntityCriteria).hasToString("AppUserCriteria{}");
    }

    private static void setAllFilters(AppUserCriteria appUserEntityCriteria) {
        appUserEntityCriteria.id();
        appUserEntityCriteria.name();
        appUserEntityCriteria.distinct();
    }

    private static Condition<AppUserCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria -> condition.apply(criteria.getId()) && condition.apply(criteria.getName()) && condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<AppUserCriteria> copyFiltersAre(AppUserCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getName(), copy.getName()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
