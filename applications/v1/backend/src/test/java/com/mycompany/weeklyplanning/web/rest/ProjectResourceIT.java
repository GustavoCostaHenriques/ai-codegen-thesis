package com.mycompany.weeklyplanning.web.rest;

import static com.mycompany.weeklyplanning.domain.ProjectEntityAsserts.*;
import static com.mycompany.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.weeklyplanning.IntegrationTest;
import com.mycompany.weeklyplanning.domain.ProjectEntity;
import com.mycompany.weeklyplanning.repository.ProjectRepository;
import com.mycompany.weeklyplanning.service.dto.ProjectDTO;
import com.mycompany.weeklyplanning.service.mapper.ProjectMapper;
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
 * Integration tests for the {@link ProjectResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProjectResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/projects";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProjectMockMvc;

    private ProjectEntity projectEntity;

    private ProjectEntity insertedProjectEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectEntity createEntity() {
        return new ProjectEntity().name(DEFAULT_NAME);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectEntity createUpdatedEntity() {
        return new ProjectEntity().name(UPDATED_NAME);
    }

    @BeforeEach
    void initTest() {
        projectEntity = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedProjectEntity != null) {
            projectRepository.delete(insertedProjectEntity);
            insertedProjectEntity = null;
        }
    }

    @Test
    @Transactional
    void createProject() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);
        var returnedProjectDTO = om.readValue(
            restProjectMockMvc
                .perform(
                    post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ProjectDTO.class
        );

        // Validate the Project in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedProjectEntity = projectMapper.toEntity(returnedProjectDTO);
        assertProjectEntityUpdatableFieldsEquals(returnedProjectEntity, getPersistedProjectEntity(returnedProjectEntity));

        insertedProjectEntity = returnedProjectEntity;
    }

    @Test
    @Transactional
    void createProjectWithExistingId() throws Exception {
        // Create the Project with an existing ID
        projectEntity.setId(1L);
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectEntity.setName(null);

        // Create the Project, which fails.
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);

        restProjectMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllProjects() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        // Get all the projectList
        restProjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getProject() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        // Get the project
        restProjectMockMvc
            .perform(get(ENTITY_API_URL_ID, projectEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projectEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getProjectsByIdFiltering() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        Long id = projectEntity.getId();

        defaultProjectFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultProjectFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultProjectFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllProjectsByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        // Get all the projectList where name equals to
        defaultProjectFiltering("name.equals=" + DEFAULT_NAME, "name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllProjectsByNameIsInShouldWork() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        // Get all the projectList where name in
        defaultProjectFiltering("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME, "name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllProjectsByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        // Get all the projectList where name is not null
        defaultProjectFiltering("name.specified=true", "name.specified=false");
    }

    @Test
    @Transactional
    void getAllProjectsByNameContainsSomething() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        // Get all the projectList where name contains
        defaultProjectFiltering("name.contains=" + DEFAULT_NAME, "name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllProjectsByNameNotContainsSomething() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        // Get all the projectList where name does not contain
        defaultProjectFiltering("name.doesNotContain=" + UPDATED_NAME, "name.doesNotContain=" + DEFAULT_NAME);
    }

    private void defaultProjectFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultProjectShouldBeFound(shouldBeFound);
        defaultProjectShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultProjectShouldBeFound(String filter) throws Exception {
        restProjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));

        // Check, that the count call also returns 1
        restProjectMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultProjectShouldNotBeFound(String filter) throws Exception {
        restProjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restProjectMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingProject() throws Exception {
        // Get the project
        restProjectMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingProject() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the project
        ProjectEntity updatedProjectEntity = projectRepository.findById(projectEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedProjectEntity are not directly saved in db
        em.detach(updatedProjectEntity);
        updatedProjectEntity.name(UPDATED_NAME);
        ProjectDTO projectDTO = projectMapper.toDto(updatedProjectEntity);

        restProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectDTO))
            )
            .andExpect(status().isOk());

        // Validate the Project in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedProjectEntityToMatchAllProperties(updatedProjectEntity);
    }

    @Test
    @Transactional
    void putNonExistingProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectEntity.setId(longCount.incrementAndGet());

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectEntity.setId(longCount.incrementAndGet());

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectEntity.setId(longCount.incrementAndGet());

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectMockMvc
            .perform(put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Project in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProjectWithPatch() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the project using partial update
        ProjectEntity partialUpdatedProjectEntity = new ProjectEntity();
        partialUpdatedProjectEntity.setId(projectEntity.getId());

        restProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedProjectEntity))
            )
            .andExpect(status().isOk());

        // Validate the Project in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProjectEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedProjectEntity, projectEntity),
            getPersistedProjectEntity(projectEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateProjectWithPatch() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the project using partial update
        ProjectEntity partialUpdatedProjectEntity = new ProjectEntity();
        partialUpdatedProjectEntity.setId(projectEntity.getId());

        partialUpdatedProjectEntity.name(UPDATED_NAME);

        restProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedProjectEntity))
            )
            .andExpect(status().isOk());

        // Validate the Project in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProjectEntityUpdatableFieldsEquals(partialUpdatedProjectEntity, getPersistedProjectEntity(partialUpdatedProjectEntity));
    }

    @Test
    @Transactional
    void patchNonExistingProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectEntity.setId(longCount.incrementAndGet());

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, projectDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(projectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectEntity.setId(longCount.incrementAndGet());

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(projectDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProject() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectEntity.setId(longCount.incrementAndGet());

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(projectEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectMockMvc
            .perform(
                patch(ENTITY_API_URL).with(csrf()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(projectDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Project in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProject() throws Exception {
        // Initialize the database
        insertedProjectEntity = projectRepository.saveAndFlush(projectEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the project
        restProjectMockMvc
            .perform(delete(ENTITY_API_URL_ID, projectEntity.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return projectRepository.count();
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

    protected ProjectEntity getPersistedProjectEntity(ProjectEntity project) {
        return projectRepository.findById(project.getId()).orElseThrow();
    }

    protected void assertPersistedProjectEntityToMatchAllProperties(ProjectEntity expectedProjectEntity) {
        assertProjectEntityAllPropertiesEquals(expectedProjectEntity, getPersistedProjectEntity(expectedProjectEntity));
    }

    protected void assertPersistedProjectEntityToMatchUpdatableProperties(ProjectEntity expectedProjectEntity) {
        assertProjectEntityAllUpdatablePropertiesEquals(expectedProjectEntity, getPersistedProjectEntity(expectedProjectEntity));
    }
}
