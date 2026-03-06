package com.weeklyplanning.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class DayPersonProjectDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayPersonProjectDTO.class);
        DayPersonProjectDTO dayPersonProjectDTO1 = new DayPersonProjectDTO();
        dayPersonProjectDTO1.setId(UUID.randomUUID());
        DayPersonProjectDTO dayPersonProjectDTO2 = new DayPersonProjectDTO();
        assertThat(dayPersonProjectDTO1).isNotEqualTo(dayPersonProjectDTO2);
        dayPersonProjectDTO2.setId(dayPersonProjectDTO1.getId());
        assertThat(dayPersonProjectDTO1).isEqualTo(dayPersonProjectDTO2);
        dayPersonProjectDTO2.setId(UUID.randomUUID());
        assertThat(dayPersonProjectDTO1).isNotEqualTo(dayPersonProjectDTO2);
        dayPersonProjectDTO1.setId(null);
        assertThat(dayPersonProjectDTO1).isNotEqualTo(dayPersonProjectDTO2);
    }
}
