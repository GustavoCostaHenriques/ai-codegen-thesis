package pt.formacao.escola.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class GradeCriteriaTest {

    @Test
    void newGradeCriteriaHasAllFiltersNullTest() {
        var gradeEntityCriteria = new GradeCriteria();
        assertThat(gradeEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void gradeEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var gradeEntityCriteria = new GradeCriteria();

        setAllFilters(gradeEntityCriteria);

        assertThat(gradeEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void gradeEntityCriteriaCopyCreatesNullFilterTest() {
        var gradeEntityCriteria = new GradeCriteria();
        var copy = gradeEntityCriteria.copy();

        assertThat(gradeEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(gradeEntityCriteria)
        );
    }

    @Test
    void gradeEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var gradeEntityCriteria = new GradeCriteria();
        setAllFilters(gradeEntityCriteria);

        var copy = gradeEntityCriteria.copy();

        assertThat(gradeEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(gradeEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var gradeEntityCriteria = new GradeCriteria();

        assertThat(gradeEntityCriteria).hasToString("GradeCriteria{}");
    }

    private static void setAllFilters(GradeCriteria gradeEntityCriteria) {
        gradeEntityCriteria.id();
        gradeEntityCriteria.value();
        gradeEntityCriteria.finished();
        gradeEntityCriteria.studentId();
        gradeEntityCriteria.disciplinaId();
        gradeEntityCriteria.distinct();
    }

    private static Condition<GradeCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getValue()) &&
                condition.apply(criteria.getFinished()) &&
                condition.apply(criteria.getStudentId()) &&
                condition.apply(criteria.getDisciplinaId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<GradeCriteria> copyFiltersAre(GradeCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getValue(), copy.getValue()) &&
                condition.apply(criteria.getFinished(), copy.getFinished()) &&
                condition.apply(criteria.getStudentId(), copy.getStudentId()) &&
                condition.apply(criteria.getDisciplinaId(), copy.getDisciplinaId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
