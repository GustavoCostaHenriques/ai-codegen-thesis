package com.mycompany.weeklyplanning.service.impl;

import com.mycompany.weeklyplanning.domain.DayPlanEntity;
import com.mycompany.weeklyplanning.repository.DayPlanRepository;
import com.mycompany.weeklyplanning.service.DayPlanService;
import com.mycompany.weeklyplanning.service.dto.DayPlanDTO;
import com.mycompany.weeklyplanning.service.mapper.DayPlanMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.weeklyplanning.domain.DayPlanEntity}.
 */
@Service
@Transactional
public class DayPlanServiceImpl implements DayPlanService {

    private static final Logger LOG = LoggerFactory.getLogger(DayPlanServiceImpl.class);

    private final DayPlanRepository dayPlanRepository;

    private final DayPlanMapper dayPlanMapper;

    public DayPlanServiceImpl(DayPlanRepository dayPlanRepository, DayPlanMapper dayPlanMapper) {
        this.dayPlanRepository = dayPlanRepository;
        this.dayPlanMapper = dayPlanMapper;
    }

    @Override
    public DayPlanDTO save(DayPlanDTO dayPlanDTO) {
        LOG.debug("Request to save DayPlan : {}", dayPlanDTO);
        DayPlanEntity dayPlanEntity = dayPlanMapper.toEntity(dayPlanDTO);
        dayPlanEntity = dayPlanRepository.save(dayPlanEntity);
        return dayPlanMapper.toDto(dayPlanEntity);
    }

    @Override
    public DayPlanDTO update(DayPlanDTO dayPlanDTO) {
        LOG.debug("Request to update DayPlan : {}", dayPlanDTO);
        DayPlanEntity dayPlanEntity = dayPlanMapper.toEntity(dayPlanDTO);
        dayPlanEntity = dayPlanRepository.save(dayPlanEntity);
        return dayPlanMapper.toDto(dayPlanEntity);
    }

    @Override
    public Optional<DayPlanDTO> partialUpdate(DayPlanDTO dayPlanDTO) {
        LOG.debug("Request to partially update DayPlan : {}", dayPlanDTO);

        return dayPlanRepository
            .findById(dayPlanDTO.getId())
            .map(existingDayPlan -> {
                dayPlanMapper.partialUpdate(existingDayPlan, dayPlanDTO);

                return existingDayPlan;
            })
            .map(dayPlanRepository::save)
            .map(dayPlanMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DayPlanDTO> findOne(Long id) {
        LOG.debug("Request to get DayPlan : {}", id);
        return dayPlanRepository.findById(id).map(dayPlanMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete DayPlan : {}", id);
        dayPlanRepository.deleteById(id);
    }
}
