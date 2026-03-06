package com.mycompany.weeklyplanning.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DayPlanDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayPlanDTO.class);
        DayPlanDTO dayPlanDTO1 = new DayPlanDTO();
        dayPlanDTO1.setId(1L);
        DayPlanDTO dayPlanDTO2 = new DayPlanDTO();
        assertThat(dayPlanDTO1).isNotEqualTo(dayPlanDTO2);
        dayPlanDTO2.setId(dayPlanDTO1.getId());
        assertThat(dayPlanDTO1).isEqualTo(dayPlanDTO2);
        dayPlanDTO2.setId(2L);
        assertThat(dayPlanDTO1).isNotEqualTo(dayPlanDTO2);
        dayPlanDTO1.setId(null);
        assertThat(dayPlanDTO1).isNotEqualTo(dayPlanDTO2);
    }
}
