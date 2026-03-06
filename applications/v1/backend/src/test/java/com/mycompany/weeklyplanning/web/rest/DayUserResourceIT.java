package com.mycompany.weeklyplanning.web.rest;

import static com.mycompany.weeklyplanning.domain.DayUserEntityAsserts.*;
import static com.mycompany.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.weeklyplanning.IntegrationTest;
import com.mycompany.weeklyplanning.domain.AppUserEntity;
import com.mycompany.weeklyplanning.domain.DayPlanEntity;
import com.mycompany.weeklyplanning.domain.DayUserEntity;
import com.mycompany.weeklyplanning.repository.DayUserRepository;
import com.mycompany.weeklyplanning.service.dto.DayUserDTO;
import com.mycompany.weeklyplanning.service.mapper.DayUserMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DayUserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DayUserResourceIT {

    private static final String ENTITY_API_URL = "/api/day-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DayUserRepository dayUserRepository;

    @Autowired
    private DayUserMapper dayUserMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDayUserMockMvc;

    private DayUserEntity dayUserEntity;

    private DayUserEntity insertedDayUserEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayUserEntity createEntity(EntityManager em) {
        DayUserEntity dayUserEntity = new DayUserEntity();
        // Add required entity
        AppUserEntity appUser;
        if (TestUtil.findAll(em, AppUserEntity.class).isEmpty()) {
            appUser = AppUserResourceIT.createEntity();
            em.persist(appUser);
            em.flush();
        } else {
            appUser = TestUtil.findAll(em, AppUserEntity.class).get(0);
        }
        dayUserEntity.setUser(appUser);
        // Add required entity
        DayPlanEntity dayPlan;
        if (TestUtil.findAll(em, DayPlanEntity.class).isEmpty()) {
            dayPlan = DayPlanResourceIT.createEntity(em);
            em.persist(dayPlan);
            em.flush();
        } else {
            dayPlan = TestUtil.findAll(em, DayPlanEntity.class).get(0);
        }
        dayUserEntity.setDayPlan(dayPlan);
        return dayUserEntity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayUserEntity createUpdatedEntity(EntityManager em) {
        DayUserEntity updatedDayUserEntity = new DayUserEntity();
        // Add required entity
        AppUserEntity appUser;
        if (TestUtil.findAll(em, AppUserEntity.class).isEmpty()) {
            appUser = AppUserResourceIT.createUpdatedEntity();
            em.persist(appUser);
            em.flush();
        } else {
            appUser = TestUtil.findAll(em, AppUserEntity.class).get(0);
        }
        updatedDayUserEntity.setUser(appUser);
        // Add required entity
        DayPlanEntity dayPlan;
        if (TestUtil.findAll(em, DayPlanEntity.class).isEmpty()) {
            dayPlan = DayPlanResourceIT.createUpdatedEntity(em);
            em.persist(dayPlan);
            em.flush();
        } else {
            dayPlan = TestUtil.findAll(em, DayPlanEntity.class).get(0);
        }
        updatedDayUserEntity.setDayPlan(dayPlan);
        return updatedDayUserEntity;
    }

    @BeforeEach
    void initTest() {
        dayUserEntity = createEntity(em);
    }

    @AfterEach
    void cleanup() {
        if (insertedDayUserEntity != null) {
            dayUserRepository.delete(insertedDayUserEntity);
            insertedDayUserEntity = null;
        }
    }

    @Test
    @Transactional
    void createDayUser() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DayUser
        DayUserDTO dayUserDTO = dayUserMapper.toDto(dayUserEntity);
        var returnedDayUserDTO = om.readValue(
            restDayUserMockMvc
                .perform(
                    post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayUserDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DayUserDTO.class
        );

        // Validate the DayUser in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDayUserEntity = dayUserMapper.toEntity(returnedDayUserDTO);
        assertDayUserEntityUpdatableFieldsEquals(returnedDayUserEntity, getPersistedDayUserEntity(returnedDayUserEntity));

        insertedDayUserEntity = returnedDayUserEntity;
    }

    @Test
    @Transactional
    void createDayUserWithExistingId() throws Exception {
        // Create the DayUser with an existing ID
        dayUserEntity.setId(1L);
        DayUserDTO dayUserDTO = dayUserMapper.toDto(dayUserEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayUserMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DayUser in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDayUsers() throws Exception {
        // Initialize the database
        insertedDayUserEntity = dayUserRepository.saveAndFlush(dayUserEntity);

        // Get all the dayUserList
        restDayUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayUserEntity.getId().intValue())));
    }

    @Test
    @Transactional
    void getDayUser() throws Exception {
        // Initialize the database
        insertedDayUserEntity = dayUserRepository.saveAndFlush(dayUserEntity);

        // Get the dayUser
        restDayUserMockMvc
            .perform(get(ENTITY_API_URL_ID, dayUserEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dayUserEntity.getId().intValue()));
    }

    @Test
    @Transactional
    void getDayUsersByIdFiltering() throws Exception {
        // Initialize the database
        insertedDayUserEntity = dayUserRepository.saveAndFlush(dayUserEntity);

        Long id = dayUserEntity.getId();

        defaultDayUserFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultDayUserFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultDayUserFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllDayUsersByUserIsEqualToSomething() throws Exception {
        AppUserEntity user;
        if (TestUtil.findAll(em, AppUserEntity.class).isEmpty()) {
            dayUserRepository.saveAndFlush(dayUserEntity);
            user = AppUserResourceIT.createEntity();
        } else {
            user = TestUtil.findAll(em, AppUserEntity.class).get(0);
        }
        em.persist(user);
        em.flush();
        dayUserEntity.setUser(user);
        dayUserRepository.saveAndFlush(dayUserEntity);
        Long userId = user.getId();
        // Get all the dayUserList where user equals to userId
        defaultDayUserShouldBeFound("userId.equals=" + userId);

        // Get all the dayUserList where user equals to (userId + 1)
        defaultDayUserShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    @Test
    @Transactional
    void getAllDayUsersByDayPlanIsEqualToSomething() throws Exception {
        DayPlanEntity dayPlan;
        if (TestUtil.findAll(em, DayPlanEntity.class).isEmpty()) {
            dayUserRepository.saveAndFlush(dayUserEntity);
            dayPlan = DayPlanResourceIT.createEntity(em);
        } else {
            dayPlan = TestUtil.findAll(em, DayPlanEntity.class).get(0);
        }
        em.persist(dayPlan);
        em.flush();
        dayUserEntity.setDayPlan(dayPlan);
        dayUserRepository.saveAndFlush(dayUserEntity);
        Long dayPlanId = dayPlan.getId();
        // Get all the dayUserList where dayPlan equals to dayPlanId
        defaultDayUserShouldBeFound("dayPlanId.equals=" + dayPlanId);

        // Get all the dayUserList where dayPlan equals to (dayPlanId + 1)
        defaultDayUserShouldNotBeFound("dayPlanId.equals=" + (dayPlanId + 1));
    }

    private void defaultDayUserFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultDayUserShouldBeFound(shouldBeFound);
        defaultDayUserShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDayUserShouldBeFound(String filter) throws Exception {
        restDayUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayUserEntity.getId().intValue())));

        // Check, that the count call also returns 1
        restDayUserMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultDayUserShouldNotBeFound(String filter) throws Exception {
        restDayUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDayUserMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingDayUser() throws Exception {
        // Get the dayUser
        restDayUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDayUser() throws Exception {
        // Initialize the database
        insertedDayUserEntity = dayUserRepository.saveAndFlush(dayUserEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayUser
        DayUserEntity updatedDayUserEntity = dayUserRepository.findById(dayUserEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDayUserEntity are not directly saved in db
        em.detach(updatedDayUserEntity);
        DayUserDTO dayUserDTO = dayUserMapper.toDto(updatedDayUserEntity);

        restDayUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayUserDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayUserDTO))
            )
            .andExpect(status().isOk());

        // Validate the DayUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDayUserEntityToMatchAllProperties(updatedDayUserEntity);
    }

    @Test
    @Transactional
    void putNonExistingDayUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserEntity.setId(longCount.incrementAndGet());

        // Create the DayUser
        DayUserDTO dayUserDTO = dayUserMapper.toDto(dayUserEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayUserDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDayUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserEntity.setId(longCount.incrementAndGet());

        // Create the DayUser
        DayUserDTO dayUserDTO = dayUserMapper.toDto(dayUserEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDayUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserEntity.setId(longCount.incrementAndGet());

        // Create the DayUser
        DayUserDTO dayUserDTO = dayUserMapper.toDto(dayUserEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayUserMockMvc
            .perform(put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayUserDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDayUserWithPatch() throws Exception {
        // Initialize the database
        insertedDayUserEntity = dayUserRepository.saveAndFlush(dayUserEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayUser using partial update
        DayUserEntity partialUpdatedDayUserEntity = new DayUserEntity();
        partialUpdatedDayUserEntity.setId(dayUserEntity.getId());

        restDayUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayUserEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayUserEntity))
            )
            .andExpect(status().isOk());

        // Validate the DayUser in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayUserEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDayUserEntity, dayUserEntity),
            getPersistedDayUserEntity(dayUserEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateDayUserWithPatch() throws Exception {
        // Initialize the database
        insertedDayUserEntity = dayUserRepository.saveAndFlush(dayUserEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayUser using partial update
        DayUserEntity partialUpdatedDayUserEntity = new DayUserEntity();
        partialUpdatedDayUserEntity.setId(dayUserEntity.getId());

        restDayUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayUserEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayUserEntity))
            )
            .andExpect(status().isOk());

        // Validate the DayUser in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayUserEntityUpdatableFieldsEquals(partialUpdatedDayUserEntity, getPersistedDayUserEntity(partialUpdatedDayUserEntity));
    }

    @Test
    @Transactional
    void patchNonExistingDayUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserEntity.setId(longCount.incrementAndGet());

        // Create the DayUser
        DayUserDTO dayUserDTO = dayUserMapper.toDto(dayUserEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dayUserDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDayUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserEntity.setId(longCount.incrementAndGet());

        // Create the DayUser
        DayUserDTO dayUserDTO = dayUserMapper.toDto(dayUserEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDayUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserEntity.setId(longCount.incrementAndGet());

        // Create the DayUser
        DayUserDTO dayUserDTO = dayUserMapper.toDto(dayUserEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayUserMockMvc
            .perform(
                patch(ENTITY_API_URL).with(csrf()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(dayUserDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDayUser() throws Exception {
        // Initialize the database
        insertedDayUserEntity = dayUserRepository.saveAndFlush(dayUserEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the dayUser
        restDayUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, dayUserEntity.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return dayUserRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected DayUserEntity getPersistedDayUserEntity(DayUserEntity dayUser) {
        return dayUserRepository.findById(dayUser.getId()).orElseThrow();
    }

    protected void assertPersistedDayUserEntityToMatchAllProperties(DayUserEntity expectedDayUserEntity) {
        assertDayUserEntityAllPropertiesEquals(expectedDayUserEntity, getPersistedDayUserEntity(expectedDayUserEntity));
    }

    protected void assertPersistedDayUserEntityToMatchUpdatableProperties(DayUserEntity expectedDayUserEntity) {
        assertDayUserEntityAllUpdatablePropertiesEquals(expectedDayUserEntity, getPersistedDayUserEntity(expectedDayUserEntity));
    }
}
