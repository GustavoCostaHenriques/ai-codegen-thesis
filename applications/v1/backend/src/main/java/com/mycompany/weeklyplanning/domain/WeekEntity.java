package com.mycompany.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.weeklyplanning.service.api.dto.WeekStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A WeekEntity.
 */
@Entity
@Table(name = "week")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WeekEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "label", nullable = false)
    private String label;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private WeekStatus status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "week")
    @JsonIgnoreProperties(value = { "dayUsers", "week" }, allowSetters = true)
    private Set<DayPlanEntity> dayPlans = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public WeekEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return this.label;
    }

    public WeekEntity label(String label) {
        this.setLabel(label);
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public WeekEntity startDate(LocalDate startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public WeekEntity endDate(LocalDate endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public WeekStatus getStatus() {
        return this.status;
    }

    public WeekEntity status(WeekStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(WeekStatus status) {
        this.status = status;
    }

    public Set<DayPlanEntity> getDayPlans() {
        return this.dayPlans;
    }

    public void setDayPlans(Set<DayPlanEntity> dayPlans) {
        if (this.dayPlans != null) {
            this.dayPlans.forEach(i -> i.setWeek(null));
        }
        if (dayPlans != null) {
            dayPlans.forEach(i -> i.setWeek(this));
        }
        this.dayPlans = dayPlans;
    }

    public WeekEntity dayPlans(Set<DayPlanEntity> dayPlans) {
        this.setDayPlans(dayPlans);
        return this;
    }

    public WeekEntity addDayPlans(DayPlanEntity dayPlan) {
        this.dayPlans.add(dayPlan);
        dayPlan.setWeek(this);
        return this;
    }

    public WeekEntity removeDayPlans(DayPlanEntity dayPlan) {
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
        if (!(o instanceof WeekEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((WeekEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WeekEntity{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
