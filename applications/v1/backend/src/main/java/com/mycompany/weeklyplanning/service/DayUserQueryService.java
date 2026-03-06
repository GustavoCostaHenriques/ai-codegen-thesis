package com.mycompany.weeklyplanning.service;

import com.mycompany.weeklyplanning.domain.*; // for static metamodels
import com.mycompany.weeklyplanning.domain.DayUserEntity;
import com.mycompany.weeklyplanning.repository.DayUserRepository;
import com.mycompany.weeklyplanning.service.criteria.DayUserCriteria;
import com.mycompany.weeklyplanning.service.dto.DayUserDTO;
import com.mycompany.weeklyplanning.service.mapper.DayUserMapper;
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
 * Service for executing complex queries for {@link DayUserEntity} entities in the database.
 * The main input is a {@link DayUserCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link DayUserDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DayUserQueryService extends QueryService<DayUserEntity> {

    private static final Logger LOG = LoggerFactory.getLogger(DayUserQueryService.class);

    private final DayUserRepository dayUserRepository;

    private final DayUserMapper dayUserMapper;

    public DayUserQueryService(DayUserRepository dayUserRepository, DayUserMapper dayUserMapper) {
        this.dayUserRepository = dayUserRepository;
        this.dayUserMapper = dayUserMapper;
    }

    /**
     * Return a {@link Page} of {@link DayUserDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<DayUserDTO> findByCriteria(DayUserCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<DayUserEntity> specification = createSpecification(criteria);
        return dayUserRepository.findAll(specification, page).map(dayUserMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DayUserCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<DayUserEntity> specification = createSpecification(criteria);
        return dayUserRepository.count(specification);
    }

    /**
     * Function to convert {@link DayUserCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<DayUserEntity> createSpecification(DayUserCriteria criteria) {
        Specification<DayUserEntity> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = Specification.allOf(
                Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : null,
                buildRangeSpecification(criteria.getId(), DayUserEntity_.id),
                buildSpecification(criteria.getAssignmentsId(), root ->
                    root.join(DayUserEntity_.assignments, JoinType.LEFT).get(DayUserProjectEntity_.id)
                ),
                buildSpecification(criteria.getUserId(), root -> root.join(DayUserEntity_.user, JoinType.LEFT).get(AppUserEntity_.id)),
                buildSpecification(criteria.getDayPlanId(), root -> root.join(DayUserEntity_.dayPlan, JoinType.LEFT).get(DayPlanEntity_.id))
            );
        }
        return specification;
    }
}
