package com.mycompany.weeklyplanning.service.mapper;

import com.mycompany.weeklyplanning.domain.DayPlanEntity;
import com.mycompany.weeklyplanning.domain.WeekEntity;
import com.mycompany.weeklyplanning.service.dto.DayPlanDTO;
import com.mycompany.weeklyplanning.service.dto.WeekDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DayPlanEntity} and its DTO {@link DayPlanDTO}.
 */
@Mapper(componentModel = "spring")
public interface DayPlanMapper extends EntityMapper<DayPlanDTO, DayPlanEntity> {
    @Mapping(target = "week", source = "week", qualifiedByName = "weekId")
    DayPlanDTO toDto(DayPlanEntity s);

    @Named("weekId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WeekDTO toDtoWeekId(WeekEntity weekEntity);
}
