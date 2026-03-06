package com.mycompany.weeklyplanning.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DayUserDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayUserDTO.class);
        DayUserDTO dayUserDTO1 = new DayUserDTO();
        dayUserDTO1.setId(1L);
        DayUserDTO dayUserDTO2 = new DayUserDTO();
        assertThat(dayUserDTO1).isNotEqualTo(dayUserDTO2);
        dayUserDTO2.setId(dayUserDTO1.getId());
        assertThat(dayUserDTO1).isEqualTo(dayUserDTO2);
        dayUserDTO2.setId(2L);
        assertThat(dayUserDTO1).isNotEqualTo(dayUserDTO2);
        dayUserDTO1.setId(null);
        assertThat(dayUserDTO1).isNotEqualTo(dayUserDTO2);
    }
}
