package com.mycompany.weeklyplanning.domain;

import static com.mycompany.weeklyplanning.domain.AppUserEntityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.weeklyplanning.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AppUserEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppUserEntity.class);
        AppUserEntity appUserEntity1 = getAppUserEntitySample1();
        AppUserEntity appUserEntity2 = new AppUserEntity();
        assertThat(appUserEntity1).isNotEqualTo(appUserEntity2);

        appUserEntity2.setId(appUserEntity1.getId());
        assertThat(appUserEntity1).isEqualTo(appUserEntity2);

        appUserEntity2 = getAppUserEntitySample2();
        assertThat(appUserEntity1).isNotEqualTo(appUserEntity2);
    }
}
