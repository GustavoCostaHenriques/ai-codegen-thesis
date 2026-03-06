package pt.formacao.escola.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pt.formacao.escola.repository.StudentAddressRepository;
import pt.formacao.escola.service.StudentAddressQueryService;
import pt.formacao.escola.service.StudentAddressService;
import pt.formacao.escola.service.criteria.StudentAddressCriteria;
import pt.formacao.escola.service.dto.StudentAddressDTO;
import pt.formacao.escola.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link pt.formacao.escola.domain.StudentAddressEntity}.
 */
@RestController
@RequestMapping("/api/student-addresses")
public class StudentAddressResource {

    private static final Logger LOG = LoggerFactory.getLogger(StudentAddressResource.class);

    private static final String ENTITY_NAME = "studentAddress";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentAddressService studentAddressService;

    private final StudentAddressRepository studentAddressRepository;

    private final StudentAddressQueryService studentAddressQueryService;

    public StudentAddressResource(
        StudentAddressService studentAddressService,
        StudentAddressRepository studentAddressRepository,
        StudentAddressQueryService studentAddressQueryService
    ) {
        this.studentAddressService = studentAddressService;
        this.studentAddressRepository = studentAddressRepository;
        this.studentAddressQueryService = studentAddressQueryService;
    }

    /**
     * {@code POST  /student-addresses} : Create a new studentAddress.
     *
     * @param studentAddressDTO the studentAddressDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentAddressDTO, or with status {@code 400 (Bad Request)} if the studentAddress has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<StudentAddressDTO> createStudentAddress(@RequestBody StudentAddressDTO studentAddressDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save StudentAddress : {}", studentAddressDTO);
        if (studentAddressDTO.getId() != null) {
            throw new BadRequestAlertException("A new studentAddress cannot already have an ID", ENTITY_NAME, "idexists");
        }
        studentAddressDTO = studentAddressService.save(studentAddressDTO);
        return ResponseEntity.created(new URI("/api/student-addresses/" + studentAddressDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, studentAddressDTO.getId().toString()))
            .body(studentAddressDTO);
    }

    /**
     * {@code PUT  /student-addresses/:id} : Updates an existing studentAddress.
     *
     * @param id the id of the studentAddressDTO to save.
     * @param studentAddressDTO the studentAddressDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentAddressDTO,
     * or with status {@code 400 (Bad Request)} if the studentAddressDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentAddressDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentAddressDTO> updateStudentAddress(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudentAddressDTO studentAddressDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update StudentAddress : {}, {}", id, studentAddressDTO);
        if (studentAddressDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studentAddressDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studentAddressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        studentAddressDTO = studentAddressService.update(studentAddressDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentAddressDTO.getId().toString()))
            .body(studentAddressDTO);
    }

    /**
     * {@code PATCH  /student-addresses/:id} : Partial updates given fields of an existing studentAddress, field will ignore if it is null
     *
     * @param id the id of the studentAddressDTO to save.
     * @param studentAddressDTO the studentAddressDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentAddressDTO,
     * or with status {@code 400 (Bad Request)} if the studentAddressDTO is not valid,
     * or with status {@code 404 (Not Found)} if the studentAddressDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the studentAddressDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StudentAddressDTO> partialUpdateStudentAddress(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudentAddressDTO studentAddressDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update StudentAddress partially : {}, {}", id, studentAddressDTO);
        if (studentAddressDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studentAddressDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studentAddressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StudentAddressDTO> result = studentAddressService.partialUpdate(studentAddressDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentAddressDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /student-addresses} : get all the studentAddresses.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentAddresses in body.
     */
    @GetMapping("")
    public ResponseEntity<List<StudentAddressDTO>> getAllStudentAddresses(
        StudentAddressCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get StudentAddresses by criteria: {}", criteria);

        Page<StudentAddressDTO> page = studentAddressQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /student-addresses/count} : count all the studentAddresses.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countStudentAddresses(StudentAddressCriteria criteria) {
        LOG.debug("REST request to count StudentAddresses by criteria: {}", criteria);
        return ResponseEntity.ok().body(studentAddressQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /student-addresses/:id} : get the "id" studentAddress.
     *
     * @param id the id of the studentAddressDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentAddressDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentAddressDTO> getStudentAddress(@PathVariable("id") Long id) {
        LOG.debug("REST request to get StudentAddress : {}", id);
        Optional<StudentAddressDTO> studentAddressDTO = studentAddressService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentAddressDTO);
    }

    /**
     * {@code DELETE  /student-addresses/:id} : delete the "id" studentAddress.
     *
     * @param id the id of the studentAddressDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentAddress(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete StudentAddress : {}", id);
        studentAddressService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
