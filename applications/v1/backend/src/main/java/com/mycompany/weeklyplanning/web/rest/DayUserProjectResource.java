package com.mycompany.weeklyplanning.web.rest;

import com.mycompany.weeklyplanning.repository.DayUserProjectRepository;
import com.mycompany.weeklyplanning.service.DayUserProjectQueryService;
import com.mycompany.weeklyplanning.service.DayUserProjectService;
import com.mycompany.weeklyplanning.service.criteria.DayUserProjectCriteria;
import com.mycompany.weeklyplanning.service.dto.DayUserProjectDTO;
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
 * REST controller for managing {@link com.mycompany.weeklyplanning.domain.DayUserProjectEntity}.
 */
@RestController
@RequestMapping("/api/day-user-projects")
public class DayUserProjectResource {

    private static final Logger LOG = LoggerFactory.getLogger(DayUserProjectResource.class);

    private static final String ENTITY_NAME = "dayUserProject";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DayUserProjectService dayUserProjectService;

    private final DayUserProjectRepository dayUserProjectRepository;

    private final DayUserProjectQueryService dayUserProjectQueryService;

    public DayUserProjectResource(
        DayUserProjectService dayUserProjectService,
        DayUserProjectRepository dayUserProjectRepository,
        DayUserProjectQueryService dayUserProjectQueryService
    ) {
        this.dayUserProjectService = dayUserProjectService;
        this.dayUserProjectRepository = dayUserProjectRepository;
        this.dayUserProjectQueryService = dayUserProjectQueryService;
    }

    /**
     * {@code POST  /day-user-projects} : Create a new dayUserProject.
     *
     * @param dayUserProjectDTO the dayUserProjectDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dayUserProjectDTO, or with status {@code 400 (Bad Request)} if the dayUserProject has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DayUserProjectDTO> createDayUserProject(@Valid @RequestBody DayUserProjectDTO dayUserProjectDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save DayUserProject : {}", dayUserProjectDTO);
        if (dayUserProjectDTO.getId() != null) {
            throw new BadRequestAlertException("A new dayUserProject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        dayUserProjectDTO = dayUserProjectService.save(dayUserProjectDTO);
        return ResponseEntity.created(new URI("/api/day-user-projects/" + dayUserProjectDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, dayUserProjectDTO.getId().toString()))
            .body(dayUserProjectDTO);
    }

    /**
     * {@code PUT  /day-user-projects/:id} : Updates an existing dayUserProject.
     *
     * @param id the id of the dayUserProjectDTO to save.
     * @param dayUserProjectDTO the dayUserProjectDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dayUserProjectDTO,
     * or with status {@code 400 (Bad Request)} if the dayUserProjectDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dayUserProjectDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DayUserProjectDTO> updateDayUserProject(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DayUserProjectDTO dayUserProjectDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update DayUserProject : {}, {}", id, dayUserProjectDTO);
        if (dayUserProjectDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dayUserProjectDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dayUserProjectRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        dayUserProjectDTO = dayUserProjectService.update(dayUserProjectDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dayUserProjectDTO.getId().toString()))
            .body(dayUserProjectDTO);
    }

    /**
     * {@code PATCH  /day-user-projects/:id} : Partial updates given fields of an existing dayUserProject, field will ignore if it is null
     *
     * @param id the id of the dayUserProjectDTO to save.
     * @param dayUserProjectDTO the dayUserProjectDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dayUserProjectDTO,
     * or with status {@code 400 (Bad Request)} if the dayUserProjectDTO is not valid,
     * or with status {@code 404 (Not Found)} if the dayUserProjectDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the dayUserProjectDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DayUserProjectDTO> partialUpdateDayUserProject(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DayUserProjectDTO dayUserProjectDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update DayUserProject partially : {}, {}", id, dayUserProjectDTO);
        if (dayUserProjectDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dayUserProjectDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dayUserProjectRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DayUserProjectDTO> result = dayUserProjectService.partialUpdate(dayUserProjectDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dayUserProjectDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /day-user-projects} : get all the dayUserProjects.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dayUserProjects in body.
     */
    @GetMapping("")
    public ResponseEntity<List<DayUserProjectDTO>> getAllDayUserProjects(
        DayUserProjectCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get DayUserProjects by criteria: {}", criteria);

        Page<DayUserProjectDTO> page = dayUserProjectQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /day-user-projects/count} : count all the dayUserProjects.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countDayUserProjects(DayUserProjectCriteria criteria) {
        LOG.debug("REST request to count DayUserProjects by criteria: {}", criteria);
        return ResponseEntity.ok().body(dayUserProjectQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /day-user-projects/:id} : get the "id" dayUserProject.
     *
     * @param id the id of the dayUserProjectDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dayUserProjectDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DayUserProjectDTO> getDayUserProject(@PathVariable("id") Long id) {
        LOG.debug("REST request to get DayUserProject : {}", id);
        Optional<DayUserProjectDTO> dayUserProjectDTO = dayUserProjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dayUserProjectDTO);
    }

    /**
     * {@code DELETE  /day-user-projects/:id} : delete the "id" dayUserProject.
     *
     * @param id the id of the dayUserProjectDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDayUserProject(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete DayUserProject : {}", id);
        dayUserProjectService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
