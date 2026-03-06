package pt.formacao.escola.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import pt.formacao.escola.domain.enumeration.GenreEnum;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link pt.formacao.escola.domain.StudentEntity} entity. This class is used
 * in {@link pt.formacao.escola.web.rest.StudentResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /students?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentCriteria implements Serializable, Criteria {

    /**
     * Class for filtering GenreEnum
     */
    public static class GenreEnumFilter extends Filter<GenreEnum> {

        public GenreEnumFilter() {}

        public GenreEnumFilter(GenreEnumFilter filter) {
            super(filter);
        }

        @Override
        public GenreEnumFilter copy() {
            return new GenreEnumFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private IntegerFilter age;

    private GenreEnumFilter genre;

    private LongFilter studentAddressId;

    private LongFilter gradeId;

    private LongFilter courseId;

    private Boolean distinct;

    public StudentCriteria() {}

    public StudentCriteria(StudentCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.name = other.optionalName().map(StringFilter::copy).orElse(null);
        this.age = other.optionalAge().map(IntegerFilter::copy).orElse(null);
        this.genre = other.optionalGenre().map(GenreEnumFilter::copy).orElse(null);
        this.studentAddressId = other.optionalStudentAddressId().map(LongFilter::copy).orElse(null);
        this.gradeId = other.optionalGradeId().map(LongFilter::copy).orElse(null);
        this.courseId = other.optionalCourseId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public StudentCriteria copy() {
        return new StudentCriteria(this);
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

    public StringFilter getName() {
        return name;
    }

    public Optional<StringFilter> optionalName() {
        return Optional.ofNullable(name);
    }

    public StringFilter name() {
        if (name == null) {
            setName(new StringFilter());
        }
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public IntegerFilter getAge() {
        return age;
    }

    public Optional<IntegerFilter> optionalAge() {
        return Optional.ofNullable(age);
    }

    public IntegerFilter age() {
        if (age == null) {
            setAge(new IntegerFilter());
        }
        return age;
    }

    public void setAge(IntegerFilter age) {
        this.age = age;
    }

    public GenreEnumFilter getGenre() {
        return genre;
    }

    public Optional<GenreEnumFilter> optionalGenre() {
        return Optional.ofNullable(genre);
    }

    public GenreEnumFilter genre() {
        if (genre == null) {
            setGenre(new GenreEnumFilter());
        }
        return genre;
    }

    public void setGenre(GenreEnumFilter genre) {
        this.genre = genre;
    }

    public LongFilter getStudentAddressId() {
        return studentAddressId;
    }

    public Optional<LongFilter> optionalStudentAddressId() {
        return Optional.ofNullable(studentAddressId);
    }

    public LongFilter studentAddressId() {
        if (studentAddressId == null) {
            setStudentAddressId(new LongFilter());
        }
        return studentAddressId;
    }

    public void setStudentAddressId(LongFilter studentAddressId) {
        this.studentAddressId = studentAddressId;
    }

    public LongFilter getGradeId() {
        return gradeId;
    }

    public Optional<LongFilter> optionalGradeId() {
        return Optional.ofNullable(gradeId);
    }

    public LongFilter gradeId() {
        if (gradeId == null) {
            setGradeId(new LongFilter());
        }
        return gradeId;
    }

    public void setGradeId(LongFilter gradeId) {
        this.gradeId = gradeId;
    }

    public LongFilter getCourseId() {
        return courseId;
    }

    public Optional<LongFilter> optionalCourseId() {
        return Optional.ofNullable(courseId);
    }

    public LongFilter courseId() {
        if (courseId == null) {
            setCourseId(new LongFilter());
        }
        return courseId;
    }

    public void setCourseId(LongFilter courseId) {
        this.courseId = courseId;
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
        final StudentCriteria that = (StudentCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(age, that.age) &&
            Objects.equals(genre, that.genre) &&
            Objects.equals(studentAddressId, that.studentAddressId) &&
            Objects.equals(gradeId, that.gradeId) &&
            Objects.equals(courseId, that.courseId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, age, genre, studentAddressId, gradeId, courseId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalName().map(f -> "name=" + f + ", ").orElse("") +
            optionalAge().map(f -> "age=" + f + ", ").orElse("") +
            optionalGenre().map(f -> "genre=" + f + ", ").orElse("") +
            optionalStudentAddressId().map(f -> "studentAddressId=" + f + ", ").orElse("") +
            optionalGradeId().map(f -> "gradeId=" + f + ", ").orElse("") +
            optionalCourseId().map(f -> "courseId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
