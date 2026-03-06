package pt.formacao.escola.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pt.formacao.escola.domain.StudentEntityAsserts.*;
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
import pt.formacao.escola.domain.StudentAddressEntity;
import pt.formacao.escola.domain.StudentEntity;
import pt.formacao.escola.domain.enumeration.GenreEnum;
import pt.formacao.escola.repository.StudentRepository;
import pt.formacao.escola.service.dto.StudentDTO;
import pt.formacao.escola.service.mapper.StudentMapper;

/**
 * Integration tests for the {@link StudentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StudentResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 0;
    private static final Integer UPDATED_AGE = 1;
    private static final Integer SMALLER_AGE = 0 - 1;

    private static final GenreEnum DEFAULT_GENRE = GenreEnum.MALE;
    private static final GenreEnum UPDATED_GENRE = GenreEnum.FEMALE;

    private static final String ENTITY_API_URL = "/api/students";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudentMockMvc;

    private StudentEntity studentEntity;

    private StudentEntity insertedStudentEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentEntity createEntity() {
        return new StudentEntity().name(DEFAULT_NAME).age(DEFAULT_AGE).genre(DEFAULT_GENRE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentEntity createUpdatedEntity() {
        return new StudentEntity().name(UPDATED_NAME).age(UPDATED_AGE).genre(UPDATED_GENRE);
    }

    @BeforeEach
    void initTest() {
        studentEntity = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedStudentEntity != null) {
            studentRepository.delete(insertedStudentEntity);
            insertedStudentEntity = null;
        }
    }

    @Test
    @Transactional
    void createStudent() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);
        var returnedStudentDTO = om.readValue(
            restStudentMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            StudentDTO.class
        );

        // Validate the Student in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedStudentEntity = studentMapper.toEntity(returnedStudentDTO);
        assertStudentEntityUpdatableFieldsEquals(returnedStudentEntity, getPersistedStudentEntity(returnedStudentEntity));

        insertedStudentEntity = returnedStudentEntity;
    }

    @Test
    @Transactional
    void createStudentWithExistingId() throws Exception {
        // Create the Student with an existing ID
        studentEntity.setId(1L);
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        studentEntity.setName(null);

        // Create the Student, which fails.
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        restStudentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAgeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        studentEntity.setAge(null);

        // Create the Student, which fails.
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        restStudentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllStudents() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList
        restStudentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE.toString())));
    }

    @Test
    @Transactional
    void getStudent() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get the student
        restStudentMockMvc
            .perform(get(ENTITY_API_URL_ID, studentEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(studentEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.genre").value(DEFAULT_GENRE.toString()));
    }

    @Test
    @Transactional
    void getStudentsByIdFiltering() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        Long id = studentEntity.getId();

        defaultStudentFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultStudentFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultStudentFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllStudentsByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where name equals to
        defaultStudentFiltering("name.equals=" + DEFAULT_NAME, "name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllStudentsByNameIsInShouldWork() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where name in
        defaultStudentFiltering("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME, "name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllStudentsByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where name is not null
        defaultStudentFiltering("name.specified=true", "name.specified=false");
    }

    @Test
    @Transactional
    void getAllStudentsByNameContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where name contains
        defaultStudentFiltering("name.contains=" + DEFAULT_NAME, "name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllStudentsByNameNotContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where name does not contain
        defaultStudentFiltering("name.doesNotContain=" + UPDATED_NAME, "name.doesNotContain=" + DEFAULT_NAME);
    }

    @Test
    @Transactional
    void getAllStudentsByAgeIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where age equals to
        defaultStudentFiltering("age.equals=" + DEFAULT_AGE, "age.equals=" + UPDATED_AGE);
    }

    @Test
    @Transactional
    void getAllStudentsByAgeIsInShouldWork() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where age in
        defaultStudentFiltering("age.in=" + DEFAULT_AGE + "," + UPDATED_AGE, "age.in=" + UPDATED_AGE);
    }

    @Test
    @Transactional
    void getAllStudentsByAgeIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where age is not null
        defaultStudentFiltering("age.specified=true", "age.specified=false");
    }

    @Test
    @Transactional
    void getAllStudentsByAgeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where age is greater than or equal to
        defaultStudentFiltering("age.greaterThanOrEqual=" + DEFAULT_AGE, "age.greaterThanOrEqual=" + UPDATED_AGE);
    }

    @Test
    @Transactional
    void getAllStudentsByAgeIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where age is less than or equal to
        defaultStudentFiltering("age.lessThanOrEqual=" + DEFAULT_AGE, "age.lessThanOrEqual=" + SMALLER_AGE);
    }

    @Test
    @Transactional
    void getAllStudentsByAgeIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where age is less than
        defaultStudentFiltering("age.lessThan=" + UPDATED_AGE, "age.lessThan=" + DEFAULT_AGE);
    }

    @Test
    @Transactional
    void getAllStudentsByAgeIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where age is greater than
        defaultStudentFiltering("age.greaterThan=" + SMALLER_AGE, "age.greaterThan=" + DEFAULT_AGE);
    }

    @Test
    @Transactional
    void getAllStudentsByGenreIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where genre equals to
        defaultStudentFiltering("genre.equals=" + DEFAULT_GENRE, "genre.equals=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    void getAllStudentsByGenreIsInShouldWork() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where genre in
        defaultStudentFiltering("genre.in=" + DEFAULT_GENRE + "," + UPDATED_GENRE, "genre.in=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    void getAllStudentsByGenreIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        // Get all the studentList where genre is not null
        defaultStudentFiltering("genre.specified=true", "genre.specified=false");
    }

    @Test
    @Transactional
    void getAllStudentsByStudentAddressIsEqualToSomething() throws Exception {
        StudentAddressEntity studentAddress;
        if (TestUtil.findAll(em, StudentAddressEntity.class).isEmpty()) {
            studentRepository.saveAndFlush(studentEntity);
            studentAddress = StudentAddressResourceIT.createEntity();
        } else {
            studentAddress = TestUtil.findAll(em, StudentAddressEntity.class).get(0);
        }
        em.persist(studentAddress);
        em.flush();
        studentEntity.setStudentAddress(studentAddress);
        studentRepository.saveAndFlush(studentEntity);
        Long studentAddressId = studentAddress.getId();
        // Get all the studentList where studentAddress equals to studentAddressId
        defaultStudentShouldBeFound("studentAddressId.equals=" + studentAddressId);

        // Get all the studentList where studentAddress equals to (studentAddressId + 1)
        defaultStudentShouldNotBeFound("studentAddressId.equals=" + (studentAddressId + 1));
    }

    @Test
    @Transactional
    void getAllStudentsByCourseIsEqualToSomething() throws Exception {
        CourseEntity course;
        if (TestUtil.findAll(em, CourseEntity.class).isEmpty()) {
            studentRepository.saveAndFlush(studentEntity);
            course = CourseResourceIT.createEntity();
        } else {
            course = TestUtil.findAll(em, CourseEntity.class).get(0);
        }
        em.persist(course);
        em.flush();
        studentEntity.setCourse(course);
        studentRepository.saveAndFlush(studentEntity);
        Long courseId = course.getId();
        // Get all the studentList where course equals to courseId
        defaultStudentShouldBeFound("courseId.equals=" + courseId);

        // Get all the studentList where course equals to (courseId + 1)
        defaultStudentShouldNotBeFound("courseId.equals=" + (courseId + 1));
    }

    private void defaultStudentFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultStudentShouldBeFound(shouldBeFound);
        defaultStudentShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultStudentShouldBeFound(String filter) throws Exception {
        restStudentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE.toString())));

        // Check, that the count call also returns 1
        restStudentMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultStudentShouldNotBeFound(String filter) throws Exception {
        restStudentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restStudentMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingStudent() throws Exception {
        // Get the student
        restStudentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStudent() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the student
        StudentEntity updatedStudentEntity = studentRepository.findById(studentEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedStudentEntity are not directly saved in db
        em.detach(updatedStudentEntity);
        updatedStudentEntity.name(UPDATED_NAME).age(UPDATED_AGE).genre(UPDATED_GENRE);
        StudentDTO studentDTO = studentMapper.toDto(updatedStudentEntity);

        restStudentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentDTO))
            )
            .andExpect(status().isOk());

        // Validate the Student in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedStudentEntityToMatchAllProperties(updatedStudentEntity);
    }

    @Test
    @Transactional
    void putNonExistingStudent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentEntity.setId(longCount.incrementAndGet());

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStudent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentEntity.setId(longCount.incrementAndGet());

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStudent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentEntity.setId(longCount.incrementAndGet());

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Student in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStudentWithPatch() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the student using partial update
        StudentEntity partialUpdatedStudentEntity = new StudentEntity();
        partialUpdatedStudentEntity.setId(studentEntity.getId());

        partialUpdatedStudentEntity.name(UPDATED_NAME).age(UPDATED_AGE);

        restStudentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentEntity))
            )
            .andExpect(status().isOk());

        // Validate the Student in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedStudentEntity, studentEntity),
            getPersistedStudentEntity(studentEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateStudentWithPatch() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the student using partial update
        StudentEntity partialUpdatedStudentEntity = new StudentEntity();
        partialUpdatedStudentEntity.setId(studentEntity.getId());

        partialUpdatedStudentEntity.name(UPDATED_NAME).age(UPDATED_AGE).genre(UPDATED_GENRE);

        restStudentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentEntity))
            )
            .andExpect(status().isOk());

        // Validate the Student in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentEntityUpdatableFieldsEquals(partialUpdatedStudentEntity, getPersistedStudentEntity(partialUpdatedStudentEntity));
    }

    @Test
    @Transactional
    void patchNonExistingStudent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentEntity.setId(longCount.incrementAndGet());

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, studentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStudent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentEntity.setId(longCount.incrementAndGet());

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStudent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentEntity.setId(longCount.incrementAndGet());

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(studentEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(studentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Student in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStudent() throws Exception {
        // Initialize the database
        insertedStudentEntity = studentRepository.saveAndFlush(studentEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the student
        restStudentMockMvc
            .perform(delete(ENTITY_API_URL_ID, studentEntity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return studentRepository.count();
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

    protected StudentEntity getPersistedStudentEntity(StudentEntity student) {
        return studentRepository.findById(student.getId()).orElseThrow();
    }

    protected void assertPersistedStudentEntityToMatchAllProperties(StudentEntity expectedStudentEntity) {
        assertStudentEntityAllPropertiesEquals(expectedStudentEntity, getPersistedStudentEntity(expectedStudentEntity));
    }

    protected void assertPersistedStudentEntityToMatchUpdatableProperties(StudentEntity expectedStudentEntity) {
        assertStudentEntityAllUpdatablePropertiesEquals(expectedStudentEntity, getPersistedStudentEntity(expectedStudentEntity));
    }
}
