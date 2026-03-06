package pt.formacao.escola.service.mapper;

import org.mapstruct.*;
import pt.formacao.escola.domain.CourseEntity;
import pt.formacao.escola.domain.DisciplinaEntity;
import pt.formacao.escola.service.dto.CourseDTO;
import pt.formacao.escola.service.dto.DisciplinaDTO;

/**
 * Mapper for the entity {@link DisciplinaEntity} and its DTO {@link DisciplinaDTO}.
 */
@Mapper(componentModel = "spring")
public interface DisciplinaMapper extends EntityMapper<DisciplinaDTO, DisciplinaEntity> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    DisciplinaDTO toDto(DisciplinaEntity s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(CourseEntity courseEntity);
}
