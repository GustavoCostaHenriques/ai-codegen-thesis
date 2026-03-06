package com.mycompany.weeklyplanning.web.rest;

import com.mycompany.weeklyplanning.repository.WeekRepository;
import com.mycompany.weeklyplanning.service.WeekQueryService;
import com.mycompany.weeklyplanning.service.WeekService;
import com.mycompany.weeklyplanning.service.criteria.WeekCriteria;
import com.mycompany.weeklyplanning.service.dto.WeekDTO;
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
 * REST controller for managing {@link com.mycompany.weeklyplanning.domain.WeekEntity}.
 */
@RestController
@RequestMapping("/api/weeks")
public class WeekResource {

    private static final Logger LOG = LoggerFactory.getLogger(WeekResource.class);

    private static final String ENTITY_NAME = "week";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WeekService weekService;

    private final WeekRepository weekRepository;

    private final WeekQueryService weekQueryService;

    public WeekResource(WeekService weekService, WeekRepository weekRepository, WeekQueryService weekQueryService) {
        this.weekService = weekService;
        this.weekRepository = weekRepository;
        this.weekQueryService = weekQueryService;
    }

    /**
     * {@code POST  /weeks} : Create a new week.
     *
     * @param weekDTO the weekDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new weekDTO, or with status {@code 400 (Bad Request)} if the week has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<WeekDTO> createWeek(@Valid @RequestBody WeekDTO weekDTO) throws URISyntaxException {
        LOG.debug("REST request to save Week : {}", weekDTO);
        if (weekDTO.getId() != null) {
            throw new BadRequestAlertException("A new week cannot already have an ID", ENTITY_NAME, "idexists");
        }
        weekDTO = weekService.save(weekDTO);
        return ResponseEntity.created(new URI("/api/weeks/" + weekDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, weekDTO.getId().toString()))
            .body(weekDTO);
    }

    /**
     * {@code PUT  /weeks/:id} : Updates an existing week.
     *
     * @param id the id of the weekDTO to save.
     * @param weekDTO the weekDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated weekDTO,
     * or with status {@code 400 (Bad Request)} if the weekDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the weekDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<WeekDTO> updateWeek(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody WeekDTO weekDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Week : {}, {}", id, weekDTO);
        if (weekDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, weekDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!weekRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        weekDTO = weekService.update(weekDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, weekDTO.getId().toString()))
            .body(weekDTO);
    }

    /**
     * {@code PATCH  /weeks/:id} : Partial updates given fields of an existing week, field will ignore if it is null
     *
     * @param id the id of the weekDTO to save.
     * @param weekDTO the weekDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated weekDTO,
     * or with status {@code 400 (Bad Request)} if the weekDTO is not valid,
     * or with status {@code 404 (Not Found)} if the weekDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the weekDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WeekDTO> partialUpdateWeek(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody WeekDTO weekDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Week partially : {}, {}", id, weekDTO);
        if (weekDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, weekDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!weekRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WeekDTO> result = weekService.partialUpdate(weekDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, weekDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /weeks} : get all the weeks.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of weeks in body.
     */
    @GetMapping("")
    public ResponseEntity<List<WeekDTO>> getAllWeeks(
        WeekCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get Weeks by criteria: {}", criteria);

        Page<WeekDTO> page = weekQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /weeks/count} : count all the weeks.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countWeeks(WeekCriteria criteria) {
        LOG.debug("REST request to count Weeks by criteria: {}", criteria);
        return ResponseEntity.ok().body(weekQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /weeks/:id} : get the "id" week.
     *
     * @param id the id of the weekDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the weekDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<WeekDTO> getWeek(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Week : {}", id);
        Optional<WeekDTO> weekDTO = weekService.findOne(id);
        return ResponseUtil.wrapOrNotFound(weekDTO);
    }

    /**
     * {@code DELETE  /weeks/:id} : delete the "id" week.
     *
     * @param id the id of the weekDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeek(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Week : {}", id);
        weekService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
