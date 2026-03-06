package com.weeklyplanning.web.rest;

import static com.weeklyplanning.domain.WeekAsserts.*;
import static com.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weeklyplanning.IntegrationTest;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.repository.WeekRepository;
import com.weeklyplanning.service.dto.WeekDTO;
import com.weeklyplanning.service.mapper.WeekMapper;
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
 * Integration tests for the {@link WeekResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WeekResourceIT {

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final WeekStatus DEFAULT_STATUS = WeekStatus.PLANNED;
    private static final WeekStatus UPDATED_STATUS = WeekStatus.COMPLETED;

    private static final String ENTITY_API_URL = "/api/weeks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

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

    private Week week;

    private Week insertedWeek;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Week createEntity() {
        return new Week().startDate(DEFAULT_START_DATE).endDate(DEFAULT_END_DATE).status(DEFAULT_STATUS);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Week createUpdatedEntity() {
        return new Week().startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE).status(UPDATED_STATUS);
    }

    @BeforeEach
    void initTest() {
        week = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedWeek != null) {
            weekRepository.delete(insertedWeek);
            insertedWeek = null;
        }
    }

    @Test
    @Transactional
    void createWeek() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);
        var returnedWeekDTO = om.readValue(
            restWeekMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            WeekDTO.class
        );

        // Validate the Week in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedWeek = weekMapper.toEntity(returnedWeekDTO);
        assertWeekUpdatableFieldsEquals(returnedWeek, getPersistedWeek(returnedWeek));

        insertedWeek = returnedWeek;
    }

    @Test
    @Transactional
    void createWeekWithExistingId() throws Exception {
        // Create the Week with an existing ID
        insertedWeek = weekRepository.saveAndFlush(week);
        WeekDTO weekDTO = weekMapper.toDto(week);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWeekMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkStartDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        week.setStartDate(null);

        // Create the Week, which fails.
        WeekDTO weekDTO = weekMapper.toDto(week);

        restWeekMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEndDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        week.setEndDate(null);

        // Create the Week, which fails.
        WeekDTO weekDTO = weekMapper.toDto(week);

        restWeekMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStatusIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        week.setStatus(null);

        // Create the Week, which fails.
        WeekDTO weekDTO = weekMapper.toDto(week);

        restWeekMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllWeeks() throws Exception {
        // Initialize the database
        insertedWeek = weekRepository.saveAndFlush(week);

        // Get all the weekList
        restWeekMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(week.getId().toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    void getWeek() throws Exception {
        // Initialize the database
        insertedWeek = weekRepository.saveAndFlush(week);

        // Get the week
        restWeekMockMvc
            .perform(get(ENTITY_API_URL_ID, week.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(week.getId().toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    void getNonExistingWeek() throws Exception {
        // Get the week
        restWeekMockMvc.perform(get(ENTITY_API_URL_ID, UUID.randomUUID().toString())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingWeek() throws Exception {
        // Initialize the database
        insertedWeek = weekRepository.saveAndFlush(week);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the week
        Week updatedWeek = weekRepository.findById(week.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedWeek are not directly saved in db
        em.detach(updatedWeek);
        updatedWeek.startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE).status(UPDATED_STATUS);
        WeekDTO weekDTO = weekMapper.toDto(updatedWeek);

        restWeekMockMvc
            .perform(put(ENTITY_API_URL_ID, weekDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isOk());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedWeekToMatchAllProperties(updatedWeek);
    }

    @Test
    @Transactional
    void putNonExistingWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        week.setId(UUID.randomUUID());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(put(ENTITY_API_URL_ID, weekDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        week.setId(UUID.randomUUID());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        week.setId(UUID.randomUUID());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWeekWithPatch() throws Exception {
        // Initialize the database
        insertedWeek = weekRepository.saveAndFlush(week);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the week using partial update
        Week partialUpdatedWeek = new Week();
        partialUpdatedWeek.setId(week.getId());

        partialUpdatedWeek.status(UPDATED_STATUS);

        restWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWeek.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWeek))
            )
            .andExpect(status().isOk());

        // Validate the Week in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWeekUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedWeek, week), getPersistedWeek(week));
    }

    @Test
    @Transactional
    void fullUpdateWeekWithPatch() throws Exception {
        // Initialize the database
        insertedWeek = weekRepository.saveAndFlush(week);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the week using partial update
        Week partialUpdatedWeek = new Week();
        partialUpdatedWeek.setId(week.getId());

        partialUpdatedWeek.startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE).status(UPDATED_STATUS);

        restWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWeek.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWeek))
            )
            .andExpect(status().isOk());

        // Validate the Week in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWeekUpdatableFieldsEquals(partialUpdatedWeek, getPersistedWeek(partialUpdatedWeek));
    }

    @Test
    @Transactional
    void patchNonExistingWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        week.setId(UUID.randomUUID());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, weekDTO.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(weekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        week.setId(UUID.randomUUID());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID())
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
        week.setId(UUID.randomUUID());

        // Create the Week
        WeekDTO weekDTO = weekMapper.toDto(week);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWeekMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(weekDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Week in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWeek() throws Exception {
        // Initialize the database
        insertedWeek = weekRepository.saveAndFlush(week);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the week
        restWeekMockMvc
            .perform(delete(ENTITY_API_URL_ID, week.getId().toString()).accept(MediaType.APPLICATION_JSON))
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

    protected Week getPersistedWeek(Week week) {
        return weekRepository.findById(week.getId()).orElseThrow();
    }

    protected void assertPersistedWeekToMatchAllProperties(Week expectedWeek) {
        assertWeekAllPropertiesEquals(expectedWeek, getPersistedWeek(expectedWeek));
    }

    protected void assertPersistedWeekToMatchUpdatableProperties(Week expectedWeek) {
        assertWeekAllUpdatablePropertiesEquals(expectedWeek, getPersistedWeek(expectedWeek));
    }
}
