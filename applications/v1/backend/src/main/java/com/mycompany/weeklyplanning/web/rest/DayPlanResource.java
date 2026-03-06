package com.mycompany.weeklyplanning.web.rest;

import com.mycompany.weeklyplanning.repository.DayPlanRepository;
import com.mycompany.weeklyplanning.service.DayPlanQueryService;
import com.mycompany.weeklyplanning.service.DayPlanService;
import com.mycompany.weeklyplanning.service.criteria.DayPlanCriteria;
import com.mycompany.weeklyplanning.service.dto.DayPlanDTO;
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
 * REST controller for managing {@link com.mycompany.weeklyplanning.domain.DayPlanEntity}.
 */
@RestController
@RequestMapping("/api/day-plans")
public class DayPlanResource {

    private static final Logger LOG = LoggerFactory.getLogger(DayPlanResource.class);

    private static final String ENTITY_NAME = "dayPlan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DayPlanService dayPlanService;

    private final DayPlanRepository dayPlanRepository;

    private final DayPlanQueryService dayPlanQueryService;

    public DayPlanResource(DayPlanService dayPlanService, DayPlanRepository dayPlanRepository, DayPlanQueryService dayPlanQueryService) {
        this.dayPlanService = dayPlanService;
        this.dayPlanRepository = dayPlanRepository;
        this.dayPlanQueryService = dayPlanQueryService;
    }

    /**
     * {@code POST  /day-plans} : Create a new dayPlan.
     *
     * @param dayPlanDTO the dayPlanDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dayPlanDTO, or with status {@code 400 (Bad Request)} if the dayPlan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DayPlanDTO> createDayPlan(@Valid @RequestBody DayPlanDTO dayPlanDTO) throws URISyntaxException {
        LOG.debug("REST request to save DayPlan : {}", dayPlanDTO);
        if (dayPlanDTO.getId() != null) {
            throw new BadRequestAlertException("A new dayPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        dayPlanDTO = dayPlanService.save(dayPlanDTO);
        return ResponseEntity.created(new URI("/api/day-plans/" + dayPlanDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, dayPlanDTO.getId().toString()))
            .body(dayPlanDTO);
    }

    /**
     * {@code PUT  /day-plans/:id} : Updates an existing dayPlan.
     *
     * @param id the id of the dayPlanDTO to save.
     * @param dayPlanDTO the dayPlanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dayPlanDTO,
     * or with status {@code 400 (Bad Request)} if the dayPlanDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dayPlanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DayPlanDTO> updateDayPlan(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DayPlanDTO dayPlanDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update DayPlan : {}, {}", id, dayPlanDTO);
        if (dayPlanDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dayPlanDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dayPlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        dayPlanDTO = dayPlanService.update(dayPlanDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dayPlanDTO.getId().toString()))
            .body(dayPlanDTO);
    }

    /**
     * {@code PATCH  /day-plans/:id} : Partial updates given fields of an existing dayPlan, field will ignore if it is null
     *
     * @param id the id of the dayPlanDTO to save.
     * @param dayPlanDTO the dayPlanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dayPlanDTO,
     * or with status {@code 400 (Bad Request)} if the dayPlanDTO is not valid,
     * or with status {@code 404 (Not Found)} if the dayPlanDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the dayPlanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DayPlanDTO> partialUpdateDayPlan(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DayPlanDTO dayPlanDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update DayPlan partially : {}, {}", id, dayPlanDTO);
        if (dayPlanDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dayPlanDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dayPlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DayPlanDTO> result = dayPlanService.partialUpdate(dayPlanDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dayPlanDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /day-plans} : get all the dayPlans.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dayPlans in body.
     */
    @GetMapping("")
    public ResponseEntity<List<DayPlanDTO>> getAllDayPlans(
        DayPlanCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get DayPlans by criteria: {}", criteria);

        Page<DayPlanDTO> page = dayPlanQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /day-plans/count} : count all the dayPlans.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countDayPlans(DayPlanCriteria criteria) {
        LOG.debug("REST request to count DayPlans by criteria: {}", criteria);
        return ResponseEntity.ok().body(dayPlanQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /day-plans/:id} : get the "id" dayPlan.
     *
     * @param id the id of the dayPlanDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dayPlanDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DayPlanDTO> getDayPlan(@PathVariable("id") Long id) {
        LOG.debug("REST request to get DayPlan : {}", id);
        Optional<DayPlanDTO> dayPlanDTO = dayPlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dayPlanDTO);
    }

    /**
     * {@code DELETE  /day-plans/:id} : delete the "id" dayPlan.
     *
     * @param id the id of the dayPlanDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDayPlan(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete DayPlan : {}", id);
        dayPlanService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
