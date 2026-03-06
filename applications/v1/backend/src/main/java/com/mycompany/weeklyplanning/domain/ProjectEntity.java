package com.mycompany.weeklyplanning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.weeklyplanning.service.api.dto.ProjectStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ProjectEntity.
 */
@Entity
@Table(name = "project")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProjectEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "code")
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ProjectStatus status;

    @ManyToOne
    private AppUserEntity owner;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
    @JsonIgnoreProperties(value = { "tasks", "dayUser", "project" }, allowSetters = true)
    private Set<DayUserProjectEntity> assignments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ProjectEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public ProjectEntity name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return this.code;
    }

    public ProjectEntity code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public ProjectStatus getStatus() {
        return this.status;
    }

    public ProjectEntity status(ProjectStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public AppUserEntity getOwner() {
        return this.owner;
    }

    public ProjectEntity owner(AppUserEntity owner) {
        this.setOwner(owner);
        return this;
    }

    public void setOwner(AppUserEntity owner) {
        this.owner = owner;
    }

    public Set<DayUserProjectEntity> getAssignments() {
        return this.assignments;
    }

    public void setAssignments(Set<DayUserProjectEntity> dayUserProjects) {
        if (this.assignments != null) {
            this.assignments.forEach(i -> i.setProject(null));
        }
        if (dayUserProjects != null) {
            dayUserProjects.forEach(i -> i.setProject(this));
        }
        this.assignments = dayUserProjects;
    }

    public ProjectEntity assignments(Set<DayUserProjectEntity> dayUserProjects) {
        this.setAssignments(dayUserProjects);
        return this;
    }

    public ProjectEntity addAssignments(DayUserProjectEntity dayUserProject) {
        this.assignments.add(dayUserProject);
        dayUserProject.setProject(this);
        return this;
    }

    public ProjectEntity removeAssignments(DayUserProjectEntity dayUserProject) {
        this.assignments.remove(dayUserProject);
        dayUserProject.setProject(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((ProjectEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectEntity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
