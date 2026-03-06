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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "day_person_projects", uniqueConstraints = {
    @UniqueConstraint(name = "uk_day_person_projects_assignment", columnNames = {"day_person_id", "project_id"})
})
public class DayPersonProjectEntity {

    @Id
    @Column(name = "day_person_project_id", nullable = false, updatable = false)
    private UUID dayPersonProjectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_person_id", nullable = false)
    private DayPersonEntity dayPerson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectEntity project;

    @OneToMany(mappedBy = "dayPersonProject", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskEntity> tasks = new ArrayList<>();

    public UUID getDayPersonProjectId() {
        return dayPersonProjectId;
    }

    public void setDayPersonProjectId(UUID dayPersonProjectId) {
        this.dayPersonProjectId = dayPersonProjectId;
    }

    public DayPersonEntity getDayPerson() {
        return dayPerson;
    }

    public void setDayPerson(DayPersonEntity dayPerson) {
        this.dayPerson = dayPerson;
    }

    public ProjectEntity getProject() {
        return project;
    }

    public void setProject(ProjectEntity project) {
        this.project = project;
    }

    public List<TaskEntity> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskEntity> tasks) {
        this.tasks = tasks;
    }
}
