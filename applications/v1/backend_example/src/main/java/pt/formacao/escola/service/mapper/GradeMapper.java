package pt.formacao.escola.service.mapper;

import org.mapstruct.*;
import pt.formacao.escola.domain.DisciplinaEntity;
import pt.formacao.escola.domain.GradeEntity;
import pt.formacao.escola.domain.StudentEntity;
import pt.formacao.escola.service.dto.DisciplinaDTO;
import pt.formacao.escola.service.dto.GradeDTO;
import pt.formacao.escola.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link GradeEntity} and its DTO {@link GradeDTO}.
 */
@Mapper(componentModel = "spring")
public interface GradeMapper extends EntityMapper<GradeDTO, GradeEntity> {
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "disciplina", source = "disciplina", qualifiedByName = "disciplinaId")
    GradeDTO toDto(GradeEntity s);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(StudentEntity studentEntity);

    @Named("disciplinaId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DisciplinaDTO toDtoDisciplinaId(DisciplinaEntity disciplinaEntity);
}
