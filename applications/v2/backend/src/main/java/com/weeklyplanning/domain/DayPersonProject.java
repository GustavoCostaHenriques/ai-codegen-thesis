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
 * A DayPersonProject.
 */
@Entity
@Table(name = "day_person_project")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayPersonProject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dayPersonProject")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "dayPersonProject" }, allowSetters = true)
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "owner" }, allowSetters = true)
    private Project project;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "projects", "person", "dayPlan" }, allowSetters = true)
    private DayPerson dayPerson;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public DayPersonProject id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Set<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(Set<Task> tasks) {
        if (this.tasks != null) {
            this.tasks.forEach(i -> i.setDayPersonProject(null));
        }
        if (tasks != null) {
            tasks.forEach(i -> i.setDayPersonProject(this));
        }
        this.tasks = tasks;
    }

    public DayPersonProject tasks(Set<Task> tasks) {
        this.setTasks(tasks);
        return this;
    }

    public DayPersonProject addTasks(Task task) {
        this.tasks.add(task);
        task.setDayPersonProject(this);
        return this;
    }

    public DayPersonProject removeTasks(Task task) {
        this.tasks.remove(task);
        task.setDayPersonProject(null);
        return this;
    }

    public Project getProject() {
        return this.project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public DayPersonProject project(Project project) {
        this.setProject(project);
        return this;
    }

    public DayPerson getDayPerson() {
        return this.dayPerson;
    }

    public void setDayPerson(DayPerson dayPerson) {
        this.dayPerson = dayPerson;
    }

    public DayPersonProject dayPerson(DayPerson dayPerson) {
        this.setDayPerson(dayPerson);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayPersonProject)) {
            return false;
        }
        return getId() != null && getId().equals(((DayPersonProject) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayPersonProject{" +
            "id=" + getId() +
            "}";
    }
}
