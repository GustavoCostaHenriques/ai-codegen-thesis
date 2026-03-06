package pt.formacao.escola.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A GradeEntity.
 */
@Entity
@Table(name = "grade")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GradeEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Min(value = 0)
    @Max(value = 20)
    @Column(name = "value")
    private Integer value;

    @Column(name = "finished")
    private Boolean finished;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "studentAddress", "grades", "course" }, allowSetters = true)
    private StudentEntity student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "grades", "course" }, allowSetters = true)
    private DisciplinaEntity disciplina;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public GradeEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return this.value;
    }

    public GradeEntity value(Integer value) {
        this.setValue(value);
        return this;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Boolean getFinished() {
        return this.finished;
    }

    public GradeEntity finished(Boolean finished) {
        this.setFinished(finished);
        return this;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    public StudentEntity getStudent() {
        return this.student;
    }

    public void setStudent(StudentEntity student) {
        this.student = student;
    }

    public GradeEntity student(StudentEntity student) {
        this.setStudent(student);
        return this;
    }

    public DisciplinaEntity getDisciplina() {
        return this.disciplina;
    }

    public void setDisciplina(DisciplinaEntity disciplina) {
        this.disciplina = disciplina;
    }

    public GradeEntity disciplina(DisciplinaEntity disciplina) {
        this.setDisciplina(disciplina);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GradeEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((GradeEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GradeEntity{" +
            "id=" + getId() +
            ", value=" + getValue() +
            ", finished='" + getFinished() + "'" +
            "}";
    }
}
