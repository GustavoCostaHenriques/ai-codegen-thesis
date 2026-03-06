package pt.formacao.escola.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pt.formacao.escola.domain.DisciplinaEntityAsserts.*;
import static pt.formacao.escola.web.rest.TestUtil.createUpdateProxyForBean;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import pt.formacao.escola.IntegrationTest;
import pt.formacao.escola.domain.CourseEntity;
import pt.formacao.escola.domain.DisciplinaEntity;
import pt.formacao.escola.repository.DisciplinaRepository;
import pt.formacao.escola.service.dto.DisciplinaDTO;
import pt.formacao.escola.service.mapper.DisciplinaMapper;

/**
 * Integration tests for the {@link DisciplinaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DisciplinaResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACITY = 1;
    private static final Integer UPDATED_CAPACITY = 2;
    private static final Integer SMALLER_CAPACITY = 1 - 1;

    private static final Integer DEFAULT_CREDITS = 1;
    private static final Integer UPDATED_CREDITS = 2;
    private static final Integer SMALLER_CREDITS = 1 - 1;

    private static final String DEFAULT_TEACHER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEACHER_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/disciplinas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @Autowired
    private DisciplinaMapper disciplinaMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDisciplinaMockMvc;

    private DisciplinaEntity disciplinaEntity;

    private DisciplinaEntity insertedDisciplinaEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DisciplinaEntity createEntity(EntityManager em) {
        DisciplinaEntity disciplinaEntity = new DisciplinaEntity()
            .name(DEFAULT_NAME)
            .capacity(DEFAULT_CAPACITY)
            .credits(DEFAULT_CREDITS)
            .teacherName(DEFAULT_TEACHER_NAME);
        // Add required entity
        CourseEntity course;
        if (TestUtil.findAll(em, CourseEntity.class).isEmpty()) {
            course = CourseResourceIT.createEntity();
            em.persist(course);
            em.flush();
        } else {
            course = TestUtil.findAll(em, CourseEntity.class).get(0);
        }
        disciplinaEntity.setCourse(course);
        return disciplinaEntity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DisciplinaEntity createUpdatedEntity(EntityManager em) {
        DisciplinaEntity updatedDisciplinaEntity = new DisciplinaEntity()
            .name(UPDATED_NAME)
            .capacity(UPDATED_CAPACITY)
            .credits(UPDATED_CREDITS)
            .teacherName(UPDATED_TEACHER_NAME);
        // Add required entity
        CourseEntity course;
        if (TestUtil.findAll(em, CourseEntity.class).isEmpty()) {
            course = CourseResourceIT.createUpdatedEntity();
            em.persist(course);
            em.flush();
        } else {
            course = TestUtil.findAll(em, CourseEntity.class).get(0);
        }
        updatedDisciplinaEntity.setCourse(course);
        return updatedDisciplinaEntity;
    }

    @BeforeEach
    void initTest() {
        disciplinaEntity = createEntity(em);
    }

    @AfterEach
    void cleanup() {
        if (insertedDisciplinaEntity != null) {
            disciplinaRepository.delete(insertedDisciplinaEntity);
            insertedDisciplinaEntity = null;
        }
    }

    @Test
    @Transactional
    void createDisciplina() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Disciplina
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);
        var returnedDisciplinaDTO = om.readValue(
            restDisciplinaMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(disciplinaDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DisciplinaDTO.class
        );

        // Validate the Disciplina in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDisciplinaEntity = disciplinaMapper.toEntity(returnedDisciplinaDTO);
        assertDisciplinaEntityUpdatableFieldsEquals(returnedDisciplinaEntity, getPersistedDisciplinaEntity(returnedDisciplinaEntity));

        insertedDisciplinaEntity = returnedDisciplinaEntity;
    }

    @Test
    @Transactional
    void createDisciplinaWithExistingId() throws Exception {
        // Create the Disciplina with an existing ID
        disciplinaEntity.setId(1L);
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDisciplinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(disciplinaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Disciplina in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        disciplinaEntity.setName(null);

        // Create the Disciplina, which fails.
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        restDisciplinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(disciplinaDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCapacityIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        disciplinaEntity.setCapacity(null);

        // Create the Disciplina, which fails.
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        restDisciplinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(disciplinaDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreditsIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        disciplinaEntity.setCredits(null);

        // Create the Disciplina, which fails.
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        restDisciplinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(disciplinaDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTeacherNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        disciplinaEntity.setTeacherName(null);

        // Create the Disciplina, which fails.
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        restDisciplinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(disciplinaDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDisciplinas() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList
        restDisciplinaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(disciplinaEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)))
            .andExpect(jsonPath("$.[*].credits").value(hasItem(DEFAULT_CREDITS)))
            .andExpect(jsonPath("$.[*].teacherName").value(hasItem(DEFAULT_TEACHER_NAME)));
    }

    @Test
    @Transactional
    void getDisciplina() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get the disciplina
        restDisciplinaMockMvc
            .perform(get(ENTITY_API_URL_ID, disciplinaEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(disciplinaEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY))
            .andExpect(jsonPath("$.credits").value(DEFAULT_CREDITS))
            .andExpect(jsonPath("$.teacherName").value(DEFAULT_TEACHER_NAME));
    }

    @Test
    @Transactional
    void getDisciplinasByIdFiltering() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        Long id = disciplinaEntity.getId();

        defaultDisciplinaFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultDisciplinaFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultDisciplinaFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllDisciplinasByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where name equals to
        defaultDisciplinaFiltering("name.equals=" + DEFAULT_NAME, "name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllDisciplinasByNameIsInShouldWork() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where name in
        defaultDisciplinaFiltering("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME, "name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllDisciplinasByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where name is not null
        defaultDisciplinaFiltering("name.specified=true", "name.specified=false");
    }

    @Test
    @Transactional
    void getAllDisciplinasByNameContainsSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where name contains
        defaultDisciplinaFiltering("name.contains=" + DEFAULT_NAME, "name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllDisciplinasByNameNotContainsSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where name does not contain
        defaultDisciplinaFiltering("name.doesNotContain=" + UPDATED_NAME, "name.doesNotContain=" + DEFAULT_NAME);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCapacityIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where capacity equals to
        defaultDisciplinaFiltering("capacity.equals=" + DEFAULT_CAPACITY, "capacity.equals=" + UPDATED_CAPACITY);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCapacityIsInShouldWork() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where capacity in
        defaultDisciplinaFiltering("capacity.in=" + DEFAULT_CAPACITY + "," + UPDATED_CAPACITY, "capacity.in=" + UPDATED_CAPACITY);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCapacityIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where capacity is not null
        defaultDisciplinaFiltering("capacity.specified=true", "capacity.specified=false");
    }

    @Test
    @Transactional
    void getAllDisciplinasByCapacityIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where capacity is greater than or equal to
        defaultDisciplinaFiltering("capacity.greaterThanOrEqual=" + DEFAULT_CAPACITY, "capacity.greaterThanOrEqual=" + UPDATED_CAPACITY);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCapacityIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where capacity is less than or equal to
        defaultDisciplinaFiltering("capacity.lessThanOrEqual=" + DEFAULT_CAPACITY, "capacity.lessThanOrEqual=" + SMALLER_CAPACITY);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCapacityIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where capacity is less than
        defaultDisciplinaFiltering("capacity.lessThan=" + UPDATED_CAPACITY, "capacity.lessThan=" + DEFAULT_CAPACITY);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCapacityIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where capacity is greater than
        defaultDisciplinaFiltering("capacity.greaterThan=" + SMALLER_CAPACITY, "capacity.greaterThan=" + DEFAULT_CAPACITY);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCreditsIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where credits equals to
        defaultDisciplinaFiltering("credits.equals=" + DEFAULT_CREDITS, "credits.equals=" + UPDATED_CREDITS);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCreditsIsInShouldWork() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where credits in
        defaultDisciplinaFiltering("credits.in=" + DEFAULT_CREDITS + "," + UPDATED_CREDITS, "credits.in=" + UPDATED_CREDITS);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCreditsIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where credits is not null
        defaultDisciplinaFiltering("credits.specified=true", "credits.specified=false");
    }

    @Test
    @Transactional
    void getAllDisciplinasByCreditsIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where credits is greater than or equal to
        defaultDisciplinaFiltering("credits.greaterThanOrEqual=" + DEFAULT_CREDITS, "credits.greaterThanOrEqual=" + UPDATED_CREDITS);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCreditsIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where credits is less than or equal to
        defaultDisciplinaFiltering("credits.lessThanOrEqual=" + DEFAULT_CREDITS, "credits.lessThanOrEqual=" + SMALLER_CREDITS);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCreditsIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where credits is less than
        defaultDisciplinaFiltering("credits.lessThan=" + UPDATED_CREDITS, "credits.lessThan=" + DEFAULT_CREDITS);
    }

    @Test
    @Transactional
    void getAllDisciplinasByCreditsIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where credits is greater than
        defaultDisciplinaFiltering("credits.greaterThan=" + SMALLER_CREDITS, "credits.greaterThan=" + DEFAULT_CREDITS);
    }

    @Test
    @Transactional
    void getAllDisciplinasByTeacherNameIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where teacherName equals to
        defaultDisciplinaFiltering("teacherName.equals=" + DEFAULT_TEACHER_NAME, "teacherName.equals=" + UPDATED_TEACHER_NAME);
    }

    @Test
    @Transactional
    void getAllDisciplinasByTeacherNameIsInShouldWork() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where teacherName in
        defaultDisciplinaFiltering(
            "teacherName.in=" + DEFAULT_TEACHER_NAME + "," + UPDATED_TEACHER_NAME,
            "teacherName.in=" + UPDATED_TEACHER_NAME
        );
    }

    @Test
    @Transactional
    void getAllDisciplinasByTeacherNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where teacherName is not null
        defaultDisciplinaFiltering("teacherName.specified=true", "teacherName.specified=false");
    }

    @Test
    @Transactional
    void getAllDisciplinasByTeacherNameContainsSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where teacherName contains
        defaultDisciplinaFiltering("teacherName.contains=" + DEFAULT_TEACHER_NAME, "teacherName.contains=" + UPDATED_TEACHER_NAME);
    }

    @Test
    @Transactional
    void getAllDisciplinasByTeacherNameNotContainsSomething() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        // Get all the disciplinaList where teacherName does not contain
        defaultDisciplinaFiltering(
            "teacherName.doesNotContain=" + UPDATED_TEACHER_NAME,
            "teacherName.doesNotContain=" + DEFAULT_TEACHER_NAME
        );
    }

    @Test
    @Transactional
    void getAllDisciplinasByCourseIsEqualToSomething() throws Exception {
        CourseEntity course;
        if (TestUtil.findAll(em, CourseEntity.class).isEmpty()) {
            disciplinaRepository.saveAndFlush(disciplinaEntity);
            course = CourseResourceIT.createEntity();
        } else {
            course = TestUtil.findAll(em, CourseEntity.class).get(0);
        }
        em.persist(course);
        em.flush();
        disciplinaEntity.setCourse(course);
        disciplinaRepository.saveAndFlush(disciplinaEntity);
        Long courseId = course.getId();
        // Get all the disciplinaList where course equals to courseId
        defaultDisciplinaShouldBeFound("courseId.equals=" + courseId);

        // Get all the disciplinaList where course equals to (courseId + 1)
        defaultDisciplinaShouldNotBeFound("courseId.equals=" + (courseId + 1));
    }

    private void defaultDisciplinaFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultDisciplinaShouldBeFound(shouldBeFound);
        defaultDisciplinaShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDisciplinaShouldBeFound(String filter) throws Exception {
        restDisciplinaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(disciplinaEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)))
            .andExpect(jsonPath("$.[*].credits").value(hasItem(DEFAULT_CREDITS)))
            .andExpect(jsonPath("$.[*].teacherName").value(hasItem(DEFAULT_TEACHER_NAME)));

        // Check, that the count call also returns 1
        restDisciplinaMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultDisciplinaShouldNotBeFound(String filter) throws Exception {
        restDisciplinaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDisciplinaMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingDisciplina() throws Exception {
        // Get the disciplina
        restDisciplinaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDisciplina() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the disciplina
        DisciplinaEntity updatedDisciplinaEntity = disciplinaRepository.findById(disciplinaEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDisciplinaEntity are not directly saved in db
        em.detach(updatedDisciplinaEntity);
        updatedDisciplinaEntity.name(UPDATED_NAME).capacity(UPDATED_CAPACITY).credits(UPDATED_CREDITS).teacherName(UPDATED_TEACHER_NAME);
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(updatedDisciplinaEntity);

        restDisciplinaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, disciplinaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(disciplinaDTO))
            )
            .andExpect(status().isOk());

        // Validate the Disciplina in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDisciplinaEntityToMatchAllProperties(updatedDisciplinaEntity);
    }

    @Test
    @Transactional
    void putNonExistingDisciplina() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        disciplinaEntity.setId(longCount.incrementAndGet());

        // Create the Disciplina
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDisciplinaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, disciplinaDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(disciplinaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disciplina in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDisciplina() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        disciplinaEntity.setId(longCount.incrementAndGet());

        // Create the Disciplina
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisciplinaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(disciplinaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disciplina in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDisciplina() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        disciplinaEntity.setId(longCount.incrementAndGet());

        // Create the Disciplina
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisciplinaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(disciplinaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Disciplina in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDisciplinaWithPatch() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the disciplina using partial update
        DisciplinaEntity partialUpdatedDisciplinaEntity = new DisciplinaEntity();
        partialUpdatedDisciplinaEntity.setId(disciplinaEntity.getId());

        partialUpdatedDisciplinaEntity
            .name(UPDATED_NAME)
            .capacity(UPDATED_CAPACITY)
            .credits(UPDATED_CREDITS)
            .teacherName(UPDATED_TEACHER_NAME);

        restDisciplinaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDisciplinaEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDisciplinaEntity))
            )
            .andExpect(status().isOk());

        // Validate the Disciplina in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDisciplinaEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDisciplinaEntity, disciplinaEntity),
            getPersistedDisciplinaEntity(disciplinaEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateDisciplinaWithPatch() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the disciplina using partial update
        DisciplinaEntity partialUpdatedDisciplinaEntity = new DisciplinaEntity();
        partialUpdatedDisciplinaEntity.setId(disciplinaEntity.getId());

        partialUpdatedDisciplinaEntity
            .name(UPDATED_NAME)
            .capacity(UPDATED_CAPACITY)
            .credits(UPDATED_CREDITS)
            .teacherName(UPDATED_TEACHER_NAME);

        restDisciplinaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDisciplinaEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDisciplinaEntity))
            )
            .andExpect(status().isOk());

        // Validate the Disciplina in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDisciplinaEntityUpdatableFieldsEquals(
            partialUpdatedDisciplinaEntity,
            getPersistedDisciplinaEntity(partialUpdatedDisciplinaEntity)
        );
    }

    @Test
    @Transactional
    void patchNonExistingDisciplina() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        disciplinaEntity.setId(longCount.incrementAndGet());

        // Create the Disciplina
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDisciplinaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, disciplinaDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(disciplinaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disciplina in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDisciplina() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        disciplinaEntity.setId(longCount.incrementAndGet());

        // Create the Disciplina
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisciplinaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(disciplinaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disciplina in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDisciplina() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        disciplinaEntity.setId(longCount.incrementAndGet());

        // Create the Disciplina
        DisciplinaDTO disciplinaDTO = disciplinaMapper.toDto(disciplinaEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisciplinaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(disciplinaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Disciplina in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDisciplina() throws Exception {
        // Initialize the database
        insertedDisciplinaEntity = disciplinaRepository.saveAndFlush(disciplinaEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the disciplina
        restDisciplinaMockMvc
            .perform(delete(ENTITY_API_URL_ID, disciplinaEntity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return disciplinaRepository.count();
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

    protected DisciplinaEntity getPersistedDisciplinaEntity(DisciplinaEntity disciplina) {
        return disciplinaRepository.findById(disciplina.getId()).orElseThrow();
    }

    protected void assertPersistedDisciplinaEntityToMatchAllProperties(DisciplinaEntity expectedDisciplinaEntity) {
        assertDisciplinaEntityAllPropertiesEquals(expectedDisciplinaEntity, getPersistedDisciplinaEntity(expectedDisciplinaEntity));
    }

    protected void assertPersistedDisciplinaEntityToMatchUpdatableProperties(DisciplinaEntity expectedDisciplinaEntity) {
        assertDisciplinaEntityAllUpdatablePropertiesEquals(
            expectedDisciplinaEntity,
            getPersistedDisciplinaEntity(expectedDisciplinaEntity)
        );
    }
}
