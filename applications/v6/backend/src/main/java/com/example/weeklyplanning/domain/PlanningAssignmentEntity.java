package com.example.weeklyplanning.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "planning_assignment", uniqueConstraints = {
    @UniqueConstraint(name = "uk_assignment_unique", columnNames = {"day_project_id", "person_id"})
})
public class PlanningAssignmentEntity extends AbstractAuditableEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "day_project_id", nullable = false)
    private DayProjectEntity dayProject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private PersonEntity person;

    @Column(name = "estimated_hours", nullable = false)
    private Double estimatedHours;

    @Column(name = "actual_hours")
    private Double actualHours;

    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskEntity> tasks = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public DayProjectEntity getDayProject() {
        return dayProject;
    }

    public void setDayProject(DayProjectEntity dayProject) {
        this.dayProject = dayProject;
    }

    public PersonEntity getPerson() {
        return person;
    }

    public void setPerson(PersonEntity person) {
        this.person = person;
    }

    public Double getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(Double estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public Double getActualHours() {
        return actualHours;
    }

    public void setActualHours(Double actualHours) {
        this.actualHours = actualHours;
    }

    public List<TaskEntity> getTasks() {
        return tasks;
    }
}
