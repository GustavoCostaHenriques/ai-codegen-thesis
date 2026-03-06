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
import pt.formacao.escola.domain.CourseEntity;
import pt.formacao.escola.repository.CourseRepository;
import pt.formacao.escola.service.criteria.CourseCriteria;
import pt.formacao.escola.service.dto.CourseDTO;
import pt.formacao.escola.service.mapper.CourseMapper;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link CourseEntity} entities in the database.
 * The main input is a {@link CourseCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link CourseDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CourseQueryService extends QueryService<CourseEntity> {

    private static final Logger LOG = LoggerFactory.getLogger(CourseQueryService.class);

    private final CourseRepository courseRepository;

    private final CourseMapper courseMapper;

    public CourseQueryService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    /**
     * Return a {@link Page} of {@link CourseDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<CourseDTO> findByCriteria(CourseCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<CourseEntity> specification = createSpecification(criteria);
        return courseRepository.findAll(specification, page).map(courseMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(CourseCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<CourseEntity> specification = createSpecification(criteria);
        return courseRepository.count(specification);
    }

    /**
     * Function to convert {@link CourseCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<CourseEntity> createSpecification(CourseCriteria criteria) {
        Specification<CourseEntity> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = Specification.allOf(
                Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : null,
                buildRangeSpecification(criteria.getId(), CourseEntity_.id),
                buildStringSpecification(criteria.getName(), CourseEntity_.name),
                buildSpecification(criteria.getDisciplinaId(), root ->
                    root.join(CourseEntity_.disciplinas, JoinType.LEFT).get(DisciplinaEntity_.id)
                ),
                buildSpecification(criteria.getStudentId(), root -> root.join(CourseEntity_.students, JoinType.LEFT).get(StudentEntity_.id))
            );
        }
        return specification;
    }
}
