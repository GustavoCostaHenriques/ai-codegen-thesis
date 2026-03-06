package pt.formacao.escola.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pt.formacao.escola.domain.GradeEntityAsserts.*;
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
import pt.formacao.escola.domain.DisciplinaEntity;
import pt.formacao.escola.domain.GradeEntity;
import pt.formacao.escola.domain.StudentEntity;
import pt.formacao.escola.repository.GradeRepository;
import pt.formacao.escola.service.dto.GradeDTO;
import pt.formacao.escola.service.mapper.GradeMapper;

/**
 * Integration tests for the {@link GradeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GradeResourceIT {

    private static final Integer DEFAULT_VALUE = 0;
    private static final Integer UPDATED_VALUE = 1;
    private static final Integer SMALLER_VALUE = 0 - 1;

    private static final Boolean DEFAULT_FINISHED = false;
    private static final Boolean UPDATED_FINISHED = true;

    private static final String ENTITY_API_URL = "/api/grades";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private GradeMapper gradeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGradeMockMvc;

    private GradeEntity gradeEntity;

    private GradeEntity insertedGradeEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GradeEntity createEntity() {
        return new GradeEntity().value(DEFAULT_VALUE).finished(DEFAULT_FINISHED);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GradeEntity createUpdatedEntity() {
        return new GradeEntity().value(UPDATED_VALUE).finished(UPDATED_FINISHED);
    }

    @BeforeEach
    void initTest() {
        gradeEntity = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedGradeEntity != null) {
            gradeRepository.delete(insertedGradeEntity);
            insertedGradeEntity = null;
        }
    }

    @Test
    @Transactional
    void createGrade() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Grade
        GradeDTO gradeDTO = gradeMapper.toDto(gradeEntity);
        var returnedGradeDTO = om.readValue(
            restGradeMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(gradeDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            GradeDTO.class
        );

        // Validate the Grade in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedGradeEntity = gradeMapper.toEntity(returnedGradeDTO);
        assertGradeEntityUpdatableFieldsEquals(returnedGradeEntity, getPersistedGradeEntity(returnedGradeEntity));

        insertedGradeEntity = returnedGradeEntity;
    }

    @Test
    @Transactional
    void createGradeWithExistingId() throws Exception {
        // Create the Grade with an existing ID
        gradeEntity.setId(1L);
        GradeDTO gradeDTO = gradeMapper.toDto(gradeEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restGradeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(gradeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Grade in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllGrades() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList
        restGradeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gradeEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].finished").value(hasItem(DEFAULT_FINISHED)));
    }

    @Test
    @Transactional
    void getGrade() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get the grade
        restGradeMockMvc
            .perform(get(ENTITY_API_URL_ID, gradeEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gradeEntity.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.finished").value(DEFAULT_FINISHED));
    }

    @Test
    @Transactional
    void getGradesByIdFiltering() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        Long id = gradeEntity.getId();

        defaultGradeFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultGradeFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultGradeFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllGradesByValueIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where value equals to
        defaultGradeFiltering("value.equals=" + DEFAULT_VALUE, "value.equals=" + UPDATED_VALUE);
    }

    @Test
    @Transactional
    void getAllGradesByValueIsInShouldWork() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where value in
        defaultGradeFiltering("value.in=" + DEFAULT_VALUE + "," + UPDATED_VALUE, "value.in=" + UPDATED_VALUE);
    }

    @Test
    @Transactional
    void getAllGradesByValueIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where value is not null
        defaultGradeFiltering("value.specified=true", "value.specified=false");
    }

    @Test
    @Transactional
    void getAllGradesByValueIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where value is greater than or equal to
        defaultGradeFiltering("value.greaterThanOrEqual=" + DEFAULT_VALUE, "value.greaterThanOrEqual=" + (DEFAULT_VALUE + 1));
    }

    @Test
    @Transactional
    void getAllGradesByValueIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where value is less than or equal to
        defaultGradeFiltering("value.lessThanOrEqual=" + DEFAULT_VALUE, "value.lessThanOrEqual=" + SMALLER_VALUE);
    }

    @Test
    @Transactional
    void getAllGradesByValueIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where value is less than
        defaultGradeFiltering("value.lessThan=" + (DEFAULT_VALUE + 1), "value.lessThan=" + DEFAULT_VALUE);
    }

    @Test
    @Transactional
    void getAllGradesByValueIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where value is greater than
        defaultGradeFiltering("value.greaterThan=" + SMALLER_VALUE, "value.greaterThan=" + DEFAULT_VALUE);
    }

    @Test
    @Transactional
    void getAllGradesByFinishedIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where finished equals to
        defaultGradeFiltering("finished.equals=" + DEFAULT_FINISHED, "finished.equals=" + UPDATED_FINISHED);
    }

    @Test
    @Transactional
    void getAllGradesByFinishedIsInShouldWork() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where finished in
        defaultGradeFiltering("finished.in=" + DEFAULT_FINISHED + "," + UPDATED_FINISHED, "finished.in=" + UPDATED_FINISHED);
    }

    @Test
    @Transactional
    void getAllGradesByFinishedIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        // Get all the gradeList where finished is not null
        defaultGradeFiltering("finished.specified=true", "finished.specified=false");
    }

    @Test
    @Transactional
    void getAllGradesByStudentIsEqualToSomething() throws Exception {
        StudentEntity student;
        if (TestUtil.findAll(em, StudentEntity.class).isEmpty()) {
            gradeRepository.saveAndFlush(gradeEntity);
            student = StudentResourceIT.createEntity();
        } else {
            student = TestUtil.findAll(em, StudentEntity.class).get(0);
        }
        em.persist(student);
        em.flush();
        gradeEntity.setStudent(student);
        gradeRepository.saveAndFlush(gradeEntity);
        Long studentId = student.getId();
        // Get all the gradeList where student equals to studentId
        defaultGradeShouldBeFound("studentId.equals=" + studentId);

        // Get all the gradeList where student equals to (studentId + 1)
        defaultGradeShouldNotBeFound("studentId.equals=" + (studentId + 1));
    }

    @Test
    @Transactional
    void getAllGradesByDisciplinaIsEqualToSomething() throws Exception {
        DisciplinaEntity disciplina;
        if (TestUtil.findAll(em, DisciplinaEntity.class).isEmpty()) {
            gradeRepository.saveAndFlush(gradeEntity);
            disciplina = DisciplinaResourceIT.createEntity(em);
        } else {
            disciplina = TestUtil.findAll(em, DisciplinaEntity.class).get(0);
        }
        em.persist(disciplina);
        em.flush();
        gradeEntity.setDisciplina(disciplina);
        gradeRepository.saveAndFlush(gradeEntity);
        Long disciplinaId = disciplina.getId();
        // Get all the gradeList where disciplina equals to disciplinaId
        defaultGradeShouldBeFound("disciplinaId.equals=" + disciplinaId);

        // Get all the gradeList where disciplina equals to (disciplinaId + 1)
        defaultGradeShouldNotBeFound("disciplinaId.equals=" + (disciplinaId + 1));
    }

    private void defaultGradeFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultGradeShouldBeFound(shouldBeFound);
        defaultGradeShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultGradeShouldBeFound(String filter) throws Exception {
        restGradeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gradeEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].finished").value(hasItem(DEFAULT_FINISHED)));

        // Check, that the count call also returns 1
        restGradeMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultGradeShouldNotBeFound(String filter) throws Exception {
        restGradeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restGradeMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingGrade() throws Exception {
        // Get the grade
        restGradeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingGrade() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the grade
        GradeEntity updatedGradeEntity = gradeRepository.findById(gradeEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedGradeEntity are not directly saved in db
        em.detach(updatedGradeEntity);
        updatedGradeEntity.value(UPDATED_VALUE).finished(UPDATED_FINISHED);
        GradeDTO gradeDTO = gradeMapper.toDto(updatedGradeEntity);

        restGradeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, gradeDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(gradeDTO))
            )
            .andExpect(status().isOk());

        // Validate the Grade in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedGradeEntityToMatchAllProperties(updatedGradeEntity);
    }

    @Test
    @Transactional
    void putNonExistingGrade() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        gradeEntity.setId(longCount.incrementAndGet());

        // Create the Grade
        GradeDTO gradeDTO = gradeMapper.toDto(gradeEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGradeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, gradeDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(gradeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Grade in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchGrade() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        gradeEntity.setId(longCount.incrementAndGet());

        // Create the Grade
        GradeDTO gradeDTO = gradeMapper.toDto(gradeEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGradeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(gradeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Grade in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamGrade() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        gradeEntity.setId(longCount.incrementAndGet());

        // Create the Grade
        GradeDTO gradeDTO = gradeMapper.toDto(gradeEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGradeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(gradeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Grade in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateGradeWithPatch() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the grade using partial update
        GradeEntity partialUpdatedGradeEntity = new GradeEntity();
        partialUpdatedGradeEntity.setId(gradeEntity.getId());

        partialUpdatedGradeEntity.value(UPDATED_VALUE).finished(UPDATED_FINISHED);

        restGradeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGradeEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedGradeEntity))
            )
            .andExpect(status().isOk());

        // Validate the Grade in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertGradeEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedGradeEntity, gradeEntity),
            getPersistedGradeEntity(gradeEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateGradeWithPatch() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the grade using partial update
        GradeEntity partialUpdatedGradeEntity = new GradeEntity();
        partialUpdatedGradeEntity.setId(gradeEntity.getId());

        partialUpdatedGradeEntity.value(UPDATED_VALUE).finished(UPDATED_FINISHED);

        restGradeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGradeEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedGradeEntity))
            )
            .andExpect(status().isOk());

        // Validate the Grade in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertGradeEntityUpdatableFieldsEquals(partialUpdatedGradeEntity, getPersistedGradeEntity(partialUpdatedGradeEntity));
    }

    @Test
    @Transactional
    void patchNonExistingGrade() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        gradeEntity.setId(longCount.incrementAndGet());

        // Create the Grade
        GradeDTO gradeDTO = gradeMapper.toDto(gradeEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGradeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, gradeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(gradeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Grade in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchGrade() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        gradeEntity.setId(longCount.incrementAndGet());

        // Create the Grade
        GradeDTO gradeDTO = gradeMapper.toDto(gradeEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGradeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(gradeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Grade in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamGrade() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        gradeEntity.setId(longCount.incrementAndGet());

        // Create the Grade
        GradeDTO gradeDTO = gradeMapper.toDto(gradeEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGradeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(gradeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Grade in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteGrade() throws Exception {
        // Initialize the database
        insertedGradeEntity = gradeRepository.saveAndFlush(gradeEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the grade
        restGradeMockMvc
            .perform(delete(ENTITY_API_URL_ID, gradeEntity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return gradeRepository.count();
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

    protected GradeEntity getPersistedGradeEntity(GradeEntity grade) {
        return gradeRepository.findById(grade.getId()).orElseThrow();
    }

    protected void assertPersistedGradeEntityToMatchAllProperties(GradeEntity expectedGradeEntity) {
        assertGradeEntityAllPropertiesEquals(expectedGradeEntity, getPersistedGradeEntity(expectedGradeEntity));
    }

    protected void assertPersistedGradeEntityToMatchUpdatableProperties(GradeEntity expectedGradeEntity) {
        assertGradeEntityAllUpdatablePropertiesEquals(expectedGradeEntity, getPersistedGradeEntity(expectedGradeEntity));
    }
}
