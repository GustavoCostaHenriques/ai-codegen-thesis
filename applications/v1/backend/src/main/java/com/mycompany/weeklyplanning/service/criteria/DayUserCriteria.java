package com.mycompany.weeklyplanning.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.mycompany.weeklyplanning.domain.DayUserEntity} entity. This class is used
 * in {@link com.mycompany.weeklyplanning.web.rest.DayUserResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /day-users?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayUserCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter assignmentsId;

    private LongFilter userId;

    private LongFilter dayPlanId;

    private Boolean distinct;

    public DayUserCriteria() {}

    public DayUserCriteria(DayUserCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.assignmentsId = other.optionalAssignmentsId().map(LongFilter::copy).orElse(null);
        this.userId = other.optionalUserId().map(LongFilter::copy).orElse(null);
        this.dayPlanId = other.optionalDayPlanId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public DayUserCriteria copy() {
        return new DayUserCriteria(this);
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

    public LongFilter getAssignmentsId() {
        return assignmentsId;
    }

    public Optional<LongFilter> optionalAssignmentsId() {
        return Optional.ofNullable(assignmentsId);
    }

    public LongFilter assignmentsId() {
        if (assignmentsId == null) {
            setAssignmentsId(new LongFilter());
        }
        return assignmentsId;
    }

    public void setAssignmentsId(LongFilter assignmentsId) {
        this.assignmentsId = assignmentsId;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public Optional<LongFilter> optionalUserId() {
        return Optional.ofNullable(userId);
    }

    public LongFilter userId() {
        if (userId == null) {
            setUserId(new LongFilter());
        }
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getDayPlanId() {
        return dayPlanId;
    }

    public Optional<LongFilter> optionalDayPlanId() {
        return Optional.ofNullable(dayPlanId);
    }

    public LongFilter dayPlanId() {
        if (dayPlanId == null) {
            setDayPlanId(new LongFilter());
        }
        return dayPlanId;
    }

    public void setDayPlanId(LongFilter dayPlanId) {
        this.dayPlanId = dayPlanId;
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
        final DayUserCriteria that = (DayUserCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(assignmentsId, that.assignmentsId) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(dayPlanId, that.dayPlanId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, assignmentsId, userId, dayPlanId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayUserCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalAssignmentsId().map(f -> "assignmentsId=" + f + ", ").orElse("") +
            optionalUserId().map(f -> "userId=" + f + ", ").orElse("") +
            optionalDayPlanId().map(f -> "dayPlanId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
