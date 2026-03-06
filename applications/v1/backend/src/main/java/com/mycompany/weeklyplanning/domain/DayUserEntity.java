package com.mycompany.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DayUserEntity.
 */
@Entity
@Table(name = "day_user")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayUserEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dayUser")
    @JsonIgnoreProperties(value = { "tasks", "dayUser", "project" }, allowSetters = true)
    private Set<DayUserProjectEntity> assignments = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private AppUserEntity user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "dayUsers", "week" }, allowSetters = true)
    private DayPlanEntity dayPlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DayUserEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<DayUserProjectEntity> getAssignments() {
        return this.assignments;
    }

    public void setAssignments(Set<DayUserProjectEntity> dayUserProjects) {
        if (this.assignments != null) {
            this.assignments.forEach(i -> i.setDayUser(null));
        }
        if (dayUserProjects != null) {
            dayUserProjects.forEach(i -> i.setDayUser(this));
        }
        this.assignments = dayUserProjects;
    }

    public DayUserEntity assignments(Set<DayUserProjectEntity> dayUserProjects) {
        this.setAssignments(dayUserProjects);
        return this;
    }

    public DayUserEntity addAssignments(DayUserProjectEntity dayUserProject) {
        this.assignments.add(dayUserProject);
        dayUserProject.setDayUser(this);
        return this;
    }

    public DayUserEntity removeAssignments(DayUserProjectEntity dayUserProject) {
        this.assignments.remove(dayUserProject);
        dayUserProject.setDayUser(null);
        return this;
    }

    public AppUserEntity getUser() {
        return this.user;
    }

    public void setUser(AppUserEntity appUser) {
        this.user = appUser;
    }

    public DayUserEntity user(AppUserEntity appUser) {
        this.setUser(appUser);
        return this;
    }

    public DayPlanEntity getDayPlan() {
        return this.dayPlan;
    }

    public void setDayPlan(DayPlanEntity dayPlan) {
        this.dayPlan = dayPlan;
    }

    public DayUserEntity dayPlan(DayPlanEntity dayPlan) {
        this.setDayPlan(dayPlan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayUserEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((DayUserEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayUserEntity{" +
            "id=" + getId() +
            "}";
    }
}
