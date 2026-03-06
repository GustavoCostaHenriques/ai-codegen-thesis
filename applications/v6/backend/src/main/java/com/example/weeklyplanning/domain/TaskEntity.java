package com.example.weeklyplanning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "task")
public class TaskEntity extends AbstractAuditableEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assignment_id", nullable = false)
    private PlanningAssignmentEntity assignment;

    @Column(name = "description", nullable = false, length = 2000)
    private String description;

    public UUID getId() {
        return id;
    }

    public PlanningAssignmentEntity getAssignment() {
        return assignment;
    }

    public void setAssignment(PlanningAssignmentEntity assignment) {
        this.assignment = assignment;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
