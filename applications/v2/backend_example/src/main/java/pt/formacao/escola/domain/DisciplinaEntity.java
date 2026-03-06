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
 * A DisciplinaEntity.
 */
@Entity
@Table(name = "class")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DisciplinaEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @NotNull
    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @NotNull
    @Column(name = "credits", nullable = false)
    private Integer credits;

    @NotNull
    @Column(name = "teacher_name", nullable = false)
    private String teacherName;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "disciplina")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "student", "disciplina" }, allowSetters = true)
    private Set<GradeEntity> grades = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "disciplinas", "students" }, allowSetters = true)
    private CourseEntity course;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DisciplinaEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public DisciplinaEntity name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCapacity() {
        return this.capacity;
    }

    public DisciplinaEntity capacity(Integer capacity) {
        this.setCapacity(capacity);
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getCredits() {
        return this.credits;
    }

    public DisciplinaEntity credits(Integer credits) {
        this.setCredits(credits);
        return this;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public String getTeacherName() {
        return this.teacherName;
    }

    public DisciplinaEntity teacherName(String teacherName) {
        this.setTeacherName(teacherName);
        return this;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public Set<GradeEntity> getGrades() {
        return this.grades;
    }

    public void setGrades(Set<GradeEntity> grades) {
        if (this.grades != null) {
            this.grades.forEach(i -> i.setDisciplina(null));
        }
        if (grades != null) {
            grades.forEach(i -> i.setDisciplina(this));
        }
        this.grades = grades;
    }

    public DisciplinaEntity grades(Set<GradeEntity> grades) {
        this.setGrades(grades);
        return this;
    }

    public DisciplinaEntity addGrade(GradeEntity grade) {
        this.grades.add(grade);
        grade.setDisciplina(this);
        return this;
    }

    public DisciplinaEntity removeGrade(GradeEntity grade) {
        this.grades.remove(grade);
        grade.setDisciplina(null);
        return this;
    }

    public CourseEntity getCourse() {
        return this.course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }

    public DisciplinaEntity course(CourseEntity course) {
        this.setCourse(course);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DisciplinaEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((DisciplinaEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DisciplinaEntity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", capacity=" + getCapacity() +
            ", credits=" + getCredits() +
            ", teacherName='" + getTeacherName() + "'" +
            "}";
    }
}
