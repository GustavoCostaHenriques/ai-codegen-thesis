package com.mycompany.weeklyplanning.service;

import com.mycompany.weeklyplanning.domain.*; // for static metamodels
import com.mycompany.weeklyplanning.domain.DayPlanEntity;
import com.mycompany.weeklyplanning.repository.DayPlanRepository;
import com.mycompany.weeklyplanning.service.criteria.DayPlanCriteria;
import com.mycompany.weeklyplanning.service.dto.DayPlanDTO;
import com.mycompany.weeklyplanning.service.mapper.DayPlanMapper;
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
 * Service for executing complex queries for {@link DayPlanEntity} entities in the database.
 * The main input is a {@link DayPlanCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link DayPlanDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DayPlanQueryService extends QueryService<DayPlanEntity> {

    private static final Logger LOG = LoggerFactory.getLogger(DayPlanQueryService.class);

    private final DayPlanRepository dayPlanRepository;

    private final DayPlanMapper dayPlanMapper;

    public DayPlanQueryService(DayPlanRepository dayPlanRepository, DayPlanMapper dayPlanMapper) {
        this.dayPlanRepository = dayPlanRepository;
        this.dayPlanMapper = dayPlanMapper;
    }

    /**
     * Return a {@link Page} of {@link DayPlanDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<DayPlanDTO> findByCriteria(DayPlanCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<DayPlanEntity> specification = createSpecification(criteria);
        return dayPlanRepository.findAll(specification, page).map(dayPlanMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DayPlanCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<DayPlanEntity> specification = createSpecification(criteria);
        return dayPlanRepository.count(specification);
    }

    /**
     * Function to convert {@link DayPlanCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<DayPlanEntity> createSpecification(DayPlanCriteria criteria) {
        Specification<DayPlanEntity> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = Specification.allOf(
                Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : null,
                buildRangeSpecification(criteria.getId(), DayPlanEntity_.id),
                buildRangeSpecification(criteria.getDate(), DayPlanEntity_.date),
                buildSpecification(criteria.getDayUsersId(), root ->
                    root.join(DayPlanEntity_.dayUsers, JoinType.LEFT).get(DayUserEntity_.id)
                ),
                buildSpecification(criteria.getWeekId(), root -> root.join(DayPlanEntity_.week, JoinType.LEFT).get(WeekEntity_.id))
            );
        }
        return specification;
    }
}
