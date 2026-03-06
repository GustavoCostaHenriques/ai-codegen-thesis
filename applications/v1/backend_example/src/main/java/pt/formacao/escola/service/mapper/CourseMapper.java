package pt.formacao.escola.service.mapper;

import org.mapstruct.*;
import pt.formacao.escola.domain.CourseEntity;
import pt.formacao.escola.service.dto.CourseDTO;

/**
 * Mapper for the entity {@link CourseEntity} and its DTO {@link CourseDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourseMapper extends EntityMapper<CourseDTO, CourseEntity> {}
