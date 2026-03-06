package pt.formacao.escola.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pt.formacao.escola.domain.CourseEntityAsserts.*;
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
import pt.formacao.escola.repository.CourseRepository;
import pt.formacao.escola.service.dto.CourseDTO;
import pt.formacao.escola.service.mapper.CourseMapper;

/**
 * Integration tests for the {@link CourseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CourseResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/courses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCourseMockMvc;

    private CourseEntity courseEntity;

    private CourseEntity insertedCourseEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseEntity createEntity() {
        return new CourseEntity().name(DEFAULT_NAME);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseEntity createUpdatedEntity() {
        return new CourseEntity().name(UPDATED_NAME);
    }

    @BeforeEach
    void initTest() {
        courseEntity = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCourseEntity != null) {
            courseRepository.delete(insertedCourseEntity);
            insertedCourseEntity = null;
        }
    }

    @Test
    @Transactional
    void createCourse() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);
        var returnedCourseDTO = om.readValue(
            restCourseMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CourseDTO.class
        );

        // Validate the Course in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCourseEntity = courseMapper.toEntity(returnedCourseDTO);
        assertCourseEntityUpdatableFieldsEquals(returnedCourseEntity, getPersistedCourseEntity(returnedCourseEntity));

        insertedCourseEntity = returnedCourseEntity;
    }

    @Test
    @Transactional
    void createCourseWithExistingId() throws Exception {
        // Create the Course with an existing ID
        courseEntity.setId(1L);
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        courseEntity.setName(null);

        // Create the Course, which fails.
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);

        restCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCourses() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        // Get all the courseList
        restCourseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courseEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getCourse() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        // Get the course
        restCourseMockMvc
            .perform(get(ENTITY_API_URL_ID, courseEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(courseEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getCoursesByIdFiltering() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        Long id = courseEntity.getId();

        defaultCourseFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultCourseFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultCourseFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllCoursesByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        // Get all the courseList where name equals to
        defaultCourseFiltering("name.equals=" + DEFAULT_NAME, "name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllCoursesByNameIsInShouldWork() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        // Get all the courseList where name in
        defaultCourseFiltering("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME, "name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllCoursesByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        // Get all the courseList where name is not null
        defaultCourseFiltering("name.specified=true", "name.specified=false");
    }

    @Test
    @Transactional
    void getAllCoursesByNameContainsSomething() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        // Get all the courseList where name contains
        defaultCourseFiltering("name.contains=" + DEFAULT_NAME, "name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllCoursesByNameNotContainsSomething() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        // Get all the courseList where name does not contain
        defaultCourseFiltering("name.doesNotContain=" + UPDATED_NAME, "name.doesNotContain=" + DEFAULT_NAME);
    }

    private void defaultCourseFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultCourseShouldBeFound(shouldBeFound);
        defaultCourseShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultCourseShouldBeFound(String filter) throws Exception {
        restCourseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courseEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));

        // Check, that the count call also returns 1
        restCourseMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultCourseShouldNotBeFound(String filter) throws Exception {
        restCourseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCourseMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingCourse() throws Exception {
        // Get the course
        restCourseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCourse() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the course
        CourseEntity updatedCourseEntity = courseRepository.findById(courseEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCourseEntity are not directly saved in db
        em.detach(updatedCourseEntity);
        updatedCourseEntity.name(UPDATED_NAME);
        CourseDTO courseDTO = courseMapper.toDto(updatedCourseEntity);

        restCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseDTO))
            )
            .andExpect(status().isOk());

        // Validate the Course in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCourseEntityToMatchAllProperties(updatedCourseEntity);
    }

    @Test
    @Transactional
    void putNonExistingCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseEntity.setId(longCount.incrementAndGet());

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseEntity.setId(longCount.incrementAndGet());

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseEntity.setId(longCount.incrementAndGet());

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Course in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCourseWithPatch() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the course using partial update
        CourseEntity partialUpdatedCourseEntity = new CourseEntity();
        partialUpdatedCourseEntity.setId(courseEntity.getId());

        partialUpdatedCourseEntity.name(UPDATED_NAME);

        restCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseEntity))
            )
            .andExpect(status().isOk());

        // Validate the Course in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCourseEntity, courseEntity),
            getPersistedCourseEntity(courseEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateCourseWithPatch() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the course using partial update
        CourseEntity partialUpdatedCourseEntity = new CourseEntity();
        partialUpdatedCourseEntity.setId(courseEntity.getId());

        partialUpdatedCourseEntity.name(UPDATED_NAME);

        restCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseEntity))
            )
            .andExpect(status().isOk());

        // Validate the Course in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseEntityUpdatableFieldsEquals(partialUpdatedCourseEntity, getPersistedCourseEntity(partialUpdatedCourseEntity));
    }

    @Test
    @Transactional
    void patchNonExistingCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseEntity.setId(longCount.incrementAndGet());

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, courseDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseEntity.setId(longCount.incrementAndGet());

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseEntity.setId(longCount.incrementAndGet());

        // Create the Course
        CourseDTO courseDTO = courseMapper.toDto(courseEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(courseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Course in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCourse() throws Exception {
        // Initialize the database
        insertedCourseEntity = courseRepository.saveAndFlush(courseEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the course
        restCourseMockMvc
            .perform(delete(ENTITY_API_URL_ID, courseEntity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return courseRepository.count();
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

    protected CourseEntity getPersistedCourseEntity(CourseEntity course) {
        return courseRepository.findById(course.getId()).orElseThrow();
    }

    protected void assertPersistedCourseEntityToMatchAllProperties(CourseEntity expectedCourseEntity) {
        assertCourseEntityAllPropertiesEquals(expectedCourseEntity, getPersistedCourseEntity(expectedCourseEntity));
    }

    protected void assertPersistedCourseEntityToMatchUpdatableProperties(CourseEntity expectedCourseEntity) {
        assertCourseEntityAllUpdatablePropertiesEquals(expectedCourseEntity, getPersistedCourseEntity(expectedCourseEntity));
    }
}
