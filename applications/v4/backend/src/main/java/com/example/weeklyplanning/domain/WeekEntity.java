package com.example.weeklyplanning.domain;

import com.example.weeklyplanning.domain.enumeration.WeekStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "weeks")
public class WeekEntity extends AbstractAuditableEntity {

    @Id
    @Column(name = "week_id", nullable = false, updatable = false)
    private UUID weekId;

    @Column(name = "week_start", nullable = false)
    private LocalDate weekStart;

    @Column(name = "week_end", nullable = false)
    private LocalDate weekEnd;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private WeekStatus status;

    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayPlanEntity> dayPlans = new ArrayList<>();

    public UUID getWeekId() {
        return weekId;
    }

    public void setWeekId(UUID weekId) {
        this.weekId = weekId;
    }

    public LocalDate getWeekStart() {
        return weekStart;
    }

    public void setWeekStart(LocalDate weekStart) {
        this.weekStart = weekStart;
    }

    public LocalDate getWeekEnd() {
        return weekEnd;
    }

    public void setWeekEnd(LocalDate weekEnd) {
        this.weekEnd = weekEnd;
    }

    public WeekStatus getStatus() {
        return status;
    }

    public void setStatus(WeekStatus status) {
        this.status = status;
    }

    public List<DayPlanEntity> getDayPlans() {
        return dayPlans;
    }

    public void setDayPlans(List<DayPlanEntity> dayPlans) {
        this.dayPlans = dayPlans;
    }
}
