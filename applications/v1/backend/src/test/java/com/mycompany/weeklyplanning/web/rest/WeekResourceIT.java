package com.mycompany.weeklyplanning.web.rest;

import static com.mycompany.weeklyplanning.domain.WeekEntityAsserts.*;
import static com.mycompany.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.weeklyplanning.IntegrationTest;
import com.mycompany.weeklyplanning.domain.WeekEntity;
import com.mycompany.weeklyplanning.repository.WeekRepository;
import com.mycompany.weeklyplanning.service.dto.WeekDTO;
import com.mycompany.weeklyplanning.service.mapper.WeekMapper;
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
 * Integration tests for the {@link WeekResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WeekResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_START_DATE = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_END_DATE = LocalDate.ofEpochDay(-1L);

    private static final String ENTITY_API_URL = "/api/weeks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private WeekRepository weekRepository;

    @Autowired
    private WeekMapper weekMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWeekMockMvc;

    private WeekEntity weekEntity;

    private WeekEntity insertedWeekEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WeekEntity createEntity() {
        return new WeekEntity().label(DEFAULT_LABEL).startDate(DEFAULT_START_DATE).endDate(DEFAULT_END_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WeekEntity createUpdatedEntity() {
        return new WeekEntity().label(UPDATED_LABEL).startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);
    }

    @BeforeEach
    void initTest() {
        weekEntity = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedWeekEntity != null) {
            weekRepository.delete(insertedWeekEntity);
            insertedWeekEntity = null;
        }
    }

    @Test
    @Transactional
    void createWeek() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);
        var returnedWeekDTO = om.readValue(
            restWeekMockMvc
                .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            WeekDTO.class
        );

        // Validate the Week in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedWeekEntity = weekMapper.toEntity(returnedWeekDTO);
        assertWeekEntityUpdatableFieldsEquals(returnedWeekEntity, getPersistedWeekEntity(returnedWeekEntity));

        insertedWeekEntity = returnedWeekEntity;
    }

    @Test
    @Transactional
    void createWeekWithExistingId() throws Exception {
        // Create the Week with an existing ID
        weekEntity.setId(1L);
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWeekMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkLabelIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        weekEntity.setLabel(null);

        // Create the Week, which fails.
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        restWeekMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStartDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        weekEntity.setStartDate(null);

        // Create the Week, which fails.
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        restWeekMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEndDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        weekEntity.setEndDate(null);

        // Create the Week, which fails.
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        restWeekMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllWeeks() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList
        restWeekMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(weekEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    void getWeek() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get the week
        restWeekMockMvc
            .perform(get(ENTITY_API_URL_ID, weekEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(weekEntity.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    void getWeeksByIdFiltering() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        Long id = weekEntity.getId();

        defaultWeekFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultWeekFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultWeekFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllWeeksByLabelIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where label equals to
        defaultWeekFiltering("label.equals=" + DEFAULT_LABEL, "label.equals=" + UPDATED_LABEL);
    }

    @Test
    @Transactional
    void getAllWeeksByLabelIsInShouldWork() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where label in
        defaultWeekFiltering("label.in=" + DEFAULT_LABEL + "," + UPDATED_LABEL, "label.in=" + UPDATED_LABEL);
    }

    @Test
    @Transactional
    void getAllWeeksByLabelIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where label is not null
        defaultWeekFiltering("label.specified=true", "label.specified=false");
    }

    @Test
    @Transactional
    void getAllWeeksByLabelContainsSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where label contains
        defaultWeekFiltering("label.contains=" + DEFAULT_LABEL, "label.contains=" + UPDATED_LABEL);
    }

    @Test
    @Transactional
    void getAllWeeksByLabelNotContainsSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where label does not contain
        defaultWeekFiltering("label.doesNotContain=" + UPDATED_LABEL, "label.doesNotContain=" + DEFAULT_LABEL);
    }

    @Test
    @Transactional
    void getAllWeeksByStartDateIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where startDate equals to
        defaultWeekFiltering("startDate.equals=" + DEFAULT_START_DATE, "startDate.equals=" + UPDATED_START_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByStartDateIsInShouldWork() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where startDate in
        defaultWeekFiltering("startDate.in=" + DEFAULT_START_DATE + "," + UPDATED_START_DATE, "startDate.in=" + UPDATED_START_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByStartDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where startDate is not null
        defaultWeekFiltering("startDate.specified=true", "startDate.specified=false");
    }

    @Test
    @Transactional
    void getAllWeeksByStartDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where startDate is greater than or equal to
        defaultWeekFiltering("startDate.greaterThanOrEqual=" + DEFAULT_START_DATE, "startDate.greaterThanOrEqual=" + UPDATED_START_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByStartDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where startDate is less than or equal to
        defaultWeekFiltering("startDate.lessThanOrEqual=" + DEFAULT_START_DATE, "startDate.lessThanOrEqual=" + SMALLER_START_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByStartDateIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where startDate is less than
        defaultWeekFiltering("startDate.lessThan=" + UPDATED_START_DATE, "startDate.lessThan=" + DEFAULT_START_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByStartDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where startDate is greater than
        defaultWeekFiltering("startDate.greaterThan=" + SMALLER_START_DATE, "startDate.greaterThan=" + DEFAULT_START_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByEndDateIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where endDate equals to
        defaultWeekFiltering("endDate.equals=" + DEFAULT_END_DATE, "endDate.equals=" + UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByEndDateIsInShouldWork() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where endDate in
        defaultWeekFiltering("endDate.in=" + DEFAULT_END_DATE + "," + UPDATED_END_DATE, "endDate.in=" + UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByEndDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where endDate is not null
        defaultWeekFiltering("endDate.specified=true", "endDate.specified=false");
    }

    @Test
    @Transactional
    void getAllWeeksByEndDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where endDate is greater than or equal to
        defaultWeekFiltering("endDate.greaterThanOrEqual=" + DEFAULT_END_DATE, "endDate.greaterThanOrEqual=" + UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByEndDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where endDate is less than or equal to
        defaultWeekFiltering("endDate.lessThanOrEqual=" + DEFAULT_END_DATE, "endDate.lessThanOrEqual=" + SMALLER_END_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByEndDateIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where endDate is less than
        defaultWeekFiltering("endDate.lessThan=" + UPDATED_END_DATE, "endDate.lessThan=" + DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    void getAllWeeksByEndDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        // Get all the weekList where endDate is greater than
        defaultWeekFiltering("endDate.greaterThan=" + SMALLER_END_DATE, "endDate.greaterThan=" + DEFAULT_END_DATE);
    }

    private void defaultWeekFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultWeekShouldBeFound(shouldBeFound);
        defaultWeekShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultWeekShouldBeFound(String filter) throws Exception {
        restWeekMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(weekEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));

        // Check, that the count call also returns 1
        restWeekMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultWeekShouldNotBeFound(String filter) throws Exception {
        restWeekMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restWeekMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingWeek() throws Exception {
        // Get the week
        restWeekMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingWeek() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the week
        WeekEntity updatedWeekEntity = weekRepository.findById(weekEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedWeekEntity are not directly saved in db
        em.detach(updatedWeekEntity);
        updatedWeekEntity.label(UPDATED_LABEL).startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);
        WeekDTO weekDTO = weekMapper.toDto(updatedWeekEntity);

        restWeekMockMvc
            .perform(
                put(ENTITY_API_URL_ID, weekDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(weekDTO))
            )
            .andExpect(status().isOk());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedWeekEntityToMatchAllProperties(updatedWeekEntity);
    }

    @Test
    @Transactional
    void putNonExistingWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        weekEntity.setId(longCount.incrementAndGet());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(
                put(ENTITY_API_URL_ID, weekDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(weekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        weekEntity.setId(longCount.incrementAndGet());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(weekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        weekEntity.setId(longCount.incrementAndGet());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWeekWithPatch() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the week using partial update
        WeekEntity partialUpdatedWeekEntity = new WeekEntity();
        partialUpdatedWeekEntity.setId(weekEntity.getId());

        partialUpdatedWeekEntity.startDate(UPDATED_START_DATE);

        restWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWeekEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWeekEntity))
            )
            .andExpect(status().isOk());

        // Validate the Week in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWeekEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedWeekEntity, weekEntity),
            getPersistedWeekEntity(weekEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateWeekWithPatch() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the week using partial update
        WeekEntity partialUpdatedWeekEntity = new WeekEntity();
        partialUpdatedWeekEntity.setId(weekEntity.getId());

        partialUpdatedWeekEntity.label(UPDATED_LABEL).startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);

        restWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWeekEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWeekEntity))
            )
            .andExpect(status().isOk());

        // Validate the Week in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWeekEntityUpdatableFieldsEquals(partialUpdatedWeekEntity, getPersistedWeekEntity(partialUpdatedWeekEntity));
    }

    @Test
    @Transactional
    void patchNonExistingWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        weekEntity.setId(longCount.incrementAndGet());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, weekDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(weekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        weekEntity.setId(longCount.incrementAndGet());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(weekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        weekEntity.setId(longCount.incrementAndGet());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(weekEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(patch(ENTITY_API_URL).with(csrf()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWeek() throws Exception {
        // Initialize the database
        insertedWeekEntity = weekRepository.saveAndFlush(weekEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the week
        restWeekMockMvc
            .perform(delete(ENTITY_API_URL_ID, weekEntity.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return weekRepository.count();
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

    protected WeekEntity getPersistedWeekEntity(WeekEntity week) {
        return weekRepository.findById(week.getId()).orElseThrow();
    }

    protected void assertPersistedWeekEntityToMatchAllProperties(WeekEntity expectedWeekEntity) {
        assertWeekEntityAllPropertiesEquals(expectedWeekEntity, getPersistedWeekEntity(expectedWeekEntity));
    }

    protected void assertPersistedWeekEntityToMatchUpdatableProperties(WeekEntity expectedWeekEntity) {
        assertWeekEntityAllUpdatablePropertiesEquals(expectedWeekEntity, getPersistedWeekEntity(expectedWeekEntity));
    }
}
