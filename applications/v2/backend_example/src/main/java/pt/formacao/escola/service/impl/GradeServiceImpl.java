package pt.formacao.escola.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.formacao.escola.domain.GradeEntity;
import pt.formacao.escola.repository.GradeRepository;
import pt.formacao.escola.service.GradeService;
import pt.formacao.escola.service.dto.GradeDTO;
import pt.formacao.escola.service.mapper.GradeMapper;

/**
 * Service Implementation for managing {@link pt.formacao.escola.domain.GradeEntity}.
 */
@Service
@Transactional
public class GradeServiceImpl implements GradeService {

    private static final Logger LOG = LoggerFactory.getLogger(GradeServiceImpl.class);

    private final GradeRepository gradeRepository;

    private final GradeMapper gradeMapper;

    public GradeServiceImpl(GradeRepository gradeRepository, GradeMapper gradeMapper) {
        this.gradeRepository = gradeRepository;
        this.gradeMapper = gradeMapper;
    }

    @Override
    public GradeDTO save(GradeDTO gradeDTO) {
        LOG.debug("Request to save Grade : {}", gradeDTO);
        GradeEntity gradeEntity = gradeMapper.toEntity(gradeDTO);
        gradeEntity = gradeRepository.save(gradeEntity);
        return gradeMapper.toDto(gradeEntity);
    }

    @Override
    public GradeDTO update(GradeDTO gradeDTO) {
        LOG.debug("Request to update Grade : {}", gradeDTO);
        GradeEntity gradeEntity = gradeMapper.toEntity(gradeDTO);
        gradeEntity = gradeRepository.save(gradeEntity);
        return gradeMapper.toDto(gradeEntity);
    }

    @Override
    public Optional<GradeDTO> partialUpdate(GradeDTO gradeDTO) {
        LOG.debug("Request to partially update Grade : {}", gradeDTO);

        return gradeRepository
            .findById(gradeDTO.getId())
            .map(existingGrade -> {
                gradeMapper.partialUpdate(existingGrade, gradeDTO);

                return existingGrade;
            })
            .map(gradeRepository::save)
            .map(gradeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GradeDTO> findOne(Long id) {
        LOG.debug("Request to get Grade : {}", id);
        return gradeRepository.findById(id).map(gradeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Grade : {}", id);
        gradeRepository.deleteById(id);
    }
}
