package com.mycompany.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * A TaskEntity.
 */
@Entity
@Table(name = "task")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "tasks", "dayUser", "project" }, allowSetters = true)
    private DayUserProjectEntity dayUserProject;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TaskEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return this.text;
    }

    public TaskEntity text(String text) {
        this.setText(text);
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public DayUserProjectEntity getDayUserProject() {
        return this.dayUserProject;
    }

    public void setDayUserProject(DayUserProjectEntity dayUserProject) {
        this.dayUserProject = dayUserProject;
    }

    public TaskEntity dayUserProject(DayUserProjectEntity dayUserProject) {
        this.setDayUserProject(dayUserProject);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((TaskEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskEntity{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
