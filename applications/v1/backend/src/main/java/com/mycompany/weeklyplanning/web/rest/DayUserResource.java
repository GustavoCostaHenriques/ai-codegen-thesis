package com.mycompany.weeklyplanning.web.rest;

import com.mycompany.weeklyplanning.repository.DayUserRepository;
import com.mycompany.weeklyplanning.service.DayUserQueryService;
import com.mycompany.weeklyplanning.service.DayUserService;
import com.mycompany.weeklyplanning.service.criteria.DayUserCriteria;
import com.mycompany.weeklyplanning.service.dto.DayUserDTO;
import com.mycompany.weeklyplanning.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.weeklyplanning.domain.DayUserEntity}.
 */
@RestController
@RequestMapping("/api/day-users")
public class DayUserResource {

    private static final Logger LOG = LoggerFactory.getLogger(DayUserResource.class);

    private static final String ENTITY_NAME = "dayUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DayUserService dayUserService;

    private final DayUserRepository dayUserRepository;

    private final DayUserQueryService dayUserQueryService;

    public DayUserResource(DayUserService dayUserService, DayUserRepository dayUserRepository, DayUserQueryService dayUserQueryService) {
        this.dayUserService = dayUserService;
        this.dayUserRepository = dayUserRepository;
        this.dayUserQueryService = dayUserQueryService;
    }

    /**
     * {@code POST  /day-users} : Create a new dayUser.
     *
     * @param dayUserDTO the dayUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dayUserDTO, or with status {@code 400 (Bad Request)} if the dayUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DayUserDTO> createDayUser(@Valid @RequestBody DayUserDTO dayUserDTO) throws URISyntaxException {
        LOG.debug("REST request to save DayUser : {}", dayUserDTO);
        if (dayUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new dayUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        dayUserDTO = dayUserService.save(dayUserDTO);
        return ResponseEntity.created(new URI("/api/day-users/" + dayUserDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, dayUserDTO.getId().toString()))
            .body(dayUserDTO);
    }

    /**
     * {@code PUT  /day-users/:id} : Updates an existing dayUser.
     *
     * @param id the id of the dayUserDTO to save.
     * @param dayUserDTO the dayUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dayUserDTO,
     * or with status {@code 400 (Bad Request)} if the dayUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dayUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DayUserDTO> updateDayUser(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DayUserDTO dayUserDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update DayUser : {}, {}", id, dayUserDTO);
        if (dayUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dayUserDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dayUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        dayUserDTO = dayUserService.update(dayUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dayUserDTO.getId().toString()))
            .body(dayUserDTO);
    }

    /**
     * {@code PATCH  /day-users/:id} : Partial updates given fields of an existing dayUser, field will ignore if it is null
     *
     * @param id the id of the dayUserDTO to save.
     * @param dayUserDTO the dayUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dayUserDTO,
     * or with status {@code 400 (Bad Request)} if the dayUserDTO is not valid,
     * or with status {@code 404 (Not Found)} if the dayUserDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the dayUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DayUserDTO> partialUpdateDayUser(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DayUserDTO dayUserDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update DayUser partially : {}, {}", id, dayUserDTO);
        if (dayUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dayUserDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dayUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DayUserDTO> result = dayUserService.partialUpdate(dayUserDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dayUserDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /day-users} : get all the dayUsers.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dayUsers in body.
     */
    @GetMapping("")
    public ResponseEntity<List<DayUserDTO>> getAllDayUsers(
        DayUserCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get DayUsers by criteria: {}", criteria);

        Page<DayUserDTO> page = dayUserQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /day-users/count} : count all the dayUsers.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countDayUsers(DayUserCriteria criteria) {
        LOG.debug("REST request to count DayUsers by criteria: {}", criteria);
        return ResponseEntity.ok().body(dayUserQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /day-users/:id} : get the "id" dayUser.
     *
     * @param id the id of the dayUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dayUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DayUserDTO> getDayUser(@PathVariable("id") Long id) {
        LOG.debug("REST request to get DayUser : {}", id);
        Optional<DayUserDTO> dayUserDTO = dayUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dayUserDTO);
    }

    /**
     * {@code DELETE  /day-users/:id} : delete the "id" dayUser.
     *
     * @param id the id of the dayUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDayUser(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete DayUser : {}", id);
        dayUserService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
