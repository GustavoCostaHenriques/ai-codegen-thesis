package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.service.dto.DayPlanDTO;
import com.weeklyplanning.service.dto.WeekDTO;
import java.util.Objects;
import java.util.UUID;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DayPlan} and its DTO {@link DayPlanDTO}.
 */
@Mapper(componentModel = "spring")
public interface DayPlanMapper extends EntityMapper<DayPlanDTO, DayPlan> {
    @Mapping(target = "week", source = "week", qualifiedByName = "weekId")
    DayPlanDTO toDto(DayPlan s);

    @Named("weekId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WeekDTO toDtoWeekId(Week week);

    default String map(UUID value) {
        return Objects.toString(value, null);
    }
}
