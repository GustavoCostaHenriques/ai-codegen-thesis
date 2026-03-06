package com.mycompany.weeklyplanning.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.weeklyplanning.domain.DayUserEntity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayUserDTO implements Serializable {

    private Long id;

    @NotNull
    private AppUserDTO user;

    @NotNull
    private DayPlanDTO dayPlan;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppUserDTO getUser() {
        return user;
    }

    public void setUser(AppUserDTO user) {
        this.user = user;
    }

    public DayPlanDTO getDayPlan() {
        return dayPlan;
    }

    public void setDayPlan(DayPlanDTO dayPlan) {
        this.dayPlan = dayPlan;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayUserDTO)) {
            return false;
        }

        DayUserDTO dayUserDTO = (DayUserDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dayUserDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayUserDTO{" +
            "id=" + getId() +
            ", user=" + getUser() +
            ", dayPlan=" + getDayPlan() +
            "}";
    }
}
