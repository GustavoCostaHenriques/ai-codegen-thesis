package pt.formacao.escola.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.formacao.escola.domain.CourseEntity;
import pt.formacao.escola.repository.CourseRepository;
import pt.formacao.escola.service.CourseService;
import pt.formacao.escola.service.dto.CourseDTO;
import pt.formacao.escola.service.mapper.CourseMapper;

/**
 * Service Implementation for managing {@link pt.formacao.escola.domain.CourseEntity}.
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private static final Logger LOG = LoggerFactory.getLogger(CourseServiceImpl.class);

    private final CourseRepository courseRepository;

    private final CourseMapper courseMapper;

    public CourseServiceImpl(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    @Override
    public CourseDTO save(CourseDTO courseDTO) {
        LOG.debug("Request to save Course : {}", courseDTO);
        CourseEntity courseEntity = courseMapper.toEntity(courseDTO);
        courseEntity = courseRepository.save(courseEntity);
        return courseMapper.toDto(courseEntity);
    }

    @Override
    public CourseDTO update(CourseDTO courseDTO) {
        LOG.debug("Request to update Course : {}", courseDTO);
        CourseEntity courseEntity = courseMapper.toEntity(courseDTO);
        courseEntity = courseRepository.save(courseEntity);
        return courseMapper.toDto(courseEntity);
    }

    @Override
    public Optional<CourseDTO> partialUpdate(CourseDTO courseDTO) {
        LOG.debug("Request to partially update Course : {}", courseDTO);

        return courseRepository
            .findById(courseDTO.getId())
            .map(existingCourse -> {
                courseMapper.partialUpdate(existingCourse, courseDTO);

                return existingCourse;
            })
            .map(courseRepository::save)
            .map(courseMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CourseDTO> findOne(Long id) {
        LOG.debug("Request to get Course : {}", id);
        return courseRepository.findById(id).map(courseMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Course : {}", id);
        courseRepository.deleteById(id);
    }
}
