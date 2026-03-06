package com.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Week.
 */
@Entity
@Table(name = "week")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Week implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private WeekStatus status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "week")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "people", "week" }, allowSetters = true)
    private Set<DayPlan> dayPlans = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public Week id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public Week startDate(LocalDate startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public Week endDate(LocalDate endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public WeekStatus getStatus() {
        return this.status;
    }

    public Week status(WeekStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(WeekStatus status) {
        this.status = status;
    }

    public Set<DayPlan> getDayPlans() {
        return this.dayPlans;
    }

    public void setDayPlans(Set<DayPlan> dayPlans) {
        if (this.dayPlans != null) {
            this.dayPlans.forEach(i -> i.setWeek(null));
        }
        if (dayPlans != null) {
            dayPlans.forEach(i -> i.setWeek(this));
        }
        this.dayPlans = dayPlans;
    }

    public Week dayPlans(Set<DayPlan> dayPlans) {
        this.setDayPlans(dayPlans);
        return this;
    }

    public Week addDayPlans(DayPlan dayPlan) {
        this.dayPlans.add(dayPlan);
        dayPlan.setWeek(this);
        return this;
    }

    public Week removeDayPlans(DayPlan dayPlan) {
        this.dayPlans.remove(dayPlan);
        dayPlan.setWeek(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Week)) {
            return false;
        }
        return getId() != null && getId().equals(((Week) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Week{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
