package com.mycompany.weeklyplanning.web.rest;

import static com.mycompany.weeklyplanning.domain.TaskEntityAsserts.*;
import static com.mycompany.weeklyplanning.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.weeklyplanning.IntegrationTest;
import com.mycompany.weeklyplanning.domain.DayUserProjectEntity;
import com.mycompany.weeklyplanning.domain.TaskEntity;
import com.mycompany.weeklyplanning.repository.TaskRepository;
import com.mycompany.weeklyplanning.service.dto.TaskDTO;
import com.mycompany.weeklyplanning.service.mapper.TaskMapper;
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
 * Integration tests for the {@link TaskResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TaskResourceIT {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tasks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskMapper taskMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskMockMvc;

    private TaskEntity taskEntity;

    private TaskEntity insertedTaskEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskEntity createEntity(EntityManager em) {
        TaskEntity taskEntity = new TaskEntity().text(DEFAULT_TEXT);
        // Add required entity
        DayUserProjectEntity dayUserProject;
        if (TestUtil.findAll(em, DayUserProjectEntity.class).isEmpty()) {
            dayUserProject = DayUserProjectResourceIT.createEntity(em);
            em.persist(dayUserProject);
            em.flush();
        } else {
            dayUserProject = TestUtil.findAll(em, DayUserProjectEntity.class).get(0);
        }
        taskEntity.setDayUserProject(dayUserProject);
        return taskEntity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskEntity createUpdatedEntity(EntityManager em) {
        TaskEntity updatedTaskEntity = new TaskEntity().text(UPDATED_TEXT);
        // Add required entity
        DayUserProjectEntity dayUserProject;
        if (TestUtil.findAll(em, DayUserProjectEntity.class).isEmpty()) {
            dayUserProject = DayUserProjectResourceIT.createUpdatedEntity(em);
            em.persist(dayUserProject);
            em.flush();
        } else {
            dayUserProject = TestUtil.findAll(em, DayUserProjectEntity.class).get(0);
        }
        updatedTaskEntity.setDayUserProject(dayUserProject);
        return updatedTaskEntity;
    }

    @BeforeEach
    void initTest() {
        taskEntity = createEntity(em);
    }

    @AfterEach
    void cleanup() {
        if (insertedTaskEntity != null) {
            taskRepository.delete(insertedTaskEntity);
            insertedTaskEntity = null;
        }
    }

    @Test
    @Transactional
    void createTask() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);
        var returnedTaskDTO = om.readValue(
            restTaskMockMvc
                .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(taskDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TaskDTO.class
        );

        // Validate the Task in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTaskEntity = taskMapper.toEntity(returnedTaskDTO);
        assertTaskEntityUpdatableFieldsEquals(returnedTaskEntity, getPersistedTaskEntity(returnedTaskEntity));

        insertedTaskEntity = returnedTaskEntity;
    }

    @Test
    @Transactional
    void createTaskWithExistingId() throws Exception {
        // Create the Task with an existing ID
        taskEntity.setId(1L);
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTextIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        taskEntity.setText(null);

        // Create the Task, which fails.
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);

        restTaskMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTasks() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        // Get all the taskList
        restTaskMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)));
    }

    @Test
    @Transactional
    void getTask() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        // Get the task
        restTaskMockMvc
            .perform(get(ENTITY_API_URL_ID, taskEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(taskEntity.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT));
    }

    @Test
    @Transactional
    void getTasksByIdFiltering() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        Long id = taskEntity.getId();

        defaultTaskFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultTaskFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultTaskFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllTasksByTextIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        // Get all the taskList where text equals to
        defaultTaskFiltering("text.equals=" + DEFAULT_TEXT, "text.equals=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    void getAllTasksByTextIsInShouldWork() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        // Get all the taskList where text in
        defaultTaskFiltering("text.in=" + DEFAULT_TEXT + "," + UPDATED_TEXT, "text.in=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    void getAllTasksByTextIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        // Get all the taskList where text is not null
        defaultTaskFiltering("text.specified=true", "text.specified=false");
    }

    @Test
    @Transactional
    void getAllTasksByTextContainsSomething() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        // Get all the taskList where text contains
        defaultTaskFiltering("text.contains=" + DEFAULT_TEXT, "text.contains=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    void getAllTasksByTextNotContainsSomething() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        // Get all the taskList where text does not contain
        defaultTaskFiltering("text.doesNotContain=" + UPDATED_TEXT, "text.doesNotContain=" + DEFAULT_TEXT);
    }

    @Test
    @Transactional
    void getAllTasksByDayUserProjectIsEqualToSomething() throws Exception {
        DayUserProjectEntity dayUserProject;
        if (TestUtil.findAll(em, DayUserProjectEntity.class).isEmpty()) {
            taskRepository.saveAndFlush(taskEntity);
            dayUserProject = DayUserProjectResourceIT.createEntity(em);
        } else {
            dayUserProject = TestUtil.findAll(em, DayUserProjectEntity.class).get(0);
        }
        em.persist(dayUserProject);
        em.flush();
        taskEntity.setDayUserProject(dayUserProject);
        taskRepository.saveAndFlush(taskEntity);
        Long dayUserProjectId = dayUserProject.getId();
        // Get all the taskList where dayUserProject equals to dayUserProjectId
        defaultTaskShouldBeFound("dayUserProjectId.equals=" + dayUserProjectId);

        // Get all the taskList where dayUserProject equals to (dayUserProjectId + 1)
        defaultTaskShouldNotBeFound("dayUserProjectId.equals=" + (dayUserProjectId + 1));
    }

    private void defaultTaskFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultTaskShouldBeFound(shouldBeFound);
        defaultTaskShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultTaskShouldBeFound(String filter) throws Exception {
        restTaskMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)));

        // Check, that the count call also returns 1
        restTaskMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultTaskShouldNotBeFound(String filter) throws Exception {
        restTaskMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTaskMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingTask() throws Exception {
        // Get the task
        restTaskMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTask() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the task
        TaskEntity updatedTaskEntity = taskRepository.findById(taskEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTaskEntity are not directly saved in db
        em.detach(updatedTaskEntity);
        updatedTaskEntity.text(UPDATED_TEXT);
        TaskDTO taskDTO = taskMapper.toDto(updatedTaskEntity);

        restTaskMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(taskDTO))
            )
            .andExpect(status().isOk());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTaskEntityToMatchAllProperties(updatedTaskEntity);
    }

    @Test
    @Transactional
    void putNonExistingTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        taskEntity.setId(longCount.incrementAndGet());

        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(taskDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        taskEntity.setId(longCount.incrementAndGet());

        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(taskDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        taskEntity.setId(longCount.incrementAndGet());

        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(taskDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskWithPatch() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the task using partial update
        TaskEntity partialUpdatedTaskEntity = new TaskEntity();
        partialUpdatedTaskEntity.setId(taskEntity.getId());

        partialUpdatedTaskEntity.text(UPDATED_TEXT);

        restTaskMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTaskEntity))
            )
            .andExpect(status().isOk());

        // Validate the Task in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTaskEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTaskEntity, taskEntity),
            getPersistedTaskEntity(taskEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateTaskWithPatch() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the task using partial update
        TaskEntity partialUpdatedTaskEntity = new TaskEntity();
        partialUpdatedTaskEntity.setId(taskEntity.getId());

        partialUpdatedTaskEntity.text(UPDATED_TEXT);

        restTaskMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskEntity.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTaskEntity))
            )
            .andExpect(status().isOk());

        // Validate the Task in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTaskEntityUpdatableFieldsEquals(partialUpdatedTaskEntity, getPersistedTaskEntity(partialUpdatedTaskEntity));
    }

    @Test
    @Transactional
    void patchNonExistingTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        taskEntity.setId(longCount.incrementAndGet());

        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, taskDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(taskDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        taskEntity.setId(longCount.incrementAndGet());

        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(taskDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        taskEntity.setId(longCount.incrementAndGet());

        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(taskEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(patch(ENTITY_API_URL).with(csrf()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(taskDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTask() throws Exception {
        // Initialize the database
        insertedTaskEntity = taskRepository.saveAndFlush(taskEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the task
        restTaskMockMvc
            .perform(delete(ENTITY_API_URL_ID, taskEntity.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return taskRepository.count();
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

    protected TaskEntity getPersistedTaskEntity(TaskEntity task) {
        return taskRepository.findById(task.getId()).orElseThrow();
    }

    protected void assertPersistedTaskEntityToMatchAllProperties(TaskEntity expectedTaskEntity) {
        assertTaskEntityAllPropertiesEquals(expectedTaskEntity, getPersistedTaskEntity(expectedTaskEntity));
    }

    protected void assertPersistedTaskEntityToMatchUpdatableProperties(TaskEntity expectedTaskEntity) {
        assertTaskEntityAllUpdatablePropertiesEquals(expectedTaskEntity, getPersistedTaskEntity(expectedTaskEntity));
    }
}
