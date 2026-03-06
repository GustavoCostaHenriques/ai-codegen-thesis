package pt.formacao.escola.service;

import jakarta.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.formacao.escola.domain.*; // for static metamodels
import pt.formacao.escola.domain.DisciplinaEntity;
import pt.formacao.escola.repository.DisciplinaRepository;
import pt.formacao.escola.service.criteria.DisciplinaCriteria;
import pt.formacao.escola.service.dto.DisciplinaDTO;
import pt.formacao.escola.service.mapper.DisciplinaMapper;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link DisciplinaEntity} entities in the database.
 * The main input is a {@link DisciplinaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link DisciplinaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DisciplinaQueryService extends QueryService<DisciplinaEntity> {

    private static final Logger LOG = LoggerFactory.getLogger(DisciplinaQueryService.class);

    private final DisciplinaRepository disciplinaRepository;

    private final DisciplinaMapper disciplinaMapper;

    public DisciplinaQueryService(DisciplinaRepository disciplinaRepository, DisciplinaMapper disciplinaMapper) {
        this.disciplinaRepository = disciplinaRepository;
        this.disciplinaMapper = disciplinaMapper;
    }

    /**
     * Return a {@link Page} of {@link DisciplinaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<DisciplinaDTO> findByCriteria(DisciplinaCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<DisciplinaEntity> specification = createSpecification(criteria);
        return disciplinaRepository.findAll(specification, page).map(disciplinaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DisciplinaCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<DisciplinaEntity> specification = createSpecification(criteria);
        return disciplinaRepository.count(specification);
    }

    /**
     * Function to convert {@link DisciplinaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<DisciplinaEntity> createSpecification(DisciplinaCriteria criteria) {
        Specification<DisciplinaEntity> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = Specification.allOf(
                Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : null,
                buildRangeSpecification(criteria.getId(), DisciplinaEntity_.id),
                buildStringSpecification(criteria.getName(), DisciplinaEntity_.name),
                buildRangeSpecification(criteria.getCapacity(), DisciplinaEntity_.capacity),
                buildRangeSpecification(criteria.getCredits(), DisciplinaEntity_.credits),
                buildStringSpecification(criteria.getTeacherName(), DisciplinaEntity_.teacherName),
                buildSpecification(criteria.getGradeId(), root -> root.join(DisciplinaEntity_.grades, JoinType.LEFT).get(GradeEntity_.id)),
                buildSpecification(criteria.getCourseId(), root -> root.join(DisciplinaEntity_.course, JoinType.LEFT).get(CourseEntity_.id))
            );
        }
        return specification;
    }
}
