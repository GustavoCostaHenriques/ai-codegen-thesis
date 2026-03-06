package com.mycompany.weeklyplanning.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.weeklyplanning.domain.DayPlanEntity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayPlanDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    private WeekDTO week;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public WeekDTO getWeek() {
        return week;
    }

    public void setWeek(WeekDTO week) {
        this.week = week;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayPlanDTO)) {
            return false;
        }

        DayPlanDTO dayPlanDTO = (DayPlanDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dayPlanDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayPlanDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", week=" + getWeek() +
            "}";
    }
}
