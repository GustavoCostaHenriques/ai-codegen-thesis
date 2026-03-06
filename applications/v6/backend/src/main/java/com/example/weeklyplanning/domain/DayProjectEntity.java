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
@Table(name = "day_project", uniqueConstraints = {
    @UniqueConstraint(name = "uk_day_project_unique", columnNames = {"day_plan_id", "project_id"})
})
public class DayProjectEntity extends AbstractAuditableEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "day_plan_id", nullable = false)
    private DayPlanEntity dayPlan;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectEntity project;

    @OneToMany(mappedBy = "dayProject", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlanningAssignmentEntity> assignments = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public DayPlanEntity getDayPlan() {
        return dayPlan;
    }

    public void setDayPlan(DayPlanEntity dayPlan) {
        this.dayPlan = dayPlan;
    }

    public ProjectEntity getProject() {
        return project;
    }

    public void setProject(ProjectEntity project) {
        this.project = project;
    }

    public List<PlanningAssignmentEntity> getAssignments() {
        return assignments;
    }
}
