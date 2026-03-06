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

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "day_plans", uniqueConstraints = {
    @UniqueConstraint(name = "uk_day_plans_week_date", columnNames = {"week_id", "day_date"})
})
public class DayPlanEntity {

    @Id
    @Column(name = "day_plan_id", nullable = false, updatable = false)
    private UUID dayPlanId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id", nullable = false)
    private WeekEntity week;

    @Column(name = "day_date", nullable = false)
    private LocalDate date;

    @Column(name = "day_of_week", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @OneToMany(mappedBy = "dayPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayPersonEntity> dayPersons = new ArrayList<>();

    public UUID getDayPlanId() {
        return dayPlanId;
    }

    public void setDayPlanId(UUID dayPlanId) {
        this.dayPlanId = dayPlanId;
    }

    public WeekEntity getWeek() {
        return week;
    }

    public void setWeek(WeekEntity week) {
        this.week = week;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public List<DayPersonEntity> getDayPersons() {
        return dayPersons;
    }

    public void setDayPersons(List<DayPersonEntity> dayPersons) {
        this.dayPersons = dayPersons;
    }
}
