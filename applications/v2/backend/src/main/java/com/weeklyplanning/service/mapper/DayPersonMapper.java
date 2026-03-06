package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPlan;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.service.dto.DayPersonDTO;
import com.weeklyplanning.service.dto.DayPlanDTO;
import com.weeklyplanning.service.dto.PersonDTO;
import java.util.Objects;
import java.util.UUID;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DayPerson} and its DTO {@link DayPersonDTO}.
 */
@Mapper(componentModel = "spring")
public interface DayPersonMapper extends EntityMapper<DayPersonDTO, DayPerson> {
    @Mapping(target = "person", source = "person", qualifiedByName = "personId")
    @Mapping(target = "dayPlan", source = "dayPlan", qualifiedByName = "dayPlanId")
    DayPersonDTO toDto(DayPerson s);

    @Named("personId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PersonDTO toDtoPersonId(Person person);

    @Named("dayPlanId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DayPlanDTO toDtoDayPlanId(DayPlan dayPlan);

    default String map(UUID value) {
        return Objects.toString(value, null);
    }
}
