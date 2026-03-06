package pt.formacao.escola.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pt.formacao.escola.domain.StudentAddressEntity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentAddressDTO implements Serializable {

    private Long id;

    private String adressLine;

    private String postalCode;

    private String city;

    private String country;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdressLine() {
        return adressLine;
    }

    public void setAdressLine(String adressLine) {
        this.adressLine = adressLine;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentAddressDTO)) {
            return false;
        }

        StudentAddressDTO studentAddressDTO = (StudentAddressDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, studentAddressDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentAddressDTO{" +
            "id=" + getId() +
            ", adressLine='" + getAdressLine() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
