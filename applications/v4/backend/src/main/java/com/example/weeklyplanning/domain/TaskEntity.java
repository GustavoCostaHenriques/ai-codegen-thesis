package com.example.weeklyplanning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "tasks")
public class TaskEntity extends AbstractAuditableEntity {

    @Id
    @Column(name = "task_id", nullable = false, updatable = false)
    private UUID taskId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_person_project_id", nullable = false)
    private DayPersonProjectEntity dayPersonProject;

    @Column(name = "description", nullable = false, length = 2000)
    private String description;

    public UUID getTaskId() {
        return taskId;
    }

    public void setTaskId(UUID taskId) {
        this.taskId = taskId;
    }

    public DayPersonProjectEntity getDayPersonProject() {
        return dayPersonProject;
    }

    public void setDayPersonProject(DayPersonProjectEntity dayPersonProject) {
        this.dayPersonProject = dayPersonProject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
