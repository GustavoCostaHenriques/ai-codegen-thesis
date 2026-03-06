package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PersonStatus;
import com.example.weeklyplanning.repository.AccountRepository;
import com.example.weeklyplanning.repository.PersonRepository;
import com.example.weeklyplanning.repository.PlanningAssignmentRepository;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.dto.PagedPeople;
import com.example.weeklyplanning.service.dto.Person;
import com.example.weeklyplanning.service.dto.PersonCreateRequest;
import com.example.weeklyplanning.service.dto.PersonSummary;
import com.example.weeklyplanning.service.dto.PersonUpdateRequest;
import com.example.weeklyplanning.service.mapper.ApiMapper;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class PersonService {

    private static final Set<String> PERSON_SORT_FIELDS = Set.of("name", "createdAt", "updatedAt", "status", "account.email", "account.role");

    private final PersonRepository personRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordPolicyService passwordPolicyService;
    private final PaginationService paginationService;
    private final ApiMapper apiMapper;
    private final AuditService auditService;
    private final PlanningAssignmentRepository planningAssignmentRepository;

    public PersonService(PersonRepository personRepository,
                         AccountRepository accountRepository,
                         PasswordEncoder passwordEncoder,
                         PasswordPolicyService passwordPolicyService,
                         PaginationService paginationService,
                         ApiMapper apiMapper,
                         AuditService auditService,
                         PlanningAssignmentRepository planningAssignmentRepository) {
        this.personRepository = personRepository;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordPolicyService = passwordPolicyService;
        this.paginationService = paginationService;
        this.apiMapper = apiMapper;
        this.auditService = auditService;
        this.planningAssignmentRepository = planningAssignmentRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public PagedPeople listPeople(Integer page,
                                  Integer size,
                                  String sort,
                                  PersonStatus status,
                                  AccountRole role,
                                  String search) {
        Pageable pageable = paginationService.toPageable(page, size, sort, PERSON_SORT_FIELDS);
        Specification<PersonEntity> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }
        if (role != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.join("account").get("role"), role));
        }
        if (search != null && !search.isBlank()) {
            String like = "%" + search.trim().toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), like),
                cb.like(cb.lower(root.join("account").get("email")), like),
                cb.like(cb.lower(root.join("account").get("username")), like)
            ));
        }

        Page<PersonEntity> entityPage = personRepository.findAll(spec, pageable);
        List<PersonSummary> content = entityPage.getContent().stream().map(apiMapper::toPersonSummary).toList();

        return new PagedPeople(content, apiMapper.toPageMetadata(entityPage));
    }

    private List<String> mapSort(List<String> sort) {
        if (sort == null) {
            return null;
        }
        return sort.stream().map(item -> {
            if (item == null) {
                return null;
            }
            if (item.startsWith("email,")) {
                return item.replaceFirst("email,", "account.email,");
            }
            if (item.startsWith("role,")) {
                return item.replaceFirst("role,", "account.role,");
            }
            return item;
        }).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Person createPerson(PersonCreateRequest request, AuthenticatedPrincipal actor) {
        if (accountRepository.existsByUsernameIgnoreCase(request.username())) {
            throw new ConflictException("Username already exists.");
        }
        if (accountRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ConflictException("Email already exists.");
        }

        passwordPolicyService.validate(request.password());

        AccountEntity account = new AccountEntity();
        account.setUsername(request.username().trim());
        account.setEmail(request.email().trim().toLowerCase());
        account.setRole(request.role());
        account.setPasswordHash(passwordEncoder.encode(request.password()));
        account.setEnabled(request.status() == PersonStatus.ACTIVE);
        accountRepository.save(account);

        PersonEntity person = new PersonEntity();
        person.setName(request.name().trim());
        person.setStatus(request.status());
        person.setAccount(account);
        personRepository.save(person);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "CREATE_PERSON", "PERSON", person.getId(), "Person and account created", true);
        return apiMapper.toPerson(person);
    }

    @PreAuthorize("hasAnyRole('ADMIN','VIEWER')")
    @Transactional(readOnly = true)
    public Person getPersonById(UUID personId) {
        PersonEntity person = personRepository.findById(personId)
            .orElseThrow(() -> new NotFoundException("Person not found."));
        return apiMapper.toPerson(person);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Person updatePerson(UUID personId, PersonUpdateRequest request, AuthenticatedPrincipal actor) {
        PersonEntity person = personRepository.findById(personId)
            .orElseThrow(() -> new NotFoundException("Person not found."));

        AccountEntity account = person.getAccount();
        String normalizedEmail = request.email().trim().toLowerCase();
        String normalizedUsername = request.username().trim();

        if (!account.getUsername().equalsIgnoreCase(normalizedUsername)
            && accountRepository.existsByUsernameIgnoreCase(normalizedUsername)) {
            throw new ConflictException("Username already exists.");
        }
        if (!account.getEmail().equalsIgnoreCase(normalizedEmail)
            && accountRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new ConflictException("Email already exists.");
        }

        if (request.password() != null && !request.password().isBlank()) {
            passwordPolicyService.validate(request.password());
            account.setPasswordHash(passwordEncoder.encode(request.password()));
        }

        account.setUsername(normalizedUsername);
        account.setEmail(normalizedEmail);
        account.setRole(request.role());
        account.setEnabled(request.status() == PersonStatus.ACTIVE);

        person.setName(request.name().trim());
        person.setStatus(request.status());

        accountRepository.save(account);
        personRepository.save(person);

        auditService.audit(actor.getAccountId(), actor.getUsername(), "UPDATE_PERSON", "PERSON", person.getId(), "Person/account updated", true);
        return apiMapper.toPerson(person);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deletePerson(UUID personId, AuthenticatedPrincipal actor) {
        PersonEntity person = personRepository.findById(personId)
            .orElseThrow(() -> new NotFoundException("Person not found."));

        planningAssignmentRepository.deleteAllByPersonId(personId);
        AccountEntity account = person.getAccount();
        person.getAccount().setEnabled(false);
        personRepository.delete(person);
        accountRepository.delete(account);
        auditService.audit(actor.getAccountId(), actor.getUsername(), "DELETE_PERSON", "PERSON", person.getId(), "Person deactivated", true);
    }
}
