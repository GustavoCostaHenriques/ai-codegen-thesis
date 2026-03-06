package com.mycompany.weeklyplanning.service.impl;

import com.mycompany.weeklyplanning.domain.DayUserEntity;
import com.mycompany.weeklyplanning.repository.DayUserRepository;
import com.mycompany.weeklyplanning.service.DayUserService;
import com.mycompany.weeklyplanning.service.dto.DayUserDTO;
import com.mycompany.weeklyplanning.service.mapper.DayUserMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.weeklyplanning.domain.DayUserEntity}.
 */
@Service
@Transactional
public class DayUserServiceImpl implements DayUserService {

    private static final Logger LOG = LoggerFactory.getLogger(DayUserServiceImpl.class);

    private final DayUserRepository dayUserRepository;

    private final DayUserMapper dayUserMapper;

    public DayUserServiceImpl(DayUserRepository dayUserRepository, DayUserMapper dayUserMapper) {
        this.dayUserRepository = dayUserRepository;
        this.dayUserMapper = dayUserMapper;
    }

    @Override
    public DayUserDTO save(DayUserDTO dayUserDTO) {
        LOG.debug("Request to save DayUser : {}", dayUserDTO);
        DayUserEntity dayUserEntity = dayUserMapper.toEntity(dayUserDTO);
        dayUserEntity = dayUserRepository.save(dayUserEntity);
        return dayUserMapper.toDto(dayUserEntity);
    }

    @Override
    public DayUserDTO update(DayUserDTO dayUserDTO) {
        LOG.debug("Request to update DayUser : {}", dayUserDTO);
        DayUserEntity dayUserEntity = dayUserMapper.toEntity(dayUserDTO);
        dayUserEntity = dayUserRepository.save(dayUserEntity);
        return dayUserMapper.toDto(dayUserEntity);
    }

    @Override
    public Optional<DayUserDTO> partialUpdate(DayUserDTO dayUserDTO) {
        LOG.debug("Request to partially update DayUser : {}", dayUserDTO);

        return dayUserRepository
            .findById(dayUserDTO.getId())
            .map(existingDayUser -> {
                dayUserMapper.partialUpdate(existingDayUser, dayUserDTO);

                return existingDayUser;
            })
            .map(dayUserRepository::save)
            .map(dayUserMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DayUserDTO> findOne(Long id) {
        LOG.debug("Request to get DayUser : {}", id);
        return dayUserRepository.findById(id).map(dayUserMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete DayUser : {}", id);
        dayUserRepository.deleteById(id);
    }
}
