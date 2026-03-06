package com.mycompany.weeklyplanning.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.mycompany.weeklyplanning.domain.TaskEntity} entity. This class is used
 * in {@link com.mycompany.weeklyplanning.web.rest.TaskResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tasks?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter text;

    private LongFilter dayUserProjectId;

    private Boolean distinct;

    public TaskCriteria() {}

    public TaskCriteria(TaskCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.text = other.optionalText().map(StringFilter::copy).orElse(null);
        this.dayUserProjectId = other.optionalDayUserProjectId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public TaskCriteria copy() {
        return new TaskCriteria(this);
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

    public StringFilter getText() {
        return text;
    }

    public Optional<StringFilter> optionalText() {
        return Optional.ofNullable(text);
    }

    public StringFilter text() {
        if (text == null) {
            setText(new StringFilter());
        }
        return text;
    }

    public void setText(StringFilter text) {
        this.text = text;
    }

    public LongFilter getDayUserProjectId() {
        return dayUserProjectId;
    }

    public Optional<LongFilter> optionalDayUserProjectId() {
        return Optional.ofNullable(dayUserProjectId);
    }

    public LongFilter dayUserProjectId() {
        if (dayUserProjectId == null) {
            setDayUserProjectId(new LongFilter());
        }
        return dayUserProjectId;
    }

    public void setDayUserProjectId(LongFilter dayUserProjectId) {
        this.dayUserProjectId = dayUserProjectId;
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
        final TaskCriteria that = (TaskCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(text, that.text) &&
            Objects.equals(dayUserProjectId, that.dayUserProjectId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, dayUserProjectId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalText().map(f -> "text=" + f + ", ").orElse("") +
            optionalDayUserProjectId().map(f -> "dayUserProjectId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
