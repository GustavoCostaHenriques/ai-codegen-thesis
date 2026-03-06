package com.mycompany.weeklyplanning.service.impl;

import com.mycompany.weeklyplanning.domain.WeekEntity;
import com.mycompany.weeklyplanning.repository.WeekRepository;
import com.mycompany.weeklyplanning.service.WeekService;
import com.mycompany.weeklyplanning.service.dto.WeekDTO;
import com.mycompany.weeklyplanning.service.mapper.WeekMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.weeklyplanning.domain.WeekEntity}.
 */
@Service
@Transactional
public class WeekServiceImpl implements WeekService {

    private static final Logger LOG = LoggerFactory.getLogger(WeekServiceImpl.class);

    private final WeekRepository weekRepository;

    private final WeekMapper weekMapper;

    public WeekServiceImpl(WeekRepository weekRepository, WeekMapper weekMapper) {
        this.weekRepository = weekRepository;
        this.weekMapper = weekMapper;
    }

    @Override
    public WeekDTO save(WeekDTO weekDTO) {
        LOG.debug("Request to save Week : {}", weekDTO);
        WeekEntity weekEntity = weekMapper.toEntity(weekDTO);
        weekEntity = weekRepository.save(weekEntity);
        return weekMapper.toDto(weekEntity);
    }

    @Override
    public WeekDTO update(WeekDTO weekDTO) {
        LOG.debug("Request to update Week : {}", weekDTO);
        WeekEntity weekEntity = weekMapper.toEntity(weekDTO);
        weekEntity = weekRepository.save(weekEntity);
        return weekMapper.toDto(weekEntity);
    }

    @Override
    public Optional<WeekDTO> partialUpdate(WeekDTO weekDTO) {
        LOG.debug("Request to partially update Week : {}", weekDTO);

        return weekRepository
            .findById(weekDTO.getId())
            .map(existingWeek -> {
                weekMapper.partialUpdate(existingWeek, weekDTO);

                return existingWeek;
            })
            .map(weekRepository::save)
            .map(weekMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WeekDTO> findOne(Long id) {
        LOG.debug("Request to get Week : {}", id);
        return weekRepository.findById(id).map(weekMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Week : {}", id);
        weekRepository.deleteById(id);
    }
}
