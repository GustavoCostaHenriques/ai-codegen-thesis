package pt.formacao.escola.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class StudentCriteriaTest {

    @Test
    void newStudentCriteriaHasAllFiltersNullTest() {
        var studentEntityCriteria = new StudentCriteria();
        assertThat(studentEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void studentEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var studentEntityCriteria = new StudentCriteria();

        setAllFilters(studentEntityCriteria);

        assertThat(studentEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void studentEntityCriteriaCopyCreatesNullFilterTest() {
        var studentEntityCriteria = new StudentCriteria();
        var copy = studentEntityCriteria.copy();

        assertThat(studentEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(studentEntityCriteria)
        );
    }

    @Test
    void studentEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var studentEntityCriteria = new StudentCriteria();
        setAllFilters(studentEntityCriteria);

        var copy = studentEntityCriteria.copy();

        assertThat(studentEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(studentEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var studentEntityCriteria = new StudentCriteria();

        assertThat(studentEntityCriteria).hasToString("StudentCriteria{}");
    }

    private static void setAllFilters(StudentCriteria studentEntityCriteria) {
        studentEntityCriteria.id();
        studentEntityCriteria.name();
        studentEntityCriteria.age();
        studentEntityCriteria.genre();
        studentEntityCriteria.studentAddressId();
        studentEntityCriteria.gradeId();
        studentEntityCriteria.courseId();
        studentEntityCriteria.distinct();
    }

    private static Condition<StudentCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getName()) &&
                condition.apply(criteria.getAge()) &&
                condition.apply(criteria.getGenre()) &&
                condition.apply(criteria.getStudentAddressId()) &&
                condition.apply(criteria.getGradeId()) &&
                condition.apply(criteria.getCourseId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<StudentCriteria> copyFiltersAre(StudentCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getName(), copy.getName()) &&
                condition.apply(criteria.getAge(), copy.getAge()) &&
                condition.apply(criteria.getGenre(), copy.getGenre()) &&
                condition.apply(criteria.getStudentAddressId(), copy.getStudentAddressId()) &&
                condition.apply(criteria.getGradeId(), copy.getGradeId()) &&
                condition.apply(criteria.getCourseId(), copy.getCourseId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
