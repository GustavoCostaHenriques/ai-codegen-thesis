package com.mycompany.weeklyplanning.service.impl;

import com.mycompany.weeklyplanning.domain.DayUserProjectEntity;
import com.mycompany.weeklyplanning.repository.DayUserProjectRepository;
import com.mycompany.weeklyplanning.service.DayUserProjectService;
import com.mycompany.weeklyplanning.service.dto.DayUserProjectDTO;
import com.mycompany.weeklyplanning.service.mapper.DayUserProjectMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.weeklyplanning.domain.DayUserProjectEntity}.
 */
@Service
@Transactional
public class DayUserProjectServiceImpl implements DayUserProjectService {

    private static final Logger LOG = LoggerFactory.getLogger(DayUserProjectServiceImpl.class);

    private final DayUserProjectRepository dayUserProjectRepository;

    private final DayUserProjectMapper dayUserProjectMapper;

    public DayUserProjectServiceImpl(DayUserProjectRepository dayUserProjectRepository, DayUserProjectMapper dayUserProjectMapper) {
        this.dayUserProjectRepository = dayUserProjectRepository;
        this.dayUserProjectMapper = dayUserProjectMapper;
    }

    @Override
    public DayUserProjectDTO save(DayUserProjectDTO dayUserProjectDTO) {
        LOG.debug("Request to save DayUserProject : {}", dayUserProjectDTO);
        DayUserProjectEntity dayUserProjectEntity = dayUserProjectMapper.toEntity(dayUserProjectDTO);
        dayUserProjectEntity = dayUserProjectRepository.save(dayUserProjectEntity);
        return dayUserProjectMapper.toDto(dayUserProjectEntity);
    }

    @Override
    public DayUserProjectDTO update(DayUserProjectDTO dayUserProjectDTO) {
        LOG.debug("Request to update DayUserProject : {}", dayUserProjectDTO);
        DayUserProjectEntity dayUserProjectEntity = dayUserProjectMapper.toEntity(dayUserProjectDTO);
        dayUserProjectEntity = dayUserProjectRepository.save(dayUserProjectEntity);
        return dayUserProjectMapper.toDto(dayUserProjectEntity);
    }

    @Override
    public Optional<DayUserProjectDTO> partialUpdate(DayUserProjectDTO dayUserProjectDTO) {
        LOG.debug("Request to partially update DayUserProject : {}", dayUserProjectDTO);

        return dayUserProjectRepository
            .findById(dayUserProjectDTO.getId())
            .map(existingDayUserProject -> {
                dayUserProjectMapper.partialUpdate(existingDayUserProject, dayUserProjectDTO);

                return existingDayUserProject;
            })
            .map(dayUserProjectRepository::save)
            .map(dayUserProjectMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DayUserProjectDTO> findOne(Long id) {
        LOG.debug("Request to get DayUserProject : {}", id);
        return dayUserProjectRepository.findById(id).map(dayUserProjectMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete DayUserProject : {}", id);
        dayUserProjectRepository.deleteById(id);
    }
}
