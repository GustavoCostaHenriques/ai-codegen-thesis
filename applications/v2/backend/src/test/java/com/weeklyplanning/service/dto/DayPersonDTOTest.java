package com.weeklyplanning.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.weeklyplanning.web.rest.TestUtil;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class DayPersonDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayPersonDTO.class);
        DayPersonDTO dayPersonDTO1 = new DayPersonDTO();
        dayPersonDTO1.setId(UUID.randomUUID());
        DayPersonDTO dayPersonDTO2 = new DayPersonDTO();
        assertThat(dayPersonDTO1).isNotEqualTo(dayPersonDTO2);
        dayPersonDTO2.setId(dayPersonDTO1.getId());
        assertThat(dayPersonDTO1).isEqualTo(dayPersonDTO2);
        dayPersonDTO2.setId(UUID.randomUUID());
        assertThat(dayPersonDTO1).isNotEqualTo(dayPersonDTO2);
        dayPersonDTO1.setId(null);
        assertThat(dayPersonDTO1).isNotEqualTo(dayPersonDTO2);
    }
}
