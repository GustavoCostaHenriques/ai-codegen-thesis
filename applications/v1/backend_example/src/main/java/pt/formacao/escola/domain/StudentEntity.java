package pt.formacao.escola.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import pt.formacao.escola.domain.enumeration.GenreEnum;

/**
 * A StudentEntity.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Min(value = 0)
    @Column(name = "age", nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "genre")
    private GenreEnum genre;

    @JsonIgnoreProperties(value = { "student" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(unique = true)
    private StudentAddressEntity studentAddress;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "student")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "student", "disciplina" }, allowSetters = true)
    private Set<GradeEntity> grades = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "disciplinas", "students" }, allowSetters = true)
    private CourseEntity course;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StudentEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public StudentEntity name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return this.age;
    }

    public StudentEntity age(Integer age) {
        this.setAge(age);
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public GenreEnum getGenre() {
        return this.genre;
    }

    public StudentEntity genre(GenreEnum genre) {
        this.setGenre(genre);
        return this;
    }

    public void setGenre(GenreEnum genre) {
        this.genre = genre;
    }

    public StudentAddressEntity getStudentAddress() {
        return this.studentAddress;
    }

    public void setStudentAddress(StudentAddressEntity studentAddress) {
        this.studentAddress = studentAddress;
    }

    public StudentEntity studentAddress(StudentAddressEntity studentAddress) {
        this.setStudentAddress(studentAddress);
        return this;
    }

    public Set<GradeEntity> getGrades() {
        return this.grades;
    }

    public void setGrades(Set<GradeEntity> grades) {
        if (this.grades != null) {
            this.grades.forEach(i -> i.setStudent(null));
        }
        if (grades != null) {
            grades.forEach(i -> i.setStudent(this));
        }
        this.grades = grades;
    }

    public StudentEntity grades(Set<GradeEntity> grades) {
        this.setGrades(grades);
        return this;
    }

    public StudentEntity addGrade(GradeEntity grade) {
        this.grades.add(grade);
        grade.setStudent(this);
        return this;
    }

    public StudentEntity removeGrade(GradeEntity grade) {
        this.grades.remove(grade);
        grade.setStudent(null);
        return this;
    }

    public CourseEntity getCourse() {
        return this.course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }

    public StudentEntity course(CourseEntity course) {
        this.setCourse(course);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((StudentEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentEntity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", age=" + getAge() +
            ", genre='" + getGenre() + "'" +
            "}";
    }
}
