package com.mycompany.weeklyplanning.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.mycompany.weeklyplanning.domain.DayPlanEntity} entity. This class is used
 * in {@link com.mycompany.weeklyplanning.web.rest.DayPlanResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /day-plans?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayPlanCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LocalDateFilter date;

    private LongFilter dayUsersId;

    private LongFilter weekId;

    private Boolean distinct;

    public DayPlanCriteria() {}

    public DayPlanCriteria(DayPlanCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.date = other.optionalDate().map(LocalDateFilter::copy).orElse(null);
        this.dayUsersId = other.optionalDayUsersId().map(LongFilter::copy).orElse(null);
        this.weekId = other.optionalWeekId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public DayPlanCriteria copy() {
        return new DayPlanCriteria(this);
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

    public LocalDateFilter getDate() {
        return date;
    }

    public Optional<LocalDateFilter> optionalDate() {
        return Optional.ofNullable(date);
    }

    public LocalDateFilter date() {
        if (date == null) {
            setDate(new LocalDateFilter());
        }
        return date;
    }

    public void setDate(LocalDateFilter date) {
        this.date = date;
    }

    public LongFilter getDayUsersId() {
        return dayUsersId;
    }

    public Optional<LongFilter> optionalDayUsersId() {
        return Optional.ofNullable(dayUsersId);
    }

    public LongFilter dayUsersId() {
        if (dayUsersId == null) {
            setDayUsersId(new LongFilter());
        }
        return dayUsersId;
    }

    public void setDayUsersId(LongFilter dayUsersId) {
        this.dayUsersId = dayUsersId;
    }

    public LongFilter getWeekId() {
        return weekId;
    }

    public Optional<LongFilter> optionalWeekId() {
        return Optional.ofNullable(weekId);
    }

    public LongFilter weekId() {
        if (weekId == null) {
            setWeekId(new LongFilter());
        }
        return weekId;
    }

    public void setWeekId(LongFilter weekId) {
        this.weekId = weekId;
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
        final DayPlanCriteria that = (DayPlanCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(date, that.date) &&
            Objects.equals(dayUsersId, that.dayUsersId) &&
            Objects.equals(weekId, that.weekId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, dayUsersId, weekId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayPlanCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalDate().map(f -> "date=" + f + ", ").orElse("") +
            optionalDayUsersId().map(f -> "dayUsersId=" + f + ", ").orElse("") +
            optionalWeekId().map(f -> "weekId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
