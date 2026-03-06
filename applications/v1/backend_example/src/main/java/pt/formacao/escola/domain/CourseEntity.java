package pt.formacao.escola.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CourseEntity.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "course")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "grades", "course" }, allowSetters = true)
    private Set<DisciplinaEntity> disciplinas = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "course")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "studentAddress", "grades", "course" }, allowSetters = true)
    private Set<StudentEntity> students = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CourseEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public CourseEntity name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<DisciplinaEntity> getDisciplinas() {
        return this.disciplinas;
    }

    public void setDisciplinas(Set<DisciplinaEntity> disciplinas) {
        if (this.disciplinas != null) {
            this.disciplinas.forEach(i -> i.setCourse(null));
        }
        if (disciplinas != null) {
            disciplinas.forEach(i -> i.setCourse(this));
        }
        this.disciplinas = disciplinas;
    }

    public CourseEntity disciplinas(Set<DisciplinaEntity> disciplinas) {
        this.setDisciplinas(disciplinas);
        return this;
    }

    public CourseEntity addDisciplina(DisciplinaEntity disciplina) {
        this.disciplinas.add(disciplina);
        disciplina.setCourse(this);
        return this;
    }

    public CourseEntity removeDisciplina(DisciplinaEntity disciplina) {
        this.disciplinas.remove(disciplina);
        disciplina.setCourse(null);
        return this;
    }

    public Set<StudentEntity> getStudents() {
        return this.students;
    }

    public void setStudents(Set<StudentEntity> students) {
        if (this.students != null) {
            this.students.forEach(i -> i.setCourse(null));
        }
        if (students != null) {
            students.forEach(i -> i.setCourse(this));
        }
        this.students = students;
    }

    public CourseEntity students(Set<StudentEntity> students) {
        this.setStudents(students);
        return this;
    }

    public CourseEntity addStudent(StudentEntity student) {
        this.students.add(student);
        student.setCourse(this);
        return this;
    }

    public CourseEntity removeStudent(StudentEntity student) {
        this.students.remove(student);
        student.setCourse(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CourseEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((CourseEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourseEntity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
