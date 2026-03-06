package pt.formacao.escola.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.formacao.escola.domain.DisciplinaEntity;
import pt.formacao.escola.repository.DisciplinaRepository;
import pt.formacao.escola.service.DisciplinaService;
import pt.formacao.escola.service.dto.DisciplinaDTO;
import pt.formacao.escola.service.mapper.DisciplinaMapper;

/**
 * Service Implementation for managing {@link pt.formacao.escola.domain.DisciplinaEntity}.
 */
@Service
@Transactional
public class DisciplinaServiceImpl implements DisciplinaService {

    private static final Logger LOG = LoggerFactory.getLogger(DisciplinaServiceImpl.class);

    private final DisciplinaRepository disciplinaRepository;

    private final DisciplinaMapper disciplinaMapper;

    public DisciplinaServiceImpl(DisciplinaRepository disciplinaRepository, DisciplinaMapper disciplinaMapper) {
        this.disciplinaRepository = disciplinaRepository;
        this.disciplinaMapper = disciplinaMapper;
    }

    @Override
    public DisciplinaDTO save(DisciplinaDTO disciplinaDTO) {
        LOG.debug("Request to save Disciplina : {}", disciplinaDTO);
        DisciplinaEntity disciplinaEntity = disciplinaMapper.toEntity(disciplinaDTO);
        disciplinaEntity = disciplinaRepository.save(disciplinaEntity);
        return disciplinaMapper.toDto(disciplinaEntity);
    }

    @Override
    public DisciplinaDTO update(DisciplinaDTO disciplinaDTO) {
        LOG.debug("Request to update Disciplina : {}", disciplinaDTO);
        DisciplinaEntity disciplinaEntity = disciplinaMapper.toEntity(disciplinaDTO);
        disciplinaEntity = disciplinaRepository.save(disciplinaEntity);
        return disciplinaMapper.toDto(disciplinaEntity);
    }

    @Override
    public Optional<DisciplinaDTO> partialUpdate(DisciplinaDTO disciplinaDTO) {
        LOG.debug("Request to partially update Disciplina : {}", disciplinaDTO);

        return disciplinaRepository
            .findById(disciplinaDTO.getId())
            .map(existingDisciplina -> {
                disciplinaMapper.partialUpdate(existingDisciplina, disciplinaDTO);

                return existingDisciplina;
            })
            .map(disciplinaRepository::save)
            .map(disciplinaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DisciplinaDTO> findOne(Long id) {
        LOG.debug("Request to get Disciplina : {}", id);
        return disciplinaRepository.findById(id).map(disciplinaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Disciplina : {}", id);
        disciplinaRepository.deleteById(id);
    }
}
