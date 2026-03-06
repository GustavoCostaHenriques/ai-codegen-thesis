package pt.formacao.escola.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class CourseCriteriaTest {

    @Test
    void newCourseCriteriaHasAllFiltersNullTest() {
        var courseEntityCriteria = new CourseCriteria();
        assertThat(courseEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void courseEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var courseEntityCriteria = new CourseCriteria();

        setAllFilters(courseEntityCriteria);

        assertThat(courseEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void courseEntityCriteriaCopyCreatesNullFilterTest() {
        var courseEntityCriteria = new CourseCriteria();
        var copy = courseEntityCriteria.copy();

        assertThat(courseEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(courseEntityCriteria)
        );
    }

    @Test
    void courseEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var courseEntityCriteria = new CourseCriteria();
        setAllFilters(courseEntityCriteria);

        var copy = courseEntityCriteria.copy();

        assertThat(courseEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(courseEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var courseEntityCriteria = new CourseCriteria();

        assertThat(courseEntityCriteria).hasToString("CourseCriteria{}");
    }

    private static void setAllFilters(CourseCriteria courseEntityCriteria) {
        courseEntityCriteria.id();
        courseEntityCriteria.name();
        courseEntityCriteria.disciplinaId();
        courseEntityCriteria.studentId();
        courseEntityCriteria.distinct();
    }

    private static Condition<CourseCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getName()) &&
                condition.apply(criteria.getDisciplinaId()) &&
                condition.apply(criteria.getStudentId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<CourseCriteria> copyFiltersAre(CourseCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getName(), copy.getName()) &&
                condition.apply(criteria.getDisciplinaId(), copy.getDisciplinaId()) &&
                condition.apply(criteria.getStudentId(), copy.getStudentId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
