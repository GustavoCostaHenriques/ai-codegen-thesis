package com.weeklyplanning.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.weeklyplanning.domain.DayPersonProject} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayPersonProjectDTO implements Serializable {

    private UUID id;

    @NotNull
    private ProjectDTO project;

    @NotNull
    private DayPersonDTO dayPerson;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ProjectDTO getProject() {
        return project;
    }

    public void setProject(ProjectDTO project) {
        this.project = project;
    }

    public DayPersonDTO getDayPerson() {
        return dayPerson;
    }

    public void setDayPerson(DayPersonDTO dayPerson) {
        this.dayPerson = dayPerson;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayPersonProjectDTO)) {
            return false;
        }

        DayPersonProjectDTO dayPersonProjectDTO = (DayPersonProjectDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dayPersonProjectDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayPersonProjectDTO{" +
            "id='" + getId() + "'" +
            ", project=" + getProject() +
            ", dayPerson=" + getDayPerson() +
            "}";
    }
}
