package com.weeklyplanning.service.mapper;

import com.weeklyplanning.domain.Person;
import com.weeklyplanning.service.dto.PersonDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Person} and its DTO {@link PersonDTO}.
 */
@Mapper(componentModel = "spring")
public interface PersonMapper extends EntityMapper<PersonDTO, Person> {}
