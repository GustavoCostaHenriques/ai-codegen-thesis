package pt.formacao.escola.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static pt.formacao.escola.domain.StudentAddressEntityAsserts.*;
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
import pt.formacao.escola.domain.StudentAddressEntity;
import pt.formacao.escola.repository.StudentAddressRepository;
import pt.formacao.escola.service.dto.StudentAddressDTO;
import pt.formacao.escola.service.mapper.StudentAddressMapper;

/**
 * Integration tests for the {@link StudentAddressResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StudentAddressResourceIT {

    private static final String DEFAULT_ADRESS_LINE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESS_LINE = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/student-addresses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private StudentAddressRepository studentAddressRepository;

    @Autowired
    private StudentAddressMapper studentAddressMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudentAddressMockMvc;

    private StudentAddressEntity studentAddressEntity;

    private StudentAddressEntity insertedStudentAddressEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentAddressEntity createEntity() {
        return new StudentAddressEntity()
            .adressLine(DEFAULT_ADRESS_LINE)
            .postalCode(DEFAULT_POSTAL_CODE)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentAddressEntity createUpdatedEntity() {
        return new StudentAddressEntity()
            .adressLine(UPDATED_ADRESS_LINE)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY);
    }

    @BeforeEach
    void initTest() {
        studentAddressEntity = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedStudentAddressEntity != null) {
            studentAddressRepository.delete(insertedStudentAddressEntity);
            insertedStudentAddressEntity = null;
        }
    }

    @Test
    @Transactional
    void createStudentAddress() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the StudentAddress
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(studentAddressEntity);
        var returnedStudentAddressDTO = om.readValue(
            restStudentAddressMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentAddressDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            StudentAddressDTO.class
        );

        // Validate the StudentAddress in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedStudentAddressEntity = studentAddressMapper.toEntity(returnedStudentAddressDTO);
        assertStudentAddressEntityUpdatableFieldsEquals(
            returnedStudentAddressEntity,
            getPersistedStudentAddressEntity(returnedStudentAddressEntity)
        );

        insertedStudentAddressEntity = returnedStudentAddressEntity;
    }

    @Test
    @Transactional
    void createStudentAddressWithExistingId() throws Exception {
        // Create the StudentAddress with an existing ID
        studentAddressEntity.setId(1L);
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(studentAddressEntity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentAddressMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentAddressDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudentAddress in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStudentAddresses() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList
        restStudentAddressMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentAddressEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].adressLine").value(hasItem(DEFAULT_ADRESS_LINE)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)));
    }

    @Test
    @Transactional
    void getStudentAddress() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get the studentAddress
        restStudentAddressMockMvc
            .perform(get(ENTITY_API_URL_ID, studentAddressEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(studentAddressEntity.getId().intValue()))
            .andExpect(jsonPath("$.adressLine").value(DEFAULT_ADRESS_LINE))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY));
    }

    @Test
    @Transactional
    void getStudentAddressesByIdFiltering() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        Long id = studentAddressEntity.getId();

        defaultStudentAddressFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultStudentAddressFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultStudentAddressFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByAdressLineIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where adressLine equals to
        defaultStudentAddressFiltering("adressLine.equals=" + DEFAULT_ADRESS_LINE, "adressLine.equals=" + UPDATED_ADRESS_LINE);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByAdressLineIsInShouldWork() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where adressLine in
        defaultStudentAddressFiltering(
            "adressLine.in=" + DEFAULT_ADRESS_LINE + "," + UPDATED_ADRESS_LINE,
            "adressLine.in=" + UPDATED_ADRESS_LINE
        );
    }

    @Test
    @Transactional
    void getAllStudentAddressesByAdressLineIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where adressLine is not null
        defaultStudentAddressFiltering("adressLine.specified=true", "adressLine.specified=false");
    }

    @Test
    @Transactional
    void getAllStudentAddressesByAdressLineContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where adressLine contains
        defaultStudentAddressFiltering("adressLine.contains=" + DEFAULT_ADRESS_LINE, "adressLine.contains=" + UPDATED_ADRESS_LINE);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByAdressLineNotContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where adressLine does not contain
        defaultStudentAddressFiltering(
            "adressLine.doesNotContain=" + UPDATED_ADRESS_LINE,
            "adressLine.doesNotContain=" + DEFAULT_ADRESS_LINE
        );
    }

    @Test
    @Transactional
    void getAllStudentAddressesByPostalCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where postalCode equals to
        defaultStudentAddressFiltering("postalCode.equals=" + DEFAULT_POSTAL_CODE, "postalCode.equals=" + UPDATED_POSTAL_CODE);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByPostalCodeIsInShouldWork() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where postalCode in
        defaultStudentAddressFiltering(
            "postalCode.in=" + DEFAULT_POSTAL_CODE + "," + UPDATED_POSTAL_CODE,
            "postalCode.in=" + UPDATED_POSTAL_CODE
        );
    }

    @Test
    @Transactional
    void getAllStudentAddressesByPostalCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where postalCode is not null
        defaultStudentAddressFiltering("postalCode.specified=true", "postalCode.specified=false");
    }

    @Test
    @Transactional
    void getAllStudentAddressesByPostalCodeContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where postalCode contains
        defaultStudentAddressFiltering("postalCode.contains=" + DEFAULT_POSTAL_CODE, "postalCode.contains=" + UPDATED_POSTAL_CODE);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByPostalCodeNotContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where postalCode does not contain
        defaultStudentAddressFiltering(
            "postalCode.doesNotContain=" + UPDATED_POSTAL_CODE,
            "postalCode.doesNotContain=" + DEFAULT_POSTAL_CODE
        );
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCityIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where city equals to
        defaultStudentAddressFiltering("city.equals=" + DEFAULT_CITY, "city.equals=" + UPDATED_CITY);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCityIsInShouldWork() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where city in
        defaultStudentAddressFiltering("city.in=" + DEFAULT_CITY + "," + UPDATED_CITY, "city.in=" + UPDATED_CITY);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCityIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where city is not null
        defaultStudentAddressFiltering("city.specified=true", "city.specified=false");
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCityContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where city contains
        defaultStudentAddressFiltering("city.contains=" + DEFAULT_CITY, "city.contains=" + UPDATED_CITY);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCityNotContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where city does not contain
        defaultStudentAddressFiltering("city.doesNotContain=" + UPDATED_CITY, "city.doesNotContain=" + DEFAULT_CITY);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCountryIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where country equals to
        defaultStudentAddressFiltering("country.equals=" + DEFAULT_COUNTRY, "country.equals=" + UPDATED_COUNTRY);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCountryIsInShouldWork() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where country in
        defaultStudentAddressFiltering("country.in=" + DEFAULT_COUNTRY + "," + UPDATED_COUNTRY, "country.in=" + UPDATED_COUNTRY);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCountryIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where country is not null
        defaultStudentAddressFiltering("country.specified=true", "country.specified=false");
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCountryContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where country contains
        defaultStudentAddressFiltering("country.contains=" + DEFAULT_COUNTRY, "country.contains=" + UPDATED_COUNTRY);
    }

    @Test
    @Transactional
    void getAllStudentAddressesByCountryNotContainsSomething() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        // Get all the studentAddressList where country does not contain
        defaultStudentAddressFiltering("country.doesNotContain=" + UPDATED_COUNTRY, "country.doesNotContain=" + DEFAULT_COUNTRY);
    }

    private void defaultStudentAddressFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultStudentAddressShouldBeFound(shouldBeFound);
        defaultStudentAddressShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultStudentAddressShouldBeFound(String filter) throws Exception {
        restStudentAddressMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentAddressEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].adressLine").value(hasItem(DEFAULT_ADRESS_LINE)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)));

        // Check, that the count call also returns 1
        restStudentAddressMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultStudentAddressShouldNotBeFound(String filter) throws Exception {
        restStudentAddressMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restStudentAddressMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingStudentAddress() throws Exception {
        // Get the studentAddress
        restStudentAddressMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStudentAddress() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentAddress
        StudentAddressEntity updatedStudentAddressEntity = studentAddressRepository.findById(studentAddressEntity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedStudentAddressEntity are not directly saved in db
        em.detach(updatedStudentAddressEntity);
        updatedStudentAddressEntity
            .adressLine(UPDATED_ADRESS_LINE)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY);
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(updatedStudentAddressEntity);

        restStudentAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentAddressDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentAddressDTO))
            )
            .andExpect(status().isOk());

        // Validate the StudentAddress in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedStudentAddressEntityToMatchAllProperties(updatedStudentAddressEntity);
    }

    @Test
    @Transactional
    void putNonExistingStudentAddress() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAddressEntity.setId(longCount.incrementAndGet());

        // Create the StudentAddress
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(studentAddressEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentAddressDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentAddressDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentAddress in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStudentAddress() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAddressEntity.setId(longCount.incrementAndGet());

        // Create the StudentAddress
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(studentAddressEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentAddressDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentAddress in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStudentAddress() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAddressEntity.setId(longCount.incrementAndGet());

        // Create the StudentAddress
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(studentAddressEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentAddressMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentAddressDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudentAddress in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStudentAddressWithPatch() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentAddress using partial update
        StudentAddressEntity partialUpdatedStudentAddressEntity = new StudentAddressEntity();
        partialUpdatedStudentAddressEntity.setId(studentAddressEntity.getId());

        partialUpdatedStudentAddressEntity.adressLine(UPDATED_ADRESS_LINE).country(UPDATED_COUNTRY);

        restStudentAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentAddressEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentAddressEntity))
            )
            .andExpect(status().isOk());

        // Validate the StudentAddress in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentAddressEntityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedStudentAddressEntity, studentAddressEntity),
            getPersistedStudentAddressEntity(studentAddressEntity)
        );
    }

    @Test
    @Transactional
    void fullUpdateStudentAddressWithPatch() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentAddress using partial update
        StudentAddressEntity partialUpdatedStudentAddressEntity = new StudentAddressEntity();
        partialUpdatedStudentAddressEntity.setId(studentAddressEntity.getId());

        partialUpdatedStudentAddressEntity
            .adressLine(UPDATED_ADRESS_LINE)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY);

        restStudentAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentAddressEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentAddressEntity))
            )
            .andExpect(status().isOk());

        // Validate the StudentAddress in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentAddressEntityUpdatableFieldsEquals(
            partialUpdatedStudentAddressEntity,
            getPersistedStudentAddressEntity(partialUpdatedStudentAddressEntity)
        );
    }

    @Test
    @Transactional
    void patchNonExistingStudentAddress() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAddressEntity.setId(longCount.incrementAndGet());

        // Create the StudentAddress
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(studentAddressEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, studentAddressDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentAddressDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentAddress in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStudentAddress() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAddressEntity.setId(longCount.incrementAndGet());

        // Create the StudentAddress
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(studentAddressEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentAddressDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentAddress in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStudentAddress() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAddressEntity.setId(longCount.incrementAndGet());

        // Create the StudentAddress
        StudentAddressDTO studentAddressDTO = studentAddressMapper.toDto(studentAddressEntity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentAddressMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(studentAddressDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudentAddress in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStudentAddress() throws Exception {
        // Initialize the database
        insertedStudentAddressEntity = studentAddressRepository.saveAndFlush(studentAddressEntity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the studentAddress
        restStudentAddressMockMvc
            .perform(delete(ENTITY_API_URL_ID, studentAddressEntity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return studentAddressRepository.count();
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

    protected StudentAddressEntity getPersistedStudentAddressEntity(StudentAddressEntity studentAddress) {
        return studentAddressRepository.findById(studentAddress.getId()).orElseThrow();
    }

    protected void assertPersistedStudentAddressEntityToMatchAllProperties(StudentAddressEntity expectedStudentAddressEntity) {
        assertStudentAddressEntityAllPropertiesEquals(
            expectedStudentAddressEntity,
            getPersistedStudentAddressEntity(expectedStudentAddressEntity)
        );
    }

    protected void assertPersistedStudentAddressEntityToMatchUpdatableProperties(StudentAddressEntity expectedStudentAddressEntity) {
        assertStudentAddressEntityAllUpdatablePropertiesEquals(
            expectedStudentAddressEntity,
            getPersistedStudentAddressEntity(expectedStudentAddressEntity)
        );
    }
}
