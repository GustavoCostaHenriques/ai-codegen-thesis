package com.weeklyplanning.web.rest;

import static com.weeklyplanning.domain.DayPersonProjectAsserts.*;
import static com.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weeklyplanning.IntegrationTest;
import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.Project;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.service.dto.DayPersonProjectDTO;
import com.weeklyplanning.service.mapper.DayPersonProjectMapper;
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
 * Integration tests for the {@link DayPersonProjectResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DayPersonProjectResourceIT {

    private static final String ENTITY_API_URL = "/api/day-person-projects";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DayPersonProjectRepository dayPersonProjectRepository;

    @Autowired
    private DayPersonProjectMapper dayPersonProjectMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDayPersonProjectMockMvc;

    private DayPersonProject dayPersonProject;

    private DayPersonProject insertedDayPersonProject;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayPersonProject createEntity(EntityManager em) {
        DayPersonProject dayPersonProject = new DayPersonProject();
        // Add required entity
        Project project;
        if (TestUtil.findAll(em, Project.class).isEmpty()) {
            project = ProjectResourceIT.createEntity(em);
            em.persist(project);
            em.flush();
        } else {
            project = TestUtil.findAll(em, Project.class).get(0);
        }
        dayPersonProject.setProject(project);
        // Add required entity
        DayPerson dayPerson;
        if (TestUtil.findAll(em, DayPerson.class).isEmpty()) {
            dayPerson = DayPersonResourceIT.createEntity(em);
            em.persist(dayPerson);
            em.flush();
        } else {
            dayPerson = TestUtil.findAll(em, DayPerson.class).get(0);
        }
        dayPersonProject.setDayPerson(dayPerson);
        return dayPersonProject;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayPersonProject createUpdatedEntity(EntityManager em) {
        DayPersonProject updatedDayPersonProject = new DayPersonProject();
        // Add required entity
        Project project;
        if (TestUtil.findAll(em, Project.class).isEmpty()) {
            project = ProjectResourceIT.createUpdatedEntity(em);
            em.persist(project);
            em.flush();
        } else {
            project = TestUtil.findAll(em, Project.class).get(0);
        }
        updatedDayPersonProject.setProject(project);
        // Add required entity
        DayPerson dayPerson;
        if (TestUtil.findAll(em, DayPerson.class).isEmpty()) {
            dayPerson = DayPersonResourceIT.createUpdatedEntity(em);
            em.persist(dayPerson);
            em.flush();
        } else {
            dayPerson = TestUtil.findAll(em, DayPerson.class).get(0);
        }
        updatedDayPersonProject.setDayPerson(dayPerson);
        return updatedDayPersonProject;
    }

    @BeforeEach
    void initTest() {
        dayPersonProject = createEntity(em);
    }

    @AfterEach
    void cleanup() {
        if (insertedDayPersonProject != null) {
            dayPersonProjectRepository.delete(insertedDayPersonProject);
            insertedDayPersonProject = null;
        }
    }

    @Test
    @Transactional
    void createDayPersonProject() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DayPersonProject
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(dayPersonProject);
        var returnedDayPersonProjectDTO = om.readValue(
            restDayPersonProjectMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPersonProjectDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DayPersonProjectDTO.class
        );

        // Validate the DayPersonProject in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDayPersonProject = dayPersonProjectMapper.toEntity(returnedDayPersonProjectDTO);
        assertDayPersonProjectUpdatableFieldsEquals(returnedDayPersonProject, getPersistedDayPersonProject(returnedDayPersonProject));

        insertedDayPersonProject = returnedDayPersonProject;
    }

    @Test
    @Transactional
    void createDayPersonProjectWithExistingId() throws Exception {
        // Create the DayPersonProject with an existing ID
        insertedDayPersonProject = dayPersonProjectRepository.saveAndFlush(dayPersonProject);
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(dayPersonProject);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayPersonProjectMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPersonProjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DayPersonProject in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDayPersonProjects() throws Exception {
        // Initialize the database
        insertedDayPersonProject = dayPersonProjectRepository.saveAndFlush(dayPersonProject);

        // Get all the dayPersonProjectList
        restDayPersonProjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayPersonProject.getId().toString())));
    }

    @Test
    @Transactional
    void getDayPersonProject() throws Exception {
        // Initialize the database
        insertedDayPersonProject = dayPersonProjectRepository.saveAndFlush(dayPersonProject);

        // Get the dayPersonProject
        restDayPersonProjectMockMvc
            .perform(get(ENTITY_API_URL_ID, dayPersonProject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dayPersonProject.getId().toString()));
    }

    @Test
    @Transactional
    void getNonExistingDayPersonProject() throws Exception {
        // Get the dayPersonProject
        restDayPersonProjectMockMvc.perform(get(ENTITY_API_URL_ID, UUID.randomUUID().toString())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDayPersonProject() throws Exception {
        // Initialize the database
        insertedDayPersonProject = dayPersonProjectRepository.saveAndFlush(dayPersonProject);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPersonProject
        DayPersonProject updatedDayPersonProject = dayPersonProjectRepository.findById(dayPersonProject.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDayPersonProject are not directly saved in db
        em.detach(updatedDayPersonProject);
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(updatedDayPersonProject);

        restDayPersonProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayPersonProjectDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPersonProjectDTO))
            )
            .andExpect(status().isOk());

        // Validate the DayPersonProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDayPersonProjectToMatchAllProperties(updatedDayPersonProject);
    }

    @Test
    @Transactional
    void putNonExistingDayPersonProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPersonProject.setId(UUID.randomUUID());

        // Create the DayPersonProject
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(dayPersonProject);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPersonProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayPersonProjectDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPersonProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPersonProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDayPersonProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPersonProject.setId(UUID.randomUUID());

        // Create the DayPersonProject
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(dayPersonProject);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPersonProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayPersonProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPersonProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDayPersonProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPersonProject.setId(UUID.randomUUID());

        // Create the DayPersonProject
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(dayPersonProject);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPersonProjectMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayPersonProjectDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayPersonProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDayPersonProjectWithPatch() throws Exception {
        // Initialize the database
        insertedDayPersonProject = dayPersonProjectRepository.saveAndFlush(dayPersonProject);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPersonProject using partial update
        DayPersonProject partialUpdatedDayPersonProject = new DayPersonProject();
        partialUpdatedDayPersonProject.setId(dayPersonProject.getId());

        restDayPersonProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayPersonProject.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayPersonProject))
            )
            .andExpect(status().isOk());

        // Validate the DayPersonProject in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayPersonProjectUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDayPersonProject, dayPersonProject),
            getPersistedDayPersonProject(dayPersonProject)
        );
    }

    @Test
    @Transactional
    void fullUpdateDayPersonProjectWithPatch() throws Exception {
        // Initialize the database
        insertedDayPersonProject = dayPersonProjectRepository.saveAndFlush(dayPersonProject);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayPersonProject using partial update
        DayPersonProject partialUpdatedDayPersonProject = new DayPersonProject();
        partialUpdatedDayPersonProject.setId(dayPersonProject.getId());

        restDayPersonProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayPersonProject.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayPersonProject))
            )
            .andExpect(status().isOk());

        // Validate the DayPersonProject in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayPersonProjectUpdatableFieldsEquals(
            partialUpdatedDayPersonProject,
            getPersistedDayPersonProject(partialUpdatedDayPersonProject)
        );
    }

    @Test
    @Transactional
    void patchNonExistingDayPersonProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPersonProject.setId(UUID.randomUUID());

        // Create the DayPersonProject
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(dayPersonProject);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPersonProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dayPersonProjectDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayPersonProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPersonProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDayPersonProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPersonProject.setId(UUID.randomUUID());

        // Create the DayPersonProject
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(dayPersonProject);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPersonProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayPersonProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayPersonProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDayPersonProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayPersonProject.setId(UUID.randomUUID());

        // Create the DayPersonProject
        DayPersonProjectDTO dayPersonProjectDTO = dayPersonProjectMapper.toDto(dayPersonProject);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayPersonProjectMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(dayPersonProjectDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayPersonProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDayPersonProject() throws Exception {
        // Initialize the database
        insertedDayPersonProject = dayPersonProjectRepository.saveAndFlush(dayPersonProject);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the dayPersonProject
        restDayPersonProjectMockMvc
            .perform(delete(ENTITY_API_URL_ID, dayPersonProject.getId().toString()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return dayPersonProjectRepository.count();
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

    protected DayPersonProject getPersistedDayPersonProject(DayPersonProject dayPersonProject) {
        return dayPersonProjectRepository.findById(dayPersonProject.getId()).orElseThrow();
    }

    protected void assertPersistedDayPersonProjectToMatchAllProperties(DayPersonProject expectedDayPersonProject) {
        assertDayPersonProjectAllPropertiesEquals(expectedDayPersonProject, getPersistedDayPersonProject(expectedDayPersonProject));
    }

    protected void assertPersistedDayPersonProjectToMatchUpdatableProperties(DayPersonProject expectedDayPersonProject) {
        assertDayPersonProjectAllUpdatablePropertiesEquals(
            expectedDayPersonProject,
            getPersistedDayPersonProject(expectedDayPersonProject)
        );
    }
}
