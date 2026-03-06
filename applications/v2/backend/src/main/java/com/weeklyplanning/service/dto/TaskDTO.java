package com.weeklyplanning.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.weeklyplanning.domain.Task} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskDTO implements Serializable {

    private UUID id;

    @NotNull
    @Size(min = 1, max = 1000)
    private String description;

    @NotNull
    private DayPersonProjectDTO dayPersonProject;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DayPersonProjectDTO getDayPersonProject() {
        return dayPersonProject;
    }

    public void setDayPersonProject(DayPersonProjectDTO dayPersonProject) {
        this.dayPersonProject = dayPersonProject;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskDTO)) {
            return false;
        }

        TaskDTO taskDTO = (TaskDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, taskDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskDTO{" +
            "id='" + getId() + "'" +
            ", description='" + getDescription() + "'" +
            ", dayPersonProject=" + getDayPersonProject() +
            "}";
    }
}
