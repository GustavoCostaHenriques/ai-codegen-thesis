package com.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DayPerson.
 */
@Entity
@Table(name = "day_person")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayPerson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dayPerson")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tasks", "project", "dayPerson" }, allowSetters = true)
    private Set<DayPersonProject> projects = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Person person;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "people", "week" }, allowSetters = true)
    private DayPlan dayPlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public DayPerson id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Set<DayPersonProject> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<DayPersonProject> dayPersonProjects) {
        if (this.projects != null) {
            this.projects.forEach(i -> i.setDayPerson(null));
        }
        if (dayPersonProjects != null) {
            dayPersonProjects.forEach(i -> i.setDayPerson(this));
        }
        this.projects = dayPersonProjects;
    }

    public DayPerson projects(Set<DayPersonProject> dayPersonProjects) {
        this.setProjects(dayPersonProjects);
        return this;
    }

    public DayPerson addProjects(DayPersonProject dayPersonProject) {
        this.projects.add(dayPersonProject);
        dayPersonProject.setDayPerson(this);
        return this;
    }

    public DayPerson removeProjects(DayPersonProject dayPersonProject) {
        this.projects.remove(dayPersonProject);
        dayPersonProject.setDayPerson(null);
        return this;
    }

    public Person getPerson() {
        return this.person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public DayPerson person(Person person) {
        this.setPerson(person);
        return this;
    }

    public DayPlan getDayPlan() {
        return this.dayPlan;
    }

    public void setDayPlan(DayPlan dayPlan) {
        this.dayPlan = dayPlan;
    }

    public DayPerson dayPlan(DayPlan dayPlan) {
        this.setDayPlan(dayPlan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayPerson)) {
            return false;
        }
        return getId() != null && getId().equals(((DayPerson) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayPerson{" +
            "id=" + getId() +
            "}";
    }
}
