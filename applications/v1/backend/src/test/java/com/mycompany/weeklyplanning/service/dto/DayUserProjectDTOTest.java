package com.mycompany.weeklyplanning.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DayUserProjectDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayUserProjectDTO.class);
        DayUserProjectDTO dayUserProjectDTO1 = new DayUserProjectDTO();
        dayUserProjectDTO1.setId(1L);
        DayUserProjectDTO dayUserProjectDTO2 = new DayUserProjectDTO();
        assertThat(dayUserProjectDTO1).isNotEqualTo(dayUserProjectDTO2);
        dayUserProjectDTO2.setId(dayUserProjectDTO1.getId());
        assertThat(dayUserProjectDTO1).isEqualTo(dayUserProjectDTO2);
        dayUserProjectDTO2.setId(2L);
        assertThat(dayUserProjectDTO1).isNotEqualTo(dayUserProjectDTO2);
        dayUserProjectDTO1.setId(null);
        assertThat(dayUserProjectDTO1).isNotEqualTo(dayUserProjectDTO2);
    }
}
