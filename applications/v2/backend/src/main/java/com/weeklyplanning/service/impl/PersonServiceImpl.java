package com.weeklyplanning.service.impl;

import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.DayPersonRepository;
import com.weeklyplanning.repository.PersonRepository;
import com.weeklyplanning.repository.TaskRepository;
import com.weeklyplanning.service.PersonService;
import com.weeklyplanning.service.dto.PersonDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.service.mapper.PersonMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

/**
 * Service Implementation for managing {@link com.weeklyplanning.domain.Person}.
 */
@Service
@Transactional
public class PersonServiceImpl implements PersonService {

    private static final Logger LOG = LoggerFactory.getLogger(PersonServiceImpl.class);

    private final PersonRepository personRepository;
    private final DayPersonRepository dayPersonRepository;
    private final DayPersonProjectRepository dayPersonProjectRepository;
    private final TaskRepository taskRepository;

    private final PersonMapper personMapper;

    public PersonServiceImpl(
        PersonRepository personRepository,
        DayPersonRepository dayPersonRepository,
        DayPersonProjectRepository dayPersonProjectRepository,
        TaskRepository taskRepository,
        PersonMapper personMapper
    ) {
        this.personRepository = personRepository;
        this.dayPersonRepository = dayPersonRepository;
        this.dayPersonProjectRepository = dayPersonProjectRepository;
        this.taskRepository = taskRepository;
        this.personMapper = personMapper;
    }

    @Override
    public PersonDTO save(PersonDTO personDTO) {
        LOG.debug("Request to save Person : {}", personDTO);
        String normalizedEmail = normalizeEmail(personDTO.getEmail());
        if (personRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new ApiException(HttpStatus.CONFLICT, "Person email already exists");
        }
        personDTO.setEmail(normalizedEmail);
        Person person = personMapper.toEntity(personDTO);
        person = personRepository.save(person);
        return personMapper.toDto(person);
    }

    @Override
    public PersonDTO update(PersonDTO personDTO) {
        LOG.debug("Request to update Person : {}", personDTO);
        if (personDTO.getId() == null || !personRepository.existsById(personDTO.getId())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Person not found");
        }
        String normalizedEmail = normalizeEmail(personDTO.getEmail());
        if (personRepository.existsByEmailIgnoreCaseAndIdNot(normalizedEmail, personDTO.getId())) {
            throw new ApiException(HttpStatus.CONFLICT, "Person email already exists");
        }
        personDTO.setEmail(normalizedEmail);
        Person person = personMapper.toEntity(personDTO);
        person = personRepository.save(person);
        return personMapper.toDto(person);
    }

    @Override
    public Optional<PersonDTO> partialUpdate(PersonDTO personDTO) {
        LOG.debug("Request to partially update Person : {}", personDTO);

        return personRepository
            .findById(personDTO.getId())
            .map(existingPerson -> {
                personMapper.partialUpdate(existingPerson, personDTO);

                return existingPerson;
            })
            .map(personRepository::save)
            .map(personMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PersonDTO> findAll() {
        LOG.debug("Request to get all People");
        return personRepository.findAll().stream().map(personMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PersonDTO> search(PersonStatus status, String q, Pageable pageable) {
        LOG.debug("Request to search People with status {} and q {}", status, q);
        String normalizedQ = normalizeSearchTerm(q);
        return personRepository.search(status, normalizedQ, pageable).map(personMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PersonDTO> findOne(UUID id) {
        LOG.debug("Request to get Person : {}", id);
        return personRepository.findById(id).map(personMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete Person : {}", id);
        List<DayPerson> dayPeople = dayPersonRepository.findAllByPersonId(id);
        List<UUID> dayPersonIds = dayPeople.stream().map(DayPerson::getId).toList();
        if (!dayPersonIds.isEmpty()) {
            List<DayPersonProject> assignments = dayPersonProjectRepository.findAllByDayPersonIdIn(dayPersonIds);
            List<UUID> assignmentIds = assignments.stream().map(DayPersonProject::getId).toList();
            if (!assignmentIds.isEmpty()) {
                taskRepository.deleteAll(taskRepository.findAllByDayPersonProjectIdIn(assignmentIds));
                dayPersonProjectRepository.deleteAll(assignments);
            }
            dayPersonRepository.deleteAll(dayPeople);
        }
        personRepository.deleteById(id);
    }

    private String normalizeEmail(String email) {
        if (!StringUtils.hasText(email)) {
            return email;
        }
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizeSearchTerm(String query) {
        if (!StringUtils.hasText(query)) {
            return null;
        }
        String normalized = query.trim();
        return normalized.isEmpty() ? null : normalized;
    }
}
