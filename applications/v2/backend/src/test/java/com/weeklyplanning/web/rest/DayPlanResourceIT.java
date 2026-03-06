package com.weeklyplanning.web.rest;

import static com.weeklyplanning.domain.DayPlanAsserts.*;
import static com.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weeklyplanning.IntegrationTest;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.repository.DayPlanRepository;
import com.weeklyplanning.service.dto.DayPlanDTO;
import com.weeklyplanning.service.mapper.DayPlanMapper;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;
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
 * Integration tests for the {@link DayPlanResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DayPlanResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/day-plans";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DayPlanRepository dayPlanRepository;

    @Autowired
    private DayPlanMapper dayPlanMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDayPlanMockMvc;

    private DayPlan dayPlan;

    private DayPlan insertedDayPlan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayPlan createEntity(EntityManager em) {
        DayPlan dayPlan = new DayPlan().date(DEFAULT_DATE);
        // Add required entity
        Week week;
        if (TestUtil.findAll(em, Week.class).isEmpty()) {
            week = WeekResourceIT.createEntity();
            em.persist(week);
            em.flush();
        } else {
            week = TestUtil.findAll(em, Week.class).get(0);
        }
        dayPlan.setWeek(week);
        return dayPlan;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayPlan createUpdatedEntity(EntityManager em) {
        DayPlan updatedDayPlan = new DayPlan().date(UPDATED_DATE);
        // Add required entity
        Week week;
        if (TestUtil.findAll(em, Week.class).isEmpty()) {
            week = WeekResourceIT.createUpdatedEntity();
            em.persist(week);
            em.flush();
        } else {
            week = TestUtil.findAll(em, Week.class).get(0);
        }
        updatedDayPlan.setWeek(week);
        return updatedDayPlan;
    }

    @BeforeEach
    void initTest() {
        dayPlan = createEntity(em);
    }

    @AfterEach
    void cleanup() {
        if (insertedDayPlan != null) {
            dayPlanRepository.delete(insertedDayPlan);
            insertedDayPlan = null;
        }
    }

    @Test
    @Transactional
    void createDayPlan() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);
        var returnedDayPlanDTO = om.readValue(
            restDayPlanMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DayPlanDTO.class
        );

        // Validate the DayPlan in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDayPlan = dayPlanMapper.toEntity(returnedDayPlanDTO);
        assertDayPlanUpdatableFieldsEquals(returnedDayPlan, getPersistedDayPlan(returnedDayPlan));

        insertedDayPlan = returnedDayPlan;
    }

    @Test
    @Transactional
    void createDayPlanWithExistingId() throws Exception {
        // Create the DayPlan with an existing ID
        insertedDayPlan = dayPlanRepository.saveAndFlush(dayPlan);
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        dayPlan.setDate(null);

        // Create the DayPlan, which fails.
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);

        restDayPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDayPlans() throws Exception {
        // Initialize the database
        insertedDayPlan = dayPlanRepository.saveAndFlush(dayPlan);

        // Get all the dayPlanList
        restDayPlanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayPlan.getId().toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    void getDayPlan() throws Exception {
        // Initialize the database
        insertedDayPlan = dayPlanRepository.saveAndFlush(dayPlan);

        // Get the dayPlan
        restDayPlanMockMvc
            .perform(get(ENTITY_API_URL_ID, dayPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dayPlan.getId().toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingDayPlan() throws Exception {
        // Get the dayPlan
        restDayPlanMockMvc.perform(get(ENTITY_API_URL_ID, UUID.randomUUID().toString())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDayPlan() throws Exception {
        // Initialize the database
        insertedDayPlan = dayPlanRepository.saveAndFlush(dayPlan);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPlan
        DayPlan updatedDayPlan = dayPlanRepository.findById(dayPlan.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDayPlan are not directly saved in db
        em.detach(updatedDayPlan);
        updatedDayPlan.date(UPDATED_DATE);
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(updatedDayPlan);

        restDayPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayPlanDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isOk());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDayPlanToMatchAllProperties(updatedDayPlan);
    }

    @Test
    @Transactional
    void putNonExistingDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlan.setId(UUID.randomUUID());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayPlanDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlan.setId(UUID.randomUUID());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlan.setId(UUID.randomUUID());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDayPlanWithPatch() throws Exception {
        // Initialize the database
        insertedDayPlan = dayPlanRepository.saveAndFlush(dayPlan);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPlan using partial update
        DayPlan partialUpdatedDayPlan = new DayPlan();
        partialUpdatedDayPlan.setId(dayPlan.getId());

        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayPlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayPlan))
            )
            .andExpect(status().isOk());

        // Validate the DayPlan in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayPlanUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedDayPlan, dayPlan), getPersistedDayPlan(dayPlan));
    }

    @Test
    @Transactional
    void fullUpdateDayPlanWithPatch() throws Exception {
        // Initialize the database
        insertedDayPlan = dayPlanRepository.saveAndFlush(dayPlan);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPlan using partial update
        DayPlan partialUpdatedDayPlan = new DayPlan();
        partialUpdatedDayPlan.setId(dayPlan.getId());

        partialUpdatedDayPlan.date(UPDATED_DATE);

        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayPlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayPlan))
            )
            .andExpect(status().isOk());

        // Validate the DayPlan in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayPlanUpdatableFieldsEquals(partialUpdatedDayPlan, getPersistedDayPlan(partialUpdatedDayPlan));
    }

    @Test
    @Transactional
    void patchNonExistingDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlan.setId(UUID.randomUUID());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dayPlanDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlan.setId(UUID.randomUUID());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlan.setId(UUID.randomUUID());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlan);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(dayPlanDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDayPlan() throws Exception {
        // Initialize the database
        insertedDayPlan = dayPlanRepository.saveAndFlush(dayPlan);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the dayPlan
        restDayPlanMockMvc
            .perform(delete(ENTITY_API_URL_ID, dayPlan.getId().toString()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return dayPlanRepository.count();
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

    protected DayPlan getPersistedDayPlan(DayPlan dayPlan) {
        return dayPlanRepository.findById(dayPlan.getId()).orElseThrow();
    }

    protected void assertPersistedDayPlanToMatchAllProperties(DayPlan expectedDayPlan) {
        assertDayPlanAllPropertiesEquals(expectedDayPlan, getPersistedDayPlan(expectedDayPlan));
    }

    protected void assertPersistedDayPlanToMatchUpdatableProperties(DayPlan expectedDayPlan) {
        assertDayPlanAllUpdatablePropertiesEquals(expectedDayPlan, getPersistedDayPlan(expectedDayPlan));
    }
}
