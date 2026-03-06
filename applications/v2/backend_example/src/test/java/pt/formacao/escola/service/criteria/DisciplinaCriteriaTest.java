package pt.formacao.escola.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class DisciplinaCriteriaTest {

    @Test
    void newDisciplinaCriteriaHasAllFiltersNullTest() {
        var disciplinaEntityCriteria = new DisciplinaCriteria();
        assertThat(disciplinaEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void disciplinaEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var disciplinaEntityCriteria = new DisciplinaCriteria();

        setAllFilters(disciplinaEntityCriteria);

        assertThat(disciplinaEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void disciplinaEntityCriteriaCopyCreatesNullFilterTest() {
        var disciplinaEntityCriteria = new DisciplinaCriteria();
        var copy = disciplinaEntityCriteria.copy();

        assertThat(disciplinaEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(disciplinaEntityCriteria)
        );
    }

    @Test
    void disciplinaEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var disciplinaEntityCriteria = new DisciplinaCriteria();
        setAllFilters(disciplinaEntityCriteria);

        var copy = disciplinaEntityCriteria.copy();

        assertThat(disciplinaEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(disciplinaEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var disciplinaEntityCriteria = new DisciplinaCriteria();

        assertThat(disciplinaEntityCriteria).hasToString("DisciplinaCriteria{}");
    }

    private static void setAllFilters(DisciplinaCriteria disciplinaEntityCriteria) {
        disciplinaEntityCriteria.id();
        disciplinaEntityCriteria.name();
        disciplinaEntityCriteria.capacity();
        disciplinaEntityCriteria.credits();
        disciplinaEntityCriteria.teacherName();
        disciplinaEntityCriteria.gradeId();
        disciplinaEntityCriteria.courseId();
        disciplinaEntityCriteria.distinct();
    }

    private static Condition<DisciplinaCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getName()) &&
                condition.apply(criteria.getCapacity()) &&
                condition.apply(criteria.getCredits()) &&
                condition.apply(criteria.getTeacherName()) &&
                condition.apply(criteria.getGradeId()) &&
                condition.apply(criteria.getCourseId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<DisciplinaCriteria> copyFiltersAre(DisciplinaCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getName(), copy.getName()) &&
                condition.apply(criteria.getCapacity(), copy.getCapacity()) &&
                condition.apply(criteria.getCredits(), copy.getCredits()) &&
                condition.apply(criteria.getTeacherName(), copy.getTeacherName()) &&
                condition.apply(criteria.getGradeId(), copy.getGradeId()) &&
                condition.apply(criteria.getCourseId(), copy.getCourseId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
