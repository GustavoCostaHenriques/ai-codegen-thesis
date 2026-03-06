package pt.formacao.escola.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A StudentAddressEntity.
 */
@Entity
@Table(name = "student_address")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentAddressEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "adress_line")
    private String adressLine;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @JsonIgnoreProperties(value = { "studentAddress", "grades", "course" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "studentAddress")
    private StudentEntity student;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StudentAddressEntity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdressLine() {
        return this.adressLine;
    }

    public StudentAddressEntity adressLine(String adressLine) {
        this.setAdressLine(adressLine);
        return this;
    }

    public void setAdressLine(String adressLine) {
        this.adressLine = adressLine;
    }

    public String getPostalCode() {
        return this.postalCode;
    }

    public StudentAddressEntity postalCode(String postalCode) {
        this.setPostalCode(postalCode);
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return this.city;
    }

    public StudentAddressEntity city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return this.country;
    }

    public StudentAddressEntity country(String country) {
        this.setCountry(country);
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public StudentEntity getStudent() {
        return this.student;
    }

    public void setStudent(StudentEntity student) {
        if (this.student != null) {
            this.student.setStudentAddress(null);
        }
        if (student != null) {
            student.setStudentAddress(this);
        }
        this.student = student;
    }

    public StudentAddressEntity student(StudentEntity student) {
        this.setStudent(student);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentAddressEntity)) {
            return false;
        }
        return getId() != null && getId().equals(((StudentAddressEntity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentAddressEntity{" +
            "id=" + getId() +
            ", adressLine='" + getAdressLine() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
