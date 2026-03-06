package com.mycompany.weeklyplanning.web.rest;

import static com.mycompany.weeklyplanning.domain.DayUserProjectEntityAsserts.*;
import static com.mycompany.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.weeklyplanning.IntegrationTest;
import com.mycompany.weeklyplanning.domain.DayUserEntity;
import com.mycompany.weeklyplanning.domain.DayUserProjectEntity;
import com.mycompany.weeklyplanning.domain.ProjectEntity;
import com.mycompany.weeklyplanning.repository.DayUserProjectRepository;
import com.mycompany.weeklyplanning.service.dto.DayUserProjectDTO;
import com.mycompany.weeklyplanning.service.mapper.DayUserProjectMapper;
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
 * Integration tests for the {@link DayUserProjectResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DayUserProjectResourceIT {

    private static final String ENTITY_API_URL = "/api/day-user-projects";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DayUserProjectRepository dayUserProjectRepository;

    @Autowired
    private DayUserProjectMapper dayUserProjectMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDayUserProjectMockMvc;

    private DayUserProjectEntity dayUserProjectEntity;

    private DayUserProjectEntity insertedDayUserProjectEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayUserProjectEntity createEntity(EntityManager em) {
        DayUserProjectEntity dayUserProjectEntity = new DayUserProjectEntity();
        // Add required entity
        DayUserEntity dayUser;
        if (TestUtil.findAll(em, DayUserEntity.class).isEmpty()) {
            dayUser = DayUserResourceIT.createEntity(em);
            em.persist(dayUser);
            em.flush();
        } else {
            dayUser = TestUtil.findAll(em, DayUserEntity.class).get(0);
        }
        dayUserProjectEntity.setDayUser(dayUser);
        // Add required entity
        ProjectEntity project;
        if (TestUtil.findAll(em, ProjectEntity.class).isEmpty()) {
            project = ProjectResourceIT.createEntity();
            em.persist(project);
            em.flush();
        } else {
            project = TestUtil.findAll(em, ProjectEntity.class).get(0);
        }
        dayUserProjectEntity.setProject(project);
        return dayUserProjectEntity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayUserProjectEntity createUpdatedEntity(EntityManager em) {
        DayUserProjectEntity updatedDayUserProjectEntity = new DayUserProjectEntity();
        // Add required entity
        DayUserEntity dayUser;
        if (TestUtil.findAll(em, DayUserEntity.class).isEmpty()) {
            dayUser = DayUserResourceIT.createUpdatedEntity(em);
            em.persist(dayUser);
            em.flush();
        } else {
            dayUser = TestUtil.findAll(em, DayUserEntity.class).get(0);
        }
        updatedDayUserProjectEntity.setDayUser(dayUser);
        // Add required entity
        ProjectEntity project;
        if (TestUtil.findAll(em, ProjectEntity.class).isEmpty()) {
            project = ProjectResourceIT.createUpdatedEntity();
            em.persist(project);
            em.flush();
        } else {
            project = TestUtil.findAll(em, ProjectEntity.class).get(0);
        }
        updatedDayUserProjectEntity.setProject(project);
        return updatedDayUserProjectEntity;
    }

    @BeforeEach
    void initTest() {
        dayUserProjectEntity = createEntity(em);
    }

    @AfterEach
    void cleanup() {
        if (insertedDayUserProjectEntity != null) {
            dayUserProjectRepository.delete(insertedDayUserProjectEntity);
            insertedDayUserProjectEntity = null;
        }
    }

    @Test
    @Transactional
    void createDayUserProject() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DayUserProject
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(dayUserProjectEntity);
        var returnedDayUserProjectDTO = om.readValue(
            restDayUserProjectMockMvc
                .perform(
                    post(ENTITY_API_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsBytes(dayUserProjectDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DayUserProjectDTO.class
        );

        // Validate the DayUserProject in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDayUserProjectEntity = dayUserProjectMapper.toEntity(returnedDayUserProjectDTO);
        assertDayUserProjectEntityUpdatableFieldsEquals(
            returnedDayUserProjectEntity,
            getPersistedDayUserProjectEntity(returnedDayUserProjectEntity)
        );

        insertedDayUserProjectEntity = returnedDayUserProjectEntity;
    }

    @Test
    @Transactional
    void createDayUserProjectWithExistingId() throws Exception {
        // Create the DayUserProject with an existing ID
        dayUserProjectEntity.setId(1L);
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(dayUserProjectEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayUserProjectMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayUserProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUserProject in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDayUserProjects() throws Exception {
        // Initialize the database
        insertedDayUserProjectEntity = dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);

        // Get all the dayUserProjectList
        restDayUserProjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayUserProjectEntity.getId().intValue())));
    }

    @Test
    @Transactional
    void getDayUserProject() throws Exception {
        // Initialize the database
        insertedDayUserProjectEntity = dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);

        // Get the dayUserProject
        restDayUserProjectMockMvc
            .perform(get(ENTITY_API_URL_ID, dayUserProjectEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dayUserProjectEntity.getId().intValue()));
    }

    @Test
    @Transactional
    void getDayUserProjectsByIdFiltering() throws Exception {
        // Initialize the database
        insertedDayUserProjectEntity = dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);

        Long id = dayUserProjectEntity.getId();

        defaultDayUserProjectFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultDayUserProjectFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultDayUserProjectFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllDayUserProjectsByDayUserIsEqualToSomething() throws Exception {
        DayUserEntity dayUser;
        if (TestUtil.findAll(em, DayUserEntity.class).isEmpty()) {
            dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);
            dayUser = DayUserResourceIT.createEntity(em);
        } else {
            dayUser = TestUtil.findAll(em, DayUserEntity.class).get(0);
        }
        em.persist(dayUser);
        em.flush();
        dayUserProjectEntity.setDayUser(dayUser);
        dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);
        Long dayUserId = dayUser.getId();
        // Get all the dayUserProjectList where dayUser equals to dayUserId
        defaultDayUserProjectShouldBeFound("dayUserId.equals=" + dayUserId);

        // Get all the dayUserProjectList where dayUser equals to (dayUserId + 1)
        defaultDayUserProjectShouldNotBeFound("dayUserId.equals=" + (dayUserId + 1));
    }

    @Test
    @Transactional
    void getAllDayUserProjectsByProjectIsEqualToSomething() throws Exception {
        ProjectEntity project;
        if (TestUtil.findAll(em, ProjectEntity.class).isEmpty()) {
            dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);
            project = ProjectResourceIT.createEntity();
        } else {
            project = TestUtil.findAll(em, ProjectEntity.class).get(0);
        }
        em.persist(project);
        em.flush();
        dayUserProjectEntity.setProject(project);
        dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);
        Long projectId = project.getId();
        // Get all the dayUserProjectList where project equals to projectId
        defaultDayUserProjectShouldBeFound("projectId.equals=" + projectId);

        // Get all the dayUserProjectList where project equals to (projectId + 1)
        defaultDayUserProjectShouldNotBeFound("projectId.equals=" + (projectId + 1));
    }

    private void defaultDayUserProjectFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultDayUserProjectShouldBeFound(shouldBeFound);
        defaultDayUserProjectShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDayUserProjectShouldBeFound(String filter) throws Exception {
        restDayUserProjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayUserProjectEntity.getId().intValue())));

        // Check, that the count call also returns 1
        restDayUserProjectMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultDayUserProjectShouldNotBeFound(String filter) throws Exception {
        restDayUserProjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDayUserProjectMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingDayUserProject() throws Exception {
        // Get the dayUserProject
        restDayUserProjectMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDayUserProject() throws Exception {
        // Initialize the database
        insertedDayUserProjectEntity = dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayUserProject
        DayUserProjectEntity updatedDayUserProjectEntity = dayUserProjectRepository.findById(dayUserProjectEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDayUserProjectEntity are not directly saved in db
        em.detach(updatedDayUserProjectEntity);
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(updatedDayUserProjectEntity);

        restDayUserProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayUserProjectDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayUserProjectDTO))
            )
            .andExpect(status().isOk());

        // Validate the DayUserProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDayUserProjectEntityToMatchAllProperties(updatedDayUserProjectEntity);
    }

    @Test
    @Transactional
    void putNonExistingDayUserProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserProjectEntity.setId(longCount.incrementAndGet());

        // Create the DayUserProject
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(dayUserProjectEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayUserProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dayUserProjectDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayUserProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUserProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDayUserProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserProjectEntity.setId(longCount.incrementAndGet());

        // Create the DayUserProject
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(dayUserProjectEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayUserProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayUserProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUserProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDayUserProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserProjectEntity.setId(longCount.incrementAndGet());

        // Create the DayUserProject
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(dayUserProjectEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayUserProjectMockMvc
            .perform(
                put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayUserProjectDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayUserProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDayUserProjectWithPatch() throws Exception {
        // Initialize the database
        insertedDayUserProjectEntity = dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayUserProject using partial update
        DayUserProjectEntity partialUpdatedDayUserProjectEntity = new DayUserProjectEntity();
        partialUpdatedDayUserProjectEntity.setId(dayUserProjectEntity.getId());

        restDayUserProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayUserProjectEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayUserProjectEntity))
            )
            .andExpect(status().isOk());

        // Validate the DayUserProject in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayUserProjectEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDayUserProjectEntity, dayUserProjectEntity),
            getPersistedDayUserProjectEntity(dayUserProjectEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateDayUserProjectWithPatch() throws Exception {
        // Initialize the database
        insertedDayUserProjectEntity = dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dayUserProject using partial update
        DayUserProjectEntity partialUpdatedDayUserProjectEntity = new DayUserProjectEntity();
        partialUpdatedDayUserProjectEntity.setId(dayUserProjectEntity.getId());

        restDayUserProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDayUserProjectEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDayUserProjectEntity))
            )
            .andExpect(status().isOk());

        // Validate the DayUserProject in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayUserProjectEntityUpdatableFieldsEquals(
            partialUpdatedDayUserProjectEntity,
            getPersistedDayUserProjectEntity(partialUpdatedDayUserProjectEntity)
        );
    }

    @Test
    @Transactional
    void patchNonExistingDayUserProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserProjectEntity.setId(longCount.incrementAndGet());

        // Create the DayUserProject
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(dayUserProjectEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayUserProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dayUserProjectDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayUserProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUserProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDayUserProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserProjectEntity.setId(longCount.incrementAndGet());

        // Create the DayUserProject
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(dayUserProjectEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayUserProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayUserProjectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DayUserProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDayUserProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dayUserProjectEntity.setId(longCount.incrementAndGet());

        // Create the DayUserProject
        DayUserProjectDTO dayUserProjectDTO = dayUserProjectMapper.toDto(dayUserProjectEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayUserProjectMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayUserProjectDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DayUserProject in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDayUserProject() throws Exception {
        // Initialize the database
        insertedDayUserProjectEntity = dayUserProjectRepository.saveAndFlush(dayUserProjectEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the dayUserProject
        restDayUserProjectMockMvc
            .perform(delete(ENTITY_API_URL_ID, dayUserProjectEntity.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return dayUserProjectRepository.count();
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

    protected DayUserProjectEntity getPersistedDayUserProjectEntity(DayUserProjectEntity dayUserProject) {
        return dayUserProjectRepository.findById(dayUserProject.getId()).orElseThrow();
    }

    protected void assertPersistedDayUserProjectEntityToMatchAllProperties(DayUserProjectEntity expectedDayUserProjectEntity) {
        assertDayUserProjectEntityAllPropertiesEquals(
            expectedDayUserProjectEntity,
            getPersistedDayUserProjectEntity(expectedDayUserProjectEntity)
        );
    }

    protected void assertPersistedDayUserProjectEntityToMatchUpdatableProperties(DayUserProjectEntity expectedDayUserProjectEntity) {
        assertDayUserProjectEntityAllUpdatablePropertiesEquals(
            expectedDayUserProjectEntity,
            getPersistedDayUserProjectEntity(expectedDayUserProjectEntity)
        );
    }
}
