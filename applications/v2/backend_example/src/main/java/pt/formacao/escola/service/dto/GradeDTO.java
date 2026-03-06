package pt.formacao.escola.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pt.formacao.escola.domain.GradeEntity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GradeDTO implements Serializable {

    private Long id;

    @Min(value = 0)
    @Max(value = 20)
    private Integer value;

    private Boolean finished;

    private StudentDTO student;

    private DisciplinaDTO disciplina;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public DisciplinaDTO getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(DisciplinaDTO disciplina) {
        this.disciplina = disciplina;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GradeDTO)) {
            return false;
        }

        GradeDTO gradeDTO = (GradeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, gradeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GradeDTO{" +
            "id=" + getId() +
            ", value=" + getValue() +
            ", finished='" + getFinished() + "'" +
            ", student=" + getStudent() +
            ", disciplina=" + getDisciplina() +
            "}";
    }
}
