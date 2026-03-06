package com.mycompany.weeklyplanning.service;

import com.mycompany.weeklyplanning.domain.*; // for static metamodels
import com.mycompany.weeklyplanning.domain.DayUserProjectEntity;
import com.mycompany.weeklyplanning.repository.DayUserProjectRepository;
import com.mycompany.weeklyplanning.service.criteria.DayUserProjectCriteria;
import com.mycompany.weeklyplanning.service.dto.DayUserProjectDTO;
import com.mycompany.weeklyplanning.service.mapper.DayUserProjectMapper;
import jakarta.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link DayUserProjectEntity} entities in the database.
 * The main input is a {@link DayUserProjectCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link DayUserProjectDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DayUserProjectQueryService extends QueryService<DayUserProjectEntity> {

    private static final Logger LOG = LoggerFactory.getLogger(DayUserProjectQueryService.class);

    private final DayUserProjectRepository dayUserProjectRepository;

    private final DayUserProjectMapper dayUserProjectMapper;

    public DayUserProjectQueryService(DayUserProjectRepository dayUserProjectRepository, DayUserProjectMapper dayUserProjectMapper) {
        this.dayUserProjectRepository = dayUserProjectRepository;
        this.dayUserProjectMapper = dayUserProjectMapper;
    }

    /**
     * Return a {@link Page} of {@link DayUserProjectDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<DayUserProjectDTO> findByCriteria(DayUserProjectCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<DayUserProjectEntity> specification = createSpecification(criteria);
        return dayUserProjectRepository.findAll(specification, page).map(dayUserProjectMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DayUserProjectCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<DayUserProjectEntity> specification = createSpecification(criteria);
        return dayUserProjectRepository.count(specification);
    }

    /**
     * Function to convert {@link DayUserProjectCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<DayUserProjectEntity> createSpecification(DayUserProjectCriteria criteria) {
        Specification<DayUserProjectEntity> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = Specification.allOf(
                Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : null,
                buildRangeSpecification(criteria.getId(), DayUserProjectEntity_.id),
                buildSpecification(criteria.getTasksId(), root -> root.join(DayUserProjectEntity_.tasks, JoinType.LEFT).get(TaskEntity_.id)
                ),
                buildSpecification(criteria.getDayUserId(), root ->
                    root.join(DayUserProjectEntity_.dayUser, JoinType.LEFT).get(DayUserEntity_.id)
                ),
                buildSpecification(criteria.getProjectId(), root ->
                    root.join(DayUserProjectEntity_.project, JoinType.LEFT).get(ProjectEntity_.id)
                )
            );
        }
        return specification;
    }
}
