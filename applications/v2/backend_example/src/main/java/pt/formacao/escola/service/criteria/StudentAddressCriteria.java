package pt.formacao.escola.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link pt.formacao.escola.domain.StudentAddressEntity} entity. This class is used
 * in {@link pt.formacao.escola.web.rest.StudentAddressResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /student-addresses?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentAddressCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter adressLine;

    private StringFilter postalCode;

    private StringFilter city;

    private StringFilter country;

    private LongFilter studentId;

    private Boolean distinct;

    public StudentAddressCriteria() {}

    public StudentAddressCriteria(StudentAddressCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.adressLine = other.optionalAdressLine().map(StringFilter::copy).orElse(null);
        this.postalCode = other.optionalPostalCode().map(StringFilter::copy).orElse(null);
        this.city = other.optionalCity().map(StringFilter::copy).orElse(null);
        this.country = other.optionalCountry().map(StringFilter::copy).orElse(null);
        this.studentId = other.optionalStudentId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public StudentAddressCriteria copy() {
        return new StudentAddressCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public Optional<LongFilter> optionalId() {
        return Optional.ofNullable(id);
    }

    public LongFilter id() {
        if (id == null) {
            setId(new LongFilter());
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getAdressLine() {
        return adressLine;
    }

    public Optional<StringFilter> optionalAdressLine() {
        return Optional.ofNullable(adressLine);
    }

    public StringFilter adressLine() {
        if (adressLine == null) {
            setAdressLine(new StringFilter());
        }
        return adressLine;
    }

    public void setAdressLine(StringFilter adressLine) {
        this.adressLine = adressLine;
    }

    public StringFilter getPostalCode() {
        return postalCode;
    }

    public Optional<StringFilter> optionalPostalCode() {
        return Optional.ofNullable(postalCode);
    }

    public StringFilter postalCode() {
        if (postalCode == null) {
            setPostalCode(new StringFilter());
        }
        return postalCode;
    }

    public void setPostalCode(StringFilter postalCode) {
        this.postalCode = postalCode;
    }

    public StringFilter getCity() {
        return city;
    }

    public Optional<StringFilter> optionalCity() {
        return Optional.ofNullable(city);
    }

    public StringFilter city() {
        if (city == null) {
            setCity(new StringFilter());
        }
        return city;
    }

    public void setCity(StringFilter city) {
        this.city = city;
    }

    public StringFilter getCountry() {
        return country;
    }

    public Optional<StringFilter> optionalCountry() {
        return Optional.ofNullable(country);
    }

    public StringFilter country() {
        if (country == null) {
            setCountry(new StringFilter());
        }
        return country;
    }

    public void setCountry(StringFilter country) {
        this.country = country;
    }

    public LongFilter getStudentId() {
        return studentId;
    }

    public Optional<LongFilter> optionalStudentId() {
        return Optional.ofNullable(studentId);
    }

    public LongFilter studentId() {
        if (studentId == null) {
            setStudentId(new LongFilter());
        }
        return studentId;
    }

    public void setStudentId(LongFilter studentId) {
        this.studentId = studentId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public Optional<Boolean> optionalDistinct() {
        return Optional.ofNullable(distinct);
    }

    public Boolean distinct() {
        if (distinct == null) {
            setDistinct(true);
        }
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final StudentAddressCriteria that = (StudentAddressCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(adressLine, that.adressLine) &&
            Objects.equals(postalCode, that.postalCode) &&
            Objects.equals(city, that.city) &&
            Objects.equals(country, that.country) &&
            Objects.equals(studentId, that.studentId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, adressLine, postalCode, city, country, studentId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentAddressCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalAdressLine().map(f -> "adressLine=" + f + ", ").orElse("") +
            optionalPostalCode().map(f -> "postalCode=" + f + ", ").orElse("") +
            optionalCity().map(f -> "city=" + f + ", ").orElse("") +
            optionalCountry().map(f -> "country=" + f + ", ").orElse("") +
            optionalStudentId().map(f -> "studentId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
