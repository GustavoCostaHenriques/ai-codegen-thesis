package com.mycompany.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DayUserProjectEntity.
 */
@Entity
@Table(name = "day_user_project")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayUserProjectEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dayUserProject")
    @JsonIgnoreProperties(value = { "dayUserProject" }, allowSetters = true)
    private Set<TaskEntity> tasks = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "assignments", "user", "dayPlan" }, allowSetters = true)
    private DayUserEntity dayUser;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "assignments" }, allowSetters = true)
    private ProjectEntity project;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DayUserProjectEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TaskEntity> getTasks() {
        return this.tasks;
    }

    public void setTasks(Set<TaskEntity> tasks) {
        if (this.tasks != null) {
            this.tasks.forEach(i -> i.setDayUserProject(null));
        }
        if (tasks != null) {
            tasks.forEach(i -> i.setDayUserProject(this));
        }
        this.tasks = tasks;
    }

    public DayUserProjectEntity tasks(Set<TaskEntity> tasks) {
        this.setTasks(tasks);
        return this;
    }

    public DayUserProjectEntity addTasks(TaskEntity task) {
        this.tasks.add(task);
        task.setDayUserProject(this);
        return this;
    }

    public DayUserProjectEntity removeTasks(TaskEntity task) {
        this.tasks.remove(task);
        task.setDayUserProject(null);
        return this;
    }

    public DayUserEntity getDayUser() {
        return this.dayUser;
    }

    public void setDayUser(DayUserEntity dayUser) {
        this.dayUser = dayUser;
    }

    public DayUserProjectEntity dayUser(DayUserEntity dayUser) {
        this.setDayUser(dayUser);
        return this;
    }

    public ProjectEntity getProject() {
        return this.project;
    }

    public void setProject(ProjectEntity project) {
        this.project = project;
    }

    public DayUserProjectEntity project(ProjectEntity project) {
        this.setProject(project);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayUserProjectEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((DayUserProjectEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayUserProjectEntity{" +
            "id=" + getId() +
            "}";
    }
}
