package com.mycompany.weeklyplanning.web.rest;

import static com.mycompany.weeklyplanning.domain.DayPlanEntityAsserts.*;
import static com.mycompany.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.weeklyplanning.IntegrationTest;
import com.mycompany.weeklyplanning.domain.DayPlanEntity;
import com.mycompany.weeklyplanning.domain.WeekEntity;
import com.mycompany.weeklyplanning.repository.DayPlanRepository;
import com.mycompany.weeklyplanning.service.dto.DayPlanDTO;
import com.mycompany.weeklyplanning.service.mapper.DayPlanMapper;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link DayPlanResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DayPlanResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE = LocalDate.ofEpochDay(-1L);

    private static final String ENTITY_API_URL = "/api/day-plans";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

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

    private DayPlanEntity dayPlanEntity;

    private DayPlanEntity insertedDayPlanEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayPlanEntity createEntity(EntityManager em) {
        DayPlanEntity dayPlanEntity = new DayPlanEntity().date(DEFAULT_DATE);
        // Add required entity
        WeekEntity week;
        if (TestUtil.findAll(em, WeekEntity.class).isEmpty()) {
            week = WeekResourceIT.createEntity();
            em.persist(week);
            em.flush();
        } else {
            week = TestUtil.findAll(em, WeekEntity.class).get(0);
        }
        dayPlanEntity.setWeek(week);
        return dayPlanEntity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayPlanEntity createUpdatedEntity(EntityManager em) {
        DayPlanEntity updatedDayPlanEntity = new DayPlanEntity().date(UPDATED_DATE);
        // Add required entity
        WeekEntity week;
        if (TestUtil.findAll(em, WeekEntity.class).isEmpty()) {
            week = WeekResourceIT.createUpdatedEntity();
            em.persist(week);
            em.flush();
        } else {
            week = TestUtil.findAll(em, WeekEntity.class).get(0);
        }
        updatedDayPlanEntity.setWeek(week);
        return updatedDayPlanEntity;
    }

    @BeforeEach
    void initTest() {
        dayPlanEntity = createEntity(em);
    }

    @AfterEach
    void cleanup() {
        if (insertedDayPlanEntity != null) {
            dayPlanRepository.delete(insertedDayPlanEntity);
            insertedDayPlanEntity = null;
        }
    }

    @Test
    @Transactional
    void createDayPlan() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);
        var returnedDayPlanDTO = om.readValue(
            restDayPlanMockMvc
                .perform(
                    post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DayPlanDTO.class
        );

        // Validate the DayPlan in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDayPlanEntity = dayPlanMapper.toEntity(returnedDayPlanDTO);
        assertDayPlanEntityUpdatableFieldsEquals(returnedDayPlanEntity, getPersistedDayPlanEntity(returnedDayPlanEntity));

        insertedDayPlanEntity = returnedDayPlanEntity;
    }

    @Test
    @Transactional
    void createDayPlanWithExistingId() throws Exception {
        // Create the DayPlan with an existing ID
        dayPlanEntity.setId(1L);
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayPlanMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        dayPlanEntity.setDate(null);

        // Create the DayPlan, which fails.
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);

        restDayPlanMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDayPlans() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get all the dayPlanList
        restDayPlanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayPlanEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    void getDayPlan() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get the dayPlan
        restDayPlanMockMvc
            .perform(get(ENTITY_API_URL_ID, dayPlanEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dayPlanEntity.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getDayPlansByIdFiltering() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        Long id = dayPlanEntity.getId();

        defaultDayPlanFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultDayPlanFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultDayPlanFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllDayPlansByDateIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get all the dayPlanList where date equals to
        defaultDayPlanFiltering("date.equals=" + DEFAULT_DATE, "date.equals=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    void getAllDayPlansByDateIsInShouldWork() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get all the dayPlanList where date in
        defaultDayPlanFiltering("date.in=" + DEFAULT_DATE + "," + UPDATED_DATE, "date.in=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    void getAllDayPlansByDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get all the dayPlanList where date is not null
        defaultDayPlanFiltering("date.specified=true", "date.specified=false");
    }

    @Test
    @Transactional
    void getAllDayPlansByDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get all the dayPlanList where date is greater than or equal to
        defaultDayPlanFiltering("date.greaterThanOrEqual=" + DEFAULT_DATE, "date.greaterThanOrEqual=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    void getAllDayPlansByDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get all the dayPlanList where date is less than or equal to
        defaultDayPlanFiltering("date.lessThanOrEqual=" + DEFAULT_DATE, "date.lessThanOrEqual=" + SMALLER_DATE);
    }

    @Test
    @Transactional
    void getAllDayPlansByDateIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get all the dayPlanList where date is less than
        defaultDayPlanFiltering("date.lessThan=" + UPDATED_DATE, "date.lessThan=" + DEFAULT_DATE);
    }

    @Test
    @Transactional
    void getAllDayPlansByDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        // Get all the dayPlanList where date is greater than
        defaultDayPlanFiltering("date.greaterThan=" + SMALLER_DATE, "date.greaterThan=" + DEFAULT_DATE);
    }

    @Test
    @Transactional
    void getAllDayPlansByWeekIsEqualToSomething() throws Exception {
        WeekEntity week;
        if (TestUtil.findAll(em, WeekEntity.class).isEmpty()) {
            dayPlanRepository.saveAndFlush(dayPlanEntity);
            week = WeekResourceIT.createEntity();
        } else {
            week = TestUtil.findAll(em, WeekEntity.class).get(0);
        }
        em.persist(week);
        em.flush();
        dayPlanEntity.setWeek(week);
        dayPlanRepository.saveAndFlush(dayPlanEntity);
        Long weekId = week.getId();
        // Get all the dayPlanList where week equals to weekId
        defaultDayPlanShouldBeFound("weekId.equals=" + weekId);

        // Get all the dayPlanList where week equals to (weekId + 1)
        defaultDayPlanShouldNotBeFound("weekId.equals=" + (weekId + 1));
    }

    private void defaultDayPlanFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultDayPlanShouldBeFound(shouldBeFound);
        defaultDayPlanShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDayPlanShouldBeFound(String filter) throws Exception {
        restDayPlanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayPlanEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));

        // Check, that the count call also returns 1
        restDayPlanMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultDayPlanShouldNotBeFound(String filter) throws Exception {
        restDayPlanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDayPlanMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingDayPlan() throws Exception {
        // Get the dayPlan
        restDayPlanMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDayPlan() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPlan
        DayPlanEntity updatedDayPlanEntity = dayPlanRepository.findById(dayPlanEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDayPlanEntity are not directly saved in db
        em.detach(updatedDayPlanEntity);
        updatedDayPlanEntity.date(UPDATED_DATE);
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(updatedDayPlanEntity);

        restDayPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayPlanDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isOk());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDayPlanEntityToMatchAllProperties(updatedDayPlanEntity);
    }

    @Test
    @Transactional
    void putNonExistingDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlanEntity.setId(longCount.incrementAndGet());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayPlanDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlanEntity.setId(longCount.incrementAndGet());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlanEntity.setId(longCount.incrementAndGet());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPlanDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDayPlanWithPatch() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPlan using partial update
        DayPlanEntity partialUpdatedDayPlanEntity = new DayPlanEntity();
        partialUpdatedDayPlanEntity.setId(dayPlanEntity.getId());

        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayPlanEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayPlanEntity))
            )
            .andExpect(status().isOk());

        // Validate the DayPlan in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayPlanEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDayPlanEntity, dayPlanEntity),
            getPersistedDayPlanEntity(dayPlanEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateDayPlanWithPatch() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPlan using partial update
        DayPlanEntity partialUpdatedDayPlanEntity = new DayPlanEntity();
        partialUpdatedDayPlanEntity.setId(dayPlanEntity.getId());

        partialUpdatedDayPlanEntity.date(UPDATED_DATE);

        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayPlanEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayPlanEntity))
            )
            .andExpect(status().isOk());

        // Validate the DayPlan in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayPlanEntityUpdatableFieldsEquals(partialUpdatedDayPlanEntity, getPersistedDayPlanEntity(partialUpdatedDayPlanEntity));
    }

    @Test
    @Transactional
    void patchNonExistingDayPlan() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPlanEntity.setId(longCount.incrementAndGet());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dayPlanDTO.getId())
                    .with(csrf())
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
        dayPlanEntity.setId(longCount.incrementAndGet());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
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
        dayPlanEntity.setId(longCount.incrementAndGet());

        // Create the DayPlan
        DayPlanDTO dayPlanDTO = dayPlanMapper.toDto(dayPlanEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPlanMockMvc
            .perform(
                patch(ENTITY_API_URL).with(csrf()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(dayPlanDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayPlan in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDayPlan() throws Exception {
        // Initialize the database
        insertedDayPlanEntity = dayPlanRepository.saveAndFlush(dayPlanEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the dayPlan
        restDayPlanMockMvc
            .perform(delete(ENTITY_API_URL_ID, dayPlanEntity.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
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

    protected DayPlanEntity getPersistedDayPlanEntity(DayPlanEntity dayPlan) {
        return dayPlanRepository.findById(dayPlan.getId()).orElseThrow();
    }

    protected void assertPersistedDayPlanEntityToMatchAllProperties(DayPlanEntity expectedDayPlanEntity) {
        assertDayPlanEntityAllPropertiesEquals(expectedDayPlanEntity, getPersistedDayPlanEntity(expectedDayPlanEntity));
    }

    protected void assertPersistedDayPlanEntityToMatchUpdatableProperties(DayPlanEntity expectedDayPlanEntity) {
        assertDayPlanEntityAllUpdatablePropertiesEquals(expectedDayPlanEntity, getPersistedDayPlanEntity(expectedDayPlanEntity));
    }
}
