package pt.formacao.escola.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import pt.formacao.escola.web.rest.TestUtil;

class GradeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GradeDTO.class);
        GradeDTO gradeDTO1 = new GradeDTO();
        gradeDTO1.setId(1L);
        GradeDTO gradeDTO2 = new GradeDTO();
        assertThat(gradeDTO1).isNotEqualTo(gradeDTO2);
        gradeDTO2.setId(gradeDTO1.getId());
        assertThat(gradeDTO1).isEqualTo(gradeDTO2);
        gradeDTO2.setId(2L);
        assertThat(gradeDTO1).isNotEqualTo(gradeDTO2);
        gradeDTO1.setId(null);
        assertThat(gradeDTO1).isNotEqualTo(gradeDTO2);
    }
}
