package pt.formacao.escola.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class StudentAddressCriteriaTest {

    @Test
    void newStudentAddressCriteriaHasAllFiltersNullTest() {
        var studentAddressEntityCriteria = new StudentAddressCriteria();
        assertThat(studentAddressEntityCriteria).is(criteriaFiltersAre(Objects::isNull));
    }

    @Test
    void studentAddressEntityCriteriaFluentMethodsCreatesFiltersTest() {
        var studentAddressEntityCriteria = new StudentAddressCriteria();

        setAllFilters(studentAddressEntityCriteria);

        assertThat(studentAddressEntityCriteria).is(criteriaFiltersAre(Objects::nonNull));
    }

    @Test
    void studentAddressEntityCriteriaCopyCreatesNullFilterTest() {
        var studentAddressEntityCriteria = new StudentAddressCriteria();
        var copy = studentAddressEntityCriteria.copy();

        assertThat(studentAddressEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::isNull)),
            criteria -> assertThat(criteria).isEqualTo(studentAddressEntityCriteria)
        );
    }

    @Test
    void studentAddressEntityCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var studentAddressEntityCriteria = new StudentAddressCriteria();
        setAllFilters(studentAddressEntityCriteria);

        var copy = studentAddressEntityCriteria.copy();

        assertThat(studentAddressEntityCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(Objects::nonNull)),
            criteria -> assertThat(criteria).isEqualTo(studentAddressEntityCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var studentAddressEntityCriteria = new StudentAddressCriteria();

        assertThat(studentAddressEntityCriteria).hasToString("StudentAddressCriteria{}");
    }

    private static void setAllFilters(StudentAddressCriteria studentAddressEntityCriteria) {
        studentAddressEntityCriteria.id();
        studentAddressEntityCriteria.adressLine();
        studentAddressEntityCriteria.postalCode();
        studentAddressEntityCriteria.city();
        studentAddressEntityCriteria.country();
        studentAddressEntityCriteria.studentId();
        studentAddressEntityCriteria.distinct();
    }

    private static Condition<StudentAddressCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getAdressLine()) &&
                condition.apply(criteria.getPostalCode()) &&
                condition.apply(criteria.getCity()) &&
                condition.apply(criteria.getCountry()) &&
                condition.apply(criteria.getStudentId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<StudentAddressCriteria> copyFiltersAre(
        StudentAddressCriteria copy,
        BiFunction<Object, Object, Boolean> condition
    ) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getAdressLine(), copy.getAdressLine()) &&
                condition.apply(criteria.getPostalCode(), copy.getPostalCode()) &&
                condition.apply(criteria.getCity(), copy.getCity()) &&
                condition.apply(criteria.getCountry(), copy.getCountry()) &&
                condition.apply(criteria.getStudentId(), copy.getStudentId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
