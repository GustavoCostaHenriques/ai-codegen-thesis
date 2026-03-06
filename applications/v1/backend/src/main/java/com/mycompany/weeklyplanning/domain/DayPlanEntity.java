package com.mycompany.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A DayPlanEntity.
 */
@Entity
@Table(name = "day_plan")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayPlanEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dayPlan")
    @JsonIgnoreProperties(value = { "assignments", "user", "dayPlan" }, allowSetters = true)
    private Set<DayUserEntity> dayUsers = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "dayPlans" }, allowSetters = true)
    private WeekEntity week;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DayPlanEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public DayPlanEntity date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<DayUserEntity> getDayUsers() {
        return this.dayUsers;
    }

    public void setDayUsers(Set<DayUserEntity> dayUsers) {
        if (this.dayUsers != null) {
            this.dayUsers.forEach(i -> i.setDayPlan(null));
        }
        if (dayUsers != null) {
            dayUsers.forEach(i -> i.setDayPlan(this));
        }
        this.dayUsers = dayUsers;
    }

    public DayPlanEntity dayUsers(Set<DayUserEntity> dayUsers) {
        this.setDayUsers(dayUsers);
        return this;
    }

    public DayPlanEntity addDayUsers(DayUserEntity dayUser) {
        this.dayUsers.add(dayUser);
        dayUser.setDayPlan(this);
        return this;
    }

    public DayPlanEntity removeDayUsers(DayUserEntity dayUser) {
        this.dayUsers.remove(dayUser);
        dayUser.setDayPlan(null);
        return this;
    }

    public WeekEntity getWeek() {
        return this.week;
    }

    public void setWeek(WeekEntity week) {
        this.week = week;
    }

    public DayPlanEntity week(WeekEntity week) {
        this.setWeek(week);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayPlanEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((DayPlanEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayPlanEntity{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
