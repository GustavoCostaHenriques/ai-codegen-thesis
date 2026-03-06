package com.mycompany.weeklyplanning.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.mycompany.weeklyplanning.domain.DayUserProjectEntity} entity. This class is used
 * in {@link com.mycompany.weeklyplanning.web.rest.DayUserProjectResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /day-user-projects?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayUserProjectCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter tasksId;

    private LongFilter dayUserId;

    private LongFilter projectId;

    private Boolean distinct;

    public DayUserProjectCriteria() {}

    public DayUserProjectCriteria(DayUserProjectCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.tasksId = other.optionalTasksId().map(LongFilter::copy).orElse(null);
        this.dayUserId = other.optionalDayUserId().map(LongFilter::copy).orElse(null);
        this.projectId = other.optionalProjectId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public DayUserProjectCriteria copy() {
        return new DayUserProjectCriteria(this);
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

    public LongFilter getTasksId() {
        return tasksId;
    }

    public Optional<LongFilter> optionalTasksId() {
        return Optional.ofNullable(tasksId);
    }

    public LongFilter tasksId() {
        if (tasksId == null) {
            setTasksId(new LongFilter());
        }
        return tasksId;
    }

    public void setTasksId(LongFilter tasksId) {
        this.tasksId = tasksId;
    }

    public LongFilter getDayUserId() {
        return dayUserId;
    }

    public Optional<LongFilter> optionalDayUserId() {
        return Optional.ofNullable(dayUserId);
    }

    public LongFilter dayUserId() {
        if (dayUserId == null) {
            setDayUserId(new LongFilter());
        }
        return dayUserId;
    }

    public void setDayUserId(LongFilter dayUserId) {
        this.dayUserId = dayUserId;
    }

    public LongFilter getProjectId() {
        return projectId;
    }

    public Optional<LongFilter> optionalProjectId() {
        return Optional.ofNullable(projectId);
    }

    public LongFilter projectId() {
        if (projectId == null) {
            setProjectId(new LongFilter());
        }
        return projectId;
    }

    public void setProjectId(LongFilter projectId) {
        this.projectId = projectId;
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
        final DayUserProjectCriteria that = (DayUserProjectCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(tasksId, that.tasksId) &&
            Objects.equals(dayUserId, that.dayUserId) &&
            Objects.equals(projectId, that.projectId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, tasksId, dayUserId, projectId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayUserProjectCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalTasksId().map(f -> "tasksId=" + f + ", ").orElse("") +
            optionalDayUserId().map(f -> "dayUserId=" + f + ", ").orElse("") +
            optionalProjectId().map(f -> "projectId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
