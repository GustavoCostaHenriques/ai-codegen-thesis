package pt.formacao.escola.service.mapper;

import org.mapstruct.*;
import pt.formacao.escola.domain.CourseEntity;
import pt.formacao.escola.domain.StudentAddressEntity;
import pt.formacao.escola.domain.StudentEntity;
import pt.formacao.escola.domain.projection.StudentInfoProjection;
import pt.formacao.escola.service.api.dto.CreateStudentRest;
import pt.formacao.escola.service.api.dto.StudentInfoRest;
import pt.formacao.escola.service.dto.CourseDTO;
import pt.formacao.escola.service.dto.StudentAddressDTO;
import pt.formacao.escola.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link StudentEntity} and its DTO {@link StudentDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudentMapper extends EntityMapper<StudentDTO, StudentEntity> {
    StudentDTO toDto(StudentEntity s);

    StudentAddressDTO toDtoStudentAddressId(StudentAddressEntity studentAddressEntity);

    StudentInfoRest toStudentInfoRestFromStudentDTO(StudentDTO studentDTO);

    @Mapping(target = "studentAddress", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "genre", ignore = true)
    StudentDTO toDtoFromCreate(CreateStudentRest createStudentRest);

    StudentInfoRest toStudentInfoRestFromStudenProjection(StudentInfoProjection studentInfoProjection);
}
