package com.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A DayPlan.
 */
@Entity
@Table(name = "day_plan")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dayPlan")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "projects", "person", "dayPlan" }, allowSetters = true)
    private Set<DayPerson> people = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "dayPlans" }, allowSetters = true)
    private Week week;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public DayPlan id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public DayPlan date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<DayPerson> getPeople() {
        return this.people;
    }

    public void setPeople(Set<DayPerson> dayPeople) {
        if (this.people != null) {
            this.people.forEach(i -> i.setDayPlan(null));
        }
        if (dayPeople != null) {
            dayPeople.forEach(i -> i.setDayPlan(this));
        }
        this.people = dayPeople;
    }

    public DayPlan people(Set<DayPerson> dayPeople) {
        this.setPeople(dayPeople);
        return this;
    }

    public DayPlan addPeople(DayPerson dayPerson) {
        this.people.add(dayPerson);
        dayPerson.setDayPlan(this);
        return this;
    }

    public DayPlan removePeople(DayPerson dayPerson) {
        this.people.remove(dayPerson);
        dayPerson.setDayPlan(null);
        return this;
    }

    public Week getWeek() {
        return this.week;
    }

    public void setWeek(Week week) {
        this.week = week;
    }

    public DayPlan week(Week week) {
        this.setWeek(week);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayPlan)) {
            return false;
        }
        return getId() != null && getId().equals(((DayPlan) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayPlan{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
