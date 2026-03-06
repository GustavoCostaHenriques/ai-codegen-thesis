package pt.formacao.escola.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pt.formacao.escola.domain.DisciplinaEntity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DisciplinaDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Integer capacity;

    @NotNull
    private Integer credits;

    @NotNull
    private String teacherName;

    @NotNull
    private CourseDTO course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DisciplinaDTO)) {
            return false;
        }

        DisciplinaDTO disciplinaDTO = (DisciplinaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, disciplinaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DisciplinaDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", capacity=" + getCapacity() +
            ", credits=" + getCredits() +
            ", teacherName='" + getTeacherName() + "'" +
            ", course=" + getCourse() +
            "}";
    }
}
