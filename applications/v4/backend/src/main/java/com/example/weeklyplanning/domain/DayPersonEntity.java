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
@Table(name = "day_persons", uniqueConstraints = {
    @UniqueConstraint(name = "uk_day_persons_day_person", columnNames = {"day_plan_id", "person_id"})
})
public class DayPersonEntity {

    @Id
    @Column(name = "day_person_id", nullable = false, updatable = false)
    private UUID dayPersonId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_plan_id", nullable = false)
    private DayPlanEntity dayPlan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id", nullable = false)
    private PersonEntity person;

    @OneToMany(mappedBy = "dayPerson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayPersonProjectEntity> dayPersonProjects = new ArrayList<>();

    public UUID getDayPersonId() {
        return dayPersonId;
    }

    public void setDayPersonId(UUID dayPersonId) {
        this.dayPersonId = dayPersonId;
    }

    public DayPlanEntity getDayPlan() {
        return dayPlan;
    }

    public void setDayPlan(DayPlanEntity dayPlan) {
        this.dayPlan = dayPlan;
    }

    public PersonEntity getPerson() {
        return person;
    }

    public void setPerson(PersonEntity person) {
        this.person = person;
    }

    public List<DayPersonProjectEntity> getDayPersonProjects() {
        return dayPersonProjects;
    }

    public void setDayPersonProjects(List<DayPersonProjectEntity> dayPersonProjects) {
        this.dayPersonProjects = dayPersonProjects;
    }
}
