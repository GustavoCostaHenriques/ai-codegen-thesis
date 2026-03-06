package pt.formacao.escola.service.impl;

import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.formacao.escola.domain.StudentEntity;
import pt.formacao.escola.domain.projection.StudentInfoProjection;
import pt.formacao.escola.repository.StudentRepository;
import pt.formacao.escola.service.StudentQueryService;
import pt.formacao.escola.service.StudentService;
import pt.formacao.escola.service.api.dto.CreateStudentRest;
import pt.formacao.escola.service.api.dto.StudentInfoRest;
import pt.formacao.escola.service.criteria.StudentCriteria;
import pt.formacao.escola.service.dto.StudentDTO;
import pt.formacao.escola.service.mapper.StudentMapper;
import tech.jhipster.service.filter.IntegerFilter;

/**
 * Service Implementation for managing {@link pt.formacao.escola.domain.StudentEntity}.
 */
@Service
@Transactional
@Slf4j
public class StudentServiceImpl implements StudentService {

    private static final Logger LOG = LoggerFactory.getLogger(StudentServiceImpl.class);

    private final StudentRepository studentRepository;

    private final StudentMapper studentMapper;

    private final StudentQueryService studentQueryService;

    public StudentServiceImpl(StudentRepository studentRepository, StudentMapper studentMapper, StudentQueryService studentQueryService) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
        this.studentQueryService = studentQueryService;
    }

    @Override
    public StudentDTO save(StudentDTO studentDTO) {
        LOG.debug("Request to save Student : {}", studentDTO);
        StudentEntity studentEntity = studentMapper.toEntity(studentDTO);
        studentEntity = studentRepository.save(studentEntity);
        return studentMapper.toDto(studentEntity);
    }

    @Override
    public StudentDTO update(StudentDTO studentDTO) {
        LOG.debug("Request to update Student : {}", studentDTO);
        StudentEntity studentEntity = studentMapper.toEntity(studentDTO);
        studentEntity = studentRepository.save(studentEntity);
        return studentMapper.toDto(studentEntity);
    }

    @Override
    public Optional<StudentDTO> partialUpdate(StudentDTO studentDTO) {
        LOG.debug("Request to partially update Student : {}", studentDTO);

        return studentRepository
            .findById(studentDTO.getId())
            .map(existingStudent -> {
                studentMapper.partialUpdate(existingStudent, studentDTO);

                return existingStudent;
            })
            .map(studentRepository::save)
            .map(studentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StudentDTO> findOne(Long id) {
        LOG.debug("Request to get Student : {}", id);
        return studentRepository.findById(id).map(studentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Student : {}", id);
        studentRepository.deleteById(id);
    }

    @Override
    public Long getByName(String name) {
        StudentEntity student = studentRepository.findByName(name);
        return student.getId();
    }

    @Override
    public StudentInfoRest getStudentInfoById(Long id) {
        Optional<StudentDTO> studentOptionalDTO = findOne(id);

        if (studentOptionalDTO.isPresent()) {
            return studentMapper.toStudentInfoRestFromStudentDTO(studentOptionalDTO.orElseThrow());
        } else {
            LOG.info("No student found for id : {}", id);
            return null;
        }
    }

    @Override
    public StudentDTO createStudent(CreateStudentRest createStudentRest) {
        if (createStudentRest.getAge() != null && createStudentRest.getAge() < 18) {
            LOG.error("STUDENT DOES NOT HAVE THE REQUIRED AGE");
            return null;
        }

        return save(studentMapper.toDtoFromCreate(createStudentRest));
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO request) {
        Optional<StudentDTO> oldStudent = findOne(id);

        if (!oldStudent.isPresent()) {
            LOG.error("Student with id {} does not exist!", id);
            return null;
        }

        if (request.getAge() != null && request.getAge() < 18) {
            LOG.error("STUDENT DOES NOT HAVE THE REQUIRED AGE");
            return null;
        }

        if (request.getName() == null) {
            LOG.error("STUDENT DOES NOT HAVE THE NAME");
            return null;
        }

        return update(request);
    }

    @Override
    public List<StudentDTO> findAll() {
        return studentMapper.toDto(studentRepository.findAll());
    }

    @Override
    public List<StudentDTO> listStudents(Integer age, Pageable pageable) {
        StudentCriteria criteria = new StudentCriteria();

        if (age != null) {
            IntegerFilter ageFilter = new IntegerFilter();
            ageFilter.setGreaterThan(age);

            criteria.setAge(ageFilter);
        }

        return studentQueryService.findByCriteria(criteria, pageable).toList();
    }

    @Override
    public StudentInfoRest getStudentInfoByIdProjection(Long id) {
        Optional<StudentInfoProjection> studentProjection = studentRepository.findByIdProjection(id);

        if (studentProjection.isPresent()) {
            return studentMapper.toStudentInfoRestFromStudenProjection(studentProjection.orElseThrow());
        } else {
            LOG.info("No student found for id : {}", id);
            return null;
        }
    }
}
