package com.weeklyplanning.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.weeklyplanning.domain.DayPerson} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayPersonDTO implements Serializable {

    private UUID id;

    @NotNull
    private PersonDTO person;

    @NotNull
    private DayPlanDTO dayPlan;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public PersonDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDTO person) {
        this.person = person;
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
        if (!(o instanceof DayPersonDTO)) {
            return false;
        }

        DayPersonDTO dayPersonDTO = (DayPersonDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dayPersonDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayPersonDTO{" +
            "id='" + getId() + "'" +
            ", person=" + getPerson() +
            ", dayPlan=" + getDayPlan() +
            "}";
    }
}
