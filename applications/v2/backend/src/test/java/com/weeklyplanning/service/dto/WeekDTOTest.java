package com.weeklyplanning.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class WeekDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WeekDTO.class);
        WeekDTO weekDTO1 = new WeekDTO();
        weekDTO1.setId(UUID.randomUUID());
        WeekDTO weekDTO2 = new WeekDTO();
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
        weekDTO2.setId(weekDTO1.getId());
        assertThat(weekDTO1).isEqualTo(weekDTO2);
        weekDTO2.setId(UUID.randomUUID());
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
        weekDTO1.setId(null);
        assertThat(weekDTO1).isNotEqualTo(weekDTO2);
    }
}
