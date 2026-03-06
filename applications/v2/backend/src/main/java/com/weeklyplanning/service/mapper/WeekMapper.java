package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.Week;
import com.weeklyplanning.service.dto.WeekDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Week} and its DTO {@link WeekDTO}.
 */
@Mapper(componentModel = "spring")
public interface WeekMapper extends EntityMapper<WeekDTO, Week> {}
