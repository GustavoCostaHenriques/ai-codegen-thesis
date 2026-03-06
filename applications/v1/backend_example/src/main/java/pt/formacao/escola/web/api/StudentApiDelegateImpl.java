package pt.formacao.escola.web.api;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pt.formacao.escola.service.StudentService;
import pt.formacao.escola.service.api.dto.CreateStudentRest;
import pt.formacao.escola.service.api.dto.StudentInfoRest;
import pt.formacao.escola.service.api.dto.UpdateStudent;
import pt.formacao.escola.service.dto.StudentDTO;

@Service
public class StudentApiDelegateImpl implements StudentApiDelegate {

    private final StudentService studentService;

    public StudentApiDelegateImpl(StudentService studentService) {
        this.studentService = studentService;
    }

    @Override
    public ResponseEntity<Long> getStudentByName(String name) {
        Long id = studentService.getByName(name);
        return ResponseEntity.ok().body(id);
    }

    @Override
    public ResponseEntity<StudentInfoRest> getStudentInfoById(Long id) {
        StudentInfoRest studentInfoRest = studentService.getStudentInfoById(id);

        if (studentInfoRest != null) {
            return ResponseEntity.ok().body(studentInfoRest);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    //@Override
    //public ResponseEntity<StudentDTO> createStudent(CreateStudentRest createStudentRest) {
    //  StudentDTO studentDTO = studentService.createStudent(createStudentRest);

    //if (studentDTO != null) {
    //  return ResponseEntity.ok().body(studentDTO);
    //} else {
    //  return ResponseEntity.badRequest().build();
    //}
    //}

    @Override
    public ResponseEntity<pt.formacao.escola.service.dto.StudentDTO> updateStudent(Long id, UpdateStudent updateStudent) {
        StudentDTO studentDTO = studentService.updateStudent(id, updateStudent.getRequest());

        if (studentDTO != null) {
            return ResponseEntity.ok().body(studentDTO);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<List<StudentDTO>> listStudents(Integer age, Pageable pageable) {
        return ResponseEntity.ok().body(studentService.listStudents(age, pageable));
    }

    @Override
    public ResponseEntity<StudentInfoRest> getStudentInfoByIdProjection(Long id) {
        StudentInfoRest studentInfoRest = studentService.getStudentInfoByIdProjection(id);

        if (studentInfoRest != null) {
            return ResponseEntity.ok().body(studentInfoRest);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
