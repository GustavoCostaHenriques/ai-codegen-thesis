package pt.formacao.escola.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.formacao.escola.domain.StudentAddressEntity;
import pt.formacao.escola.repository.StudentAddressRepository;
import pt.formacao.escola.service.StudentAddressService;
import pt.formacao.escola.service.dto.StudentAddressDTO;
import pt.formacao.escola.service.mapper.StudentAddressMapper;

/**
 * Service Implementation for managing {@link pt.formacao.escola.domain.StudentAddressEntity}.
 */
@Service
@Transactional
public class StudentAddressServiceImpl implements StudentAddressService {

    private static final Logger LOG = LoggerFactory.getLogger(StudentAddressServiceImpl.class);

    private final StudentAddressRepository studentAddressRepository;

    private final StudentAddressMapper studentAddressMapper;

    public StudentAddressServiceImpl(StudentAddressRepository studentAddressRepository, StudentAddressMapper studentAddressMapper) {
        this.studentAddressRepository = studentAddressRepository;
        this.studentAddressMapper = studentAddressMapper;
    }

    @Override
    public StudentAddressDTO save(StudentAddressDTO studentAddressDTO) {
        LOG.debug("Request to save StudentAddress : {}", studentAddressDTO);
        StudentAddressEntity studentAddressEntity = studentAddressMapper.toEntity(studentAddressDTO);
        studentAddressEntity = studentAddressRepository.save(studentAddressEntity);
        return studentAddressMapper.toDto(studentAddressEntity);
    }

    @Override
    public StudentAddressDTO update(StudentAddressDTO studentAddressDTO) {
        LOG.debug("Request to update StudentAddress : {}", studentAddressDTO);
        StudentAddressEntity studentAddressEntity = studentAddressMapper.toEntity(studentAddressDTO);
        studentAddressEntity = studentAddressRepository.save(studentAddressEntity);
        return studentAddressMapper.toDto(studentAddressEntity);
    }

    @Override
    public Optional<StudentAddressDTO> partialUpdate(StudentAddressDTO studentAddressDTO) {
        LOG.debug("Request to partially update StudentAddress : {}", studentAddressDTO);

        return studentAddressRepository
            .findById(studentAddressDTO.getId())
            .map(existingStudentAddress -> {
                studentAddressMapper.partialUpdate(existingStudentAddress, studentAddressDTO);

                return existingStudentAddress;
            })
            .map(studentAddressRepository::save)
            .map(studentAddressMapper::toDto);
    }

    /**
     *  Get all the studentAddresses where Student is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<StudentAddressDTO> findAllWhereStudentIsNull() {
        LOG.debug("Request to get all studentAddresses where Student is null");
        return StreamSupport.stream(studentAddressRepository.findAll().spliterator(), false)
            .filter(studentAddress -> studentAddress.getStudent() == null)
            .map(studentAddressMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StudentAddressDTO> findOne(Long id) {
        LOG.debug("Request to get StudentAddress : {}", id);
        return studentAddressRepository.findById(id).map(studentAddressMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete StudentAddress : {}", id);
        studentAddressRepository.deleteById(id);
    }
}
