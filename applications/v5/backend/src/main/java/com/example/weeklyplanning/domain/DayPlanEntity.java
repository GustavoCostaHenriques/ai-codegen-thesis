package com.example.weeklyplanning.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "day_plan", uniqueConstraints = {
    @UniqueConstraint(name = "uk_day_plan_week_day", columnNames = {"week_id", "day_of_week"}),
    @UniqueConstraint(name = "uk_day_plan_week_date", columnNames = {"week_id", "plan_date"})
})
public class DayPlanEntity extends AbstractAuditableEntity {

    @Id
    @UuidGenerator
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "week_id", nullable = false)
    private WeekEntity week;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false, length = 20)
    private PlanningDayOfWeek dayOfWeek;

    @Column(name = "plan_date", nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "dayPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayProjectEntity> projects = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public WeekEntity getWeek() {
        return week;
    }

    public void setWeek(WeekEntity week) {
        this.week = week;
    }

    public PlanningDayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(PlanningDayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<DayProjectEntity> getProjects() {
        return projects;
    }
}
