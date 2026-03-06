package com.mycompany.weeklyplanning.service.mapper;

import com.mycompany.weeklyplanning.domain.AppUserEntity;
import com.mycompany.weeklyplanning.domain.DayPlanEntity;
import com.mycompany.weeklyplanning.domain.DayUserEntity;
import com.mycompany.weeklyplanning.service.dto.AppUserDTO;
import com.mycompany.weeklyplanning.service.dto.DayPlanDTO;
import com.mycompany.weeklyplanning.service.dto.DayUserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DayUserEntity} and its DTO {@link DayUserDTO}.
 */
@Mapper(componentModel = "spring")
public interface DayUserMapper extends EntityMapper<DayUserDTO, DayUserEntity> {
    @Mapping(target = "user", source = "user", qualifiedByName = "appUserId")
    @Mapping(target = "dayPlan", source = "dayPlan", qualifiedByName = "dayPlanId")
    DayUserDTO toDto(DayUserEntity s);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(AppUserEntity appUserEntity);

    @Named("dayPlanId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DayPlanDTO toDtoDayPlanId(DayPlanEntity dayPlanEntity);
}
