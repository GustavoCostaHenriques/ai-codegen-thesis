package pt.formacao.escola.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import pt.formacao.escola.web.rest.TestUtil;

class StudentAddressDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentAddressDTO.class);
        StudentAddressDTO studentAddressDTO1 = new StudentAddressDTO();
        studentAddressDTO1.setId(1L);
        StudentAddressDTO studentAddressDTO2 = new StudentAddressDTO();
        assertThat(studentAddressDTO1).isNotEqualTo(studentAddressDTO2);
        studentAddressDTO2.setId(studentAddressDTO1.getId());
        assertThat(studentAddressDTO1).isEqualTo(studentAddressDTO2);
        studentAddressDTO2.setId(2L);
        assertThat(studentAddressDTO1).isNotEqualTo(studentAddressDTO2);
        studentAddressDTO1.setId(null);
        assertThat(studentAddressDTO1).isNotEqualTo(studentAddressDTO2);
    }
}
