package pt.formacao.escola.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link pt.formacao.escola.domain.DisciplinaEntity} entity. This class is used
 * in {@link pt.formacao.escola.web.rest.DisciplinaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /disciplinas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DisciplinaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private IntegerFilter capacity;

    private IntegerFilter credits;

    private StringFilter teacherName;

    private LongFilter gradeId;

    private LongFilter courseId;

    private Boolean distinct;

    public DisciplinaCriteria() {}

    public DisciplinaCriteria(DisciplinaCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.name = other.optionalName().map(StringFilter::copy).orElse(null);
        this.capacity = other.optionalCapacity().map(IntegerFilter::copy).orElse(null);
        this.credits = other.optionalCredits().map(IntegerFilter::copy).orElse(null);
        this.teacherName = other.optionalTeacherName().map(StringFilter::copy).orElse(null);
        this.gradeId = other.optionalGradeId().map(LongFilter::copy).orElse(null);
        this.courseId = other.optionalCourseId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public DisciplinaCriteria copy() {
        return new DisciplinaCriteria(this);
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

    public IntegerFilter getCapacity() {
        return capacity;
    }

    public Optional<IntegerFilter> optionalCapacity() {
        return Optional.ofNullable(capacity);
    }

    public IntegerFilter capacity() {
        if (capacity == null) {
            setCapacity(new IntegerFilter());
        }
        return capacity;
    }

    public void setCapacity(IntegerFilter capacity) {
        this.capacity = capacity;
    }

    public IntegerFilter getCredits() {
        return credits;
    }

    public Optional<IntegerFilter> optionalCredits() {
        return Optional.ofNullable(credits);
    }

    public IntegerFilter credits() {
        if (credits == null) {
            setCredits(new IntegerFilter());
        }
        return credits;
    }

    public void setCredits(IntegerFilter credits) {
        this.credits = credits;
    }

    public StringFilter getTeacherName() {
        return teacherName;
    }

    public Optional<StringFilter> optionalTeacherName() {
        return Optional.ofNullable(teacherName);
    }

    public StringFilter teacherName() {
        if (teacherName == null) {
            setTeacherName(new StringFilter());
        }
        return teacherName;
    }

    public void setTeacherName(StringFilter teacherName) {
        this.teacherName = teacherName;
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
        final DisciplinaCriteria that = (DisciplinaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(capacity, that.capacity) &&
            Objects.equals(credits, that.credits) &&
            Objects.equals(teacherName, that.teacherName) &&
            Objects.equals(gradeId, that.gradeId) &&
            Objects.equals(courseId, that.courseId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, capacity, credits, teacherName, gradeId, courseId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DisciplinaCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalName().map(f -> "name=" + f + ", ").orElse("") +
            optionalCapacity().map(f -> "capacity=" + f + ", ").orElse("") +
            optionalCredits().map(f -> "credits=" + f + ", ").orElse("") +
            optionalTeacherName().map(f -> "teacherName=" + f + ", ").orElse("") +
            optionalGradeId().map(f -> "gradeId=" + f + ", ").orElse("") +
            optionalCourseId().map(f -> "courseId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
