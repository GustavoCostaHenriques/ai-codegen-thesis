package com.mycompany.weeklyplanning.service.mapper;

import com.mycompany.weeklyplanning.domain.AppUserEntity;
import com.mycompany.weeklyplanning.service.dto.AppUserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppUserEntity} and its DTO {@link AppUserDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppUserMapper extends EntityMapper<AppUserDTO, AppUserEntity> {}
