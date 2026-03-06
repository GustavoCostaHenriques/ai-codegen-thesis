package com.weeklyplanning.web.rest;

import static com.weeklyplanning.domain.DayPersonAsserts.*;
import static com.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weeklyplanning.IntegrationTest;
import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.repository.DayPersonRepository;
import com.weeklyplanning.service.dto.DayPersonDTO;
import com.weeklyplanning.service.mapper.DayPersonMapper;
import jakarta.persistence.EntityManager;
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
 * Integration tests for the {@link DayPersonResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DayPersonResourceIT {

    private static final String ENTITY_API_URL = "/api/day-people";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DayPersonRepository dayPersonRepository;

    @Autowired
    private DayPersonMapper dayPersonMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDayPersonMockMvc;

    private DayPerson dayPerson;

    private DayPerson insertedDayPerson;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayPerson createEntity(EntityManager em) {
        DayPerson dayPerson = new DayPerson();
        // Add required entity
        Person person;
        if (TestUtil.findAll(em, Person.class).isEmpty()) {
            person = PersonResourceIT.createEntity();
            em.persist(person);
            em.flush();
        } else {
            person = TestUtil.findAll(em, Person.class).get(0);
        }
        dayPerson.setPerson(person);
        // Add required entity
        DayPlan dayPlan;
        if (TestUtil.findAll(em, DayPlan.class).isEmpty()) {
            dayPlan = DayPlanResourceIT.createEntity(em);
            em.persist(dayPlan);
            em.flush();
        } else {
            dayPlan = TestUtil.findAll(em, DayPlan.class).get(0);
        }
        dayPerson.setDayPlan(dayPlan);
        return dayPerson;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayPerson createUpdatedEntity(EntityManager em) {
        DayPerson updatedDayPerson = new DayPerson();
        // Add required entity
        Person person;
        if (TestUtil.findAll(em, Person.class).isEmpty()) {
            person = PersonResourceIT.createUpdatedEntity();
            em.persist(person);
            em.flush();
        } else {
            person = TestUtil.findAll(em, Person.class).get(0);
        }
        updatedDayPerson.setPerson(person);
        // Add required entity
        DayPlan dayPlan;
        if (TestUtil.findAll(em, DayPlan.class).isEmpty()) {
            dayPlan = DayPlanResourceIT.createUpdatedEntity(em);
            em.persist(dayPlan);
            em.flush();
        } else {
            dayPlan = TestUtil.findAll(em, DayPlan.class).get(0);
        }
        updatedDayPerson.setDayPlan(dayPlan);
        return updatedDayPerson;
    }

    @BeforeEach
    void initTest() {
        dayPerson = createEntity(em);
    }

    @AfterEach
    void cleanup() {
        if (insertedDayPerson != null) {
            dayPersonRepository.delete(insertedDayPerson);
            insertedDayPerson = null;
        }
    }

    @Test
    @Transactional
    void createDayPerson() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DayPerson
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(dayPerson);
        var returnedDayPersonDTO = om.readValue(
            restDayPersonMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPersonDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DayPersonDTO.class
        );

        // Validate the DayPerson in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDayPerson = dayPersonMapper.toEntity(returnedDayPersonDTO);
        assertDayPersonUpdatableFieldsEquals(returnedDayPerson, getPersistedDayPerson(returnedDayPerson));

        insertedDayPerson = returnedDayPerson;
    }

    @Test
    @Transactional
    void createDayPersonWithExistingId() throws Exception {
        // Create the DayPerson with an existing ID
        insertedDayPerson = dayPersonRepository.saveAndFlush(dayPerson);
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(dayPerson);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayPersonMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPersonDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DayPerson in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDayPeople() throws Exception {
        // Initialize the database
        insertedDayPerson = dayPersonRepository.saveAndFlush(dayPerson);

        // Get all the dayPersonList
        restDayPersonMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayPerson.getId().toString())));
    }

    @Test
    @Transactional
    void getDayPerson() throws Exception {
        // Initialize the database
        insertedDayPerson = dayPersonRepository.saveAndFlush(dayPerson);

        // Get the dayPerson
        restDayPersonMockMvc
            .perform(get(ENTITY_API_URL_ID, dayPerson.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dayPerson.getId().toString()));
    }

    @Test
    @Transactional
    void getNonExistingDayPerson() throws Exception {
        // Get the dayPerson
        restDayPersonMockMvc.perform(get(ENTITY_API_URL_ID, UUID.randomUUID().toString())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDayPerson() throws Exception {
        // Initialize the database
        insertedDayPerson = dayPersonRepository.saveAndFlush(dayPerson);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPerson
        DayPerson updatedDayPerson = dayPersonRepository.findById(dayPerson.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDayPerson are not directly saved in db
        em.detach(updatedDayPerson);
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(updatedDayPerson);

        restDayPersonMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayPersonDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPersonDTO))
            )
            .andExpect(status().isOk());

        // Validate the DayPerson in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDayPersonToMatchAllProperties(updatedDayPerson);
    }

    @Test
    @Transactional
    void putNonExistingDayPerson() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPerson.setId(UUID.randomUUID());

        // Create the DayPerson
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(dayPerson);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPersonMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayPersonDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPersonDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPerson in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDayPerson() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPerson.setId(UUID.randomUUID());

        // Create the DayPerson
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(dayPerson);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPersonMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPersonDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPerson in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDayPerson() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPerson.setId(UUID.randomUUID());

        // Create the DayPerson
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(dayPerson);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPersonMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPersonDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayPerson in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDayPersonWithPatch() throws Exception {
        // Initialize the database
        insertedDayPerson = dayPersonRepository.saveAndFlush(dayPerson);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPerson using partial update
        DayPerson partialUpdatedDayPerson = new DayPerson();
        partialUpdatedDayPerson.setId(dayPerson.getId());

        restDayPersonMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayPerson.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayPerson))
            )
            .andExpect(status().isOk());

        // Validate the DayPerson in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayPersonUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDayPerson, dayPerson),
            getPersistedDayPerson(dayPerson)
        );
    }

    @Test
    @Transactional
    void fullUpdateDayPersonWithPatch() throws Exception {
        // Initialize the database
        insertedDayPerson = dayPersonRepository.saveAndFlush(dayPerson);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPerson using partial update
        DayPerson partialUpdatedDayPerson = new DayPerson();
        partialUpdatedDayPerson.setId(dayPerson.getId());

        restDayPersonMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayPerson.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayPerson))
            )
            .andExpect(status().isOk());

        // Validate the DayPerson in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayPersonUpdatableFieldsEquals(partialUpdatedDayPerson, getPersistedDayPerson(partialUpdatedDayPerson));
    }

    @Test
    @Transactional
    void patchNonExistingDayPerson() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPerson.setId(UUID.randomUUID());

        // Create the DayPerson
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(dayPerson);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPersonMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dayPersonDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayPersonDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPerson in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDayPerson() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPerson.setId(UUID.randomUUID());

        // Create the DayPerson
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(dayPerson);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPersonMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayPersonDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPerson in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDayPerson() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPerson.setId(UUID.randomUUID());

        // Create the DayPerson
        DayPersonDTO dayPersonDTO = dayPersonMapper.toDto(dayPerson);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPersonMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(dayPersonDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayPerson in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDayPerson() throws Exception {
        // Initialize the database
        insertedDayPerson = dayPersonRepository.saveAndFlush(dayPerson);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the dayPerson
        restDayPersonMockMvc
            .perform(delete(ENTITY_API_URL_ID, dayPerson.getId().toString()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return dayPersonRepository.count();
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

    protected DayPerson getPersistedDayPerson(DayPerson dayPerson) {
        return dayPersonRepository.findById(dayPerson.getId()).orElseThrow();
    }

    protected void assertPersistedDayPersonToMatchAllProperties(DayPerson expectedDayPerson) {
        assertDayPersonAllPropertiesEquals(expectedDayPerson, getPersistedDayPerson(expectedDayPerson));
    }

    protected void assertPersistedDayPersonToMatchUpdatableProperties(DayPerson expectedDayPerson) {
        assertDayPersonAllUpdatablePropertiesEquals(expectedDayPerson, getPersistedDayPerson(expectedDayPerson));
    }
}
