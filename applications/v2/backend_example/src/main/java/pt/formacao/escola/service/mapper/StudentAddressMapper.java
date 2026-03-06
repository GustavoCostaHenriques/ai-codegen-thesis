package pt.formacao.escola.service.mapper;

import org.mapstruct.*;
import pt.formacao.escola.domain.StudentAddressEntity;
import pt.formacao.escola.service.dto.StudentAddressDTO;

/**
 * Mapper for the entity {@link StudentAddressEntity} and its DTO {@link StudentAddressDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudentAddressMapper extends EntityMapper<StudentAddressDTO, StudentAddressEntity> {}
