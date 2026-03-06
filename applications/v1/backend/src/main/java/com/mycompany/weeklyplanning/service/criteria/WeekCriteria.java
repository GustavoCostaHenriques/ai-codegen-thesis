package com.mycompany.weeklyplanning.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.mycompany.weeklyplanning.domain.WeekEntity} entity. This class is used
 * in {@link com.mycompany.weeklyplanning.web.rest.WeekResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /weeks?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WeekCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter label;

    private LocalDateFilter startDate;

    private LocalDateFilter endDate;

    private LongFilter dayPlansId;

    private Boolean distinct;

    public WeekCriteria() {}

    public WeekCriteria(WeekCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.label = other.optionalLabel().map(StringFilter::copy).orElse(null);
        this.startDate = other.optionalStartDate().map(LocalDateFilter::copy).orElse(null);
        this.endDate = other.optionalEndDate().map(LocalDateFilter::copy).orElse(null);
        this.dayPlansId = other.optionalDayPlansId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public WeekCriteria copy() {
        return new WeekCriteria(this);
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

    public StringFilter getLabel() {
        return label;
    }

    public Optional<StringFilter> optionalLabel() {
        return Optional.ofNullable(label);
    }

    public StringFilter label() {
        if (label == null) {
            setLabel(new StringFilter());
        }
        return label;
    }

    public void setLabel(StringFilter label) {
        this.label = label;
    }

    public LocalDateFilter getStartDate() {
        return startDate;
    }

    public Optional<LocalDateFilter> optionalStartDate() {
        return Optional.ofNullable(startDate);
    }

    public LocalDateFilter startDate() {
        if (startDate == null) {
            setStartDate(new LocalDateFilter());
        }
        return startDate;
    }

    public void setStartDate(LocalDateFilter startDate) {
        this.startDate = startDate;
    }

    public LocalDateFilter getEndDate() {
        return endDate;
    }

    public Optional<LocalDateFilter> optionalEndDate() {
        return Optional.ofNullable(endDate);
    }

    public LocalDateFilter endDate() {
        if (endDate == null) {
            setEndDate(new LocalDateFilter());
        }
        return endDate;
    }

    public void setEndDate(LocalDateFilter endDate) {
        this.endDate = endDate;
    }

    public LongFilter getDayPlansId() {
        return dayPlansId;
    }

    public Optional<LongFilter> optionalDayPlansId() {
        return Optional.ofNullable(dayPlansId);
    }

    public LongFilter dayPlansId() {
        if (dayPlansId == null) {
            setDayPlansId(new LongFilter());
        }
        return dayPlansId;
    }

    public void setDayPlansId(LongFilter dayPlansId) {
        this.dayPlansId = dayPlansId;
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
        final WeekCriteria that = (WeekCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(label, that.label) &&
            Objects.equals(startDate, that.startDate) &&
            Objects.equals(endDate, that.endDate) &&
            Objects.equals(dayPlansId, that.dayPlansId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, label, startDate, endDate, dayPlansId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WeekCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalLabel().map(f -> "label=" + f + ", ").orElse("") +
            optionalStartDate().map(f -> "startDate=" + f + ", ").orElse("") +
            optionalEndDate().map(f -> "endDate=" + f + ", ").orElse("") +
            optionalDayPlansId().map(f -> "dayPlansId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
