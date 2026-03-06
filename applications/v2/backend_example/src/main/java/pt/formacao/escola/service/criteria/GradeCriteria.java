package pt.formacao.escola.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link pt.formacao.escola.domain.GradeEntity} entity. This class is used
 * in {@link pt.formacao.escola.web.rest.GradeResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /grades?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GradeCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter value;

    private BooleanFilter finished;

    private LongFilter studentId;

    private LongFilter disciplinaId;

    private Boolean distinct;

    public GradeCriteria() {}

    public GradeCriteria(GradeCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.value = other.optionalValue().map(IntegerFilter::copy).orElse(null);
        this.finished = other.optionalFinished().map(BooleanFilter::copy).orElse(null);
        this.studentId = other.optionalStudentId().map(LongFilter::copy).orElse(null);
        this.disciplinaId = other.optionalDisciplinaId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public GradeCriteria copy() {
        return new GradeCriteria(this);
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

    public IntegerFilter getValue() {
        return value;
    }

    public Optional<IntegerFilter> optionalValue() {
        return Optional.ofNullable(value);
    }

    public IntegerFilter value() {
        if (value == null) {
            setValue(new IntegerFilter());
        }
        return value;
    }

    public void setValue(IntegerFilter value) {
        this.value = value;
    }

    public BooleanFilter getFinished() {
        return finished;
    }

    public Optional<BooleanFilter> optionalFinished() {
        return Optional.ofNullable(finished);
    }

    public BooleanFilter finished() {
        if (finished == null) {
            setFinished(new BooleanFilter());
        }
        return finished;
    }

    public void setFinished(BooleanFilter finished) {
        this.finished = finished;
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

    public LongFilter getDisciplinaId() {
        return disciplinaId;
    }

    public Optional<LongFilter> optionalDisciplinaId() {
        return Optional.ofNullable(disciplinaId);
    }

    public LongFilter disciplinaId() {
        if (disciplinaId == null) {
            setDisciplinaId(new LongFilter());
        }
        return disciplinaId;
    }

    public void setDisciplinaId(LongFilter disciplinaId) {
        this.disciplinaId = disciplinaId;
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
        final GradeCriteria that = (GradeCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(value, that.value) &&
            Objects.equals(finished, that.finished) &&
            Objects.equals(studentId, that.studentId) &&
            Objects.equals(disciplinaId, that.disciplinaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, value, finished, studentId, disciplinaId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GradeCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalValue().map(f -> "value=" + f + ", ").orElse("") +
            optionalFinished().map(f -> "finished=" + f + ", ").orElse("") +
            optionalStudentId().map(f -> "studentId=" + f + ", ").orElse("") +
            optionalDisciplinaId().map(f -> "disciplinaId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
