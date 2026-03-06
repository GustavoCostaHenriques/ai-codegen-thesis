package com.mycompany.weeklyplanning.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WeekDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WeekDTO.class);
        WeekDTO weekDTO1 = new WeekDTO();
        weekDTO1.setId(1L);
        WeekDTO weekDTO2 = new WeekDTO();
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
        weekDTO2.setId(weekDTO1.getId());
        assertThat(weekDTO1).isEqualTo(weekDTO2);
        weekDTO2.setId(2L);
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
        weekDTO1.setId(null);
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
    }
}
