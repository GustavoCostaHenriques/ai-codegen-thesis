package com.mycompany.weeklyplanning.service.impl;

import com.mycompany.weeklyplanning.domain.AppUserEntity;
import com.mycompany.weeklyplanning.repository.AppUserRepository;
import com.mycompany.weeklyplanning.service.AppUserService;
import com.mycompany.weeklyplanning.service.dto.AppUserDTO;
import com.mycompany.weeklyplanning.service.mapper.AppUserMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.weeklyplanning.domain.AppUserEntity}.
 */
@Service
@Transactional
public class AppUserServiceImpl implements AppUserService {

    private static final Logger LOG = LoggerFactory.getLogger(AppUserServiceImpl.class);

    private final AppUserRepository appUserRepository;

    private final AppUserMapper appUserMapper;

    public AppUserServiceImpl(AppUserRepository appUserRepository, AppUserMapper appUserMapper) {
        this.appUserRepository = appUserRepository;
        this.appUserMapper = appUserMapper;
    }

    @Override
    public AppUserDTO save(AppUserDTO appUserDTO) {
        LOG.debug("Request to save AppUser : {}", appUserDTO);
        AppUserEntity appUserEntity = appUserMapper.toEntity(appUserDTO);
        appUserEntity = appUserRepository.save(appUserEntity);
        return appUserMapper.toDto(appUserEntity);
    }

    @Override
    public AppUserDTO update(AppUserDTO appUserDTO) {
        LOG.debug("Request to update AppUser : {}", appUserDTO);
        AppUserEntity appUserEntity = appUserMapper.toEntity(appUserDTO);
        appUserEntity = appUserRepository.save(appUserEntity);
        return appUserMapper.toDto(appUserEntity);
    }

    @Override
    public Optional<AppUserDTO> partialUpdate(AppUserDTO appUserDTO) {
        LOG.debug("Request to partially update AppUser : {}", appUserDTO);

        return appUserRepository
            .findById(appUserDTO.getId())
            .map(existingAppUser -> {
                appUserMapper.partialUpdate(existingAppUser, appUserDTO);

                return existingAppUser;
            })
            .map(appUserRepository::save)
            .map(appUserMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppUserDTO> findOne(Long id) {
        LOG.debug("Request to get AppUser : {}", id);
        return appUserRepository.findById(id).map(appUserMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete AppUser : {}", id);
        appUserRepository.deleteById(id);
    }
}
