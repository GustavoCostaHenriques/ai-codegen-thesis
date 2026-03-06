package com.mycompany.weeklyplanning.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.weeklyplanning.domain.DayUserProjectEntity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DayUserProjectDTO implements Serializable {

    private Long id;

    @NotNull
    private DayUserDTO dayUser;

    @NotNull
    private ProjectDTO project;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DayUserDTO getDayUser() {
        return dayUser;
    }

    public void setDayUser(DayUserDTO dayUser) {
        this.dayUser = dayUser;
    }

    public ProjectDTO getProject() {
        return project;
    }

    public void setProject(ProjectDTO project) {
        this.project = project;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayUserProjectDTO)) {
            return false;
        }

        DayUserProjectDTO dayUserProjectDTO = (DayUserProjectDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dayUserProjectDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DayUserProjectDTO{" +
            "id=" + getId() +
            ", dayUser=" + getDayUser() +
            ", project=" + getProject() +
            "}";
    }
}
