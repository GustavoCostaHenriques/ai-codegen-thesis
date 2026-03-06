package com.mycompany.weeklyplanning.service.mapper;

import com.mycompany.weeklyplanning.domain.WeekEntity;
import com.mycompany.weeklyplanning.service.dto.WeekDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WeekEntity} and its DTO {@link WeekDTO}.
 */
@Mapper(componentModel = "spring")
public interface WeekMapper extends EntityMapper<WeekDTO, WeekEntity> {}
