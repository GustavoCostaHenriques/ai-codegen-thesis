package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.enumeration.AccountRole;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import com.example.weeklyplanning.repository.AccountRepository;
import com.example.weeklyplanning.repository.DayPersonRepository;
import com.example.weeklyplanning.repository.PersonRepository;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.mapper.PageMapper;
import com.example.weeklyplanning.service.mapper.PersonMapper;
import com.example.weeklyplanning.service.security.PasswordPolicyService;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import com.example.weeklyplanning.web.rest.errors.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final AccountRepository accountRepository;
    private final DayPersonRepository dayPersonRepository;
    private final PersonMapper personMapper;
    private final PageMapper pageMapper;
    private final PaginationSupport paginationSupport;
    private final PasswordEncoder passwordEncoder;
    private final PasswordPolicyService passwordPolicyService;
    private final UsernameService usernameService;
    private final AuditService auditService;

    public PersonService(
        PersonRepository personRepository,
        AccountRepository accountRepository,
        DayPersonRepository dayPersonRepository,
        PersonMapper personMapper,
        PageMapper pageMapper,
        PaginationSupport paginationSupport,
        PasswordEncoder passwordEncoder,
        PasswordPolicyService passwordPolicyService,
        UsernameService usernameService,
        AuditService auditService
    ) {
        this.personRepository = personRepository;
        this.accountRepository = accountRepository;
        this.dayPersonRepository = dayPersonRepository;
        this.personMapper = personMapper;
        this.pageMapper = pageMapper;
        this.paginationSupport = paginationSupport;
        this.passwordEncoder = passwordEncoder;
        this.passwordPolicyService = passwordPolicyService;
        this.usernameService = usernameService;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public ApiSchemas.PersonPage listPersons(
        Integer page,
        Integer size,
        String sort,
        String search,
        AccountRole role,
        PersonStatus status
    ) {
        Pageable pageable = paginationSupport.pageable(page, size, sort, Sort.by(Sort.Order.asc("name")));
        Specification<PersonEntity> specification = buildSpecification(search, role, status);

        Page<PersonEntity> result = personRepository.findAll(specification, pageable);
        return new ApiSchemas.PersonPage(
            result.getContent().stream().map(personMapper::toSummary).toList(),
            pageMapper.toMetadata(result)
        );
    }

    @Transactional(readOnly = true)
    public ApiSchemas.PersonDetail getPersonById(UUID personId) {
        PersonEntity person = personRepository.findByPersonId(personId)
            .orElseThrow(() -> new NotFoundException("Person not found"));
        return personMapper.toDetail(person);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ApiSchemas.PersonDetail createPerson(ApiSchemas.CreatePersonRequest request, String actor) {
        passwordPolicyService.validate(request.password());

        String email = normalizeEmail(request.email());
        if (accountRepository.existsByEmailIgnoreCase(email)) {
            throw new ConflictException("Email already in use");
        }

        String username;
        if (request.username() != null && !request.username().isBlank()) {
            username = usernameService.normalize(request.username());
            if (usernameService.isTaken(username, null)) {
                throw new ConflictException("Username already in use");
            }
        } else {
            username = usernameService.resolveUnique(null, email, null);
        }

        PersonEntity person = new PersonEntity();
        person.setPersonId(UUID.randomUUID());
        person.setName(request.name());
        person.setStatus(request.status());

        AccountEntity account = new AccountEntity();
        account.setAccountId(UUID.randomUUID());
        account.setUsername(username);
        account.setEmail(email);
        account.setPasswordHash(passwordEncoder.encode(request.password()));
        account.setRole(request.role());
        account.setPerson(person);

        person.setAccount(account);

        PersonEntity saved = personRepository.save(person);
        auditService.entityEvent("PERSON", "CREATE", saved.getPersonId(), actor);
        return personMapper.toDetail(saved);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public ApiSchemas.PersonDetail updatePersonById(UUID personId, ApiSchemas.UpdatePersonRequest request, String actor) {
        PersonEntity person = personRepository.findByPersonId(personId)
            .orElseThrow(() -> new NotFoundException("Person not found"));

        String normalizedEmail = normalizeEmail(request.email());
        if (!person.getAccount().getEmail().equalsIgnoreCase(normalizedEmail)
            && accountRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new ConflictException("Email already in use");
        }

        String username = person.getAccount().getUsername();
        if (request.username() != null && !request.username().isBlank()) {
            String requested = usernameService.normalize(request.username());
            if (usernameService.isTaken(requested, person.getAccount().getAccountId())) {
                throw new ConflictException("Username already in use");
            }
            username = requested;
        }

        person.setName(request.name());
        person.setStatus(request.status());
        person.getAccount().setEmail(normalizedEmail);
        person.getAccount().setRole(request.role());
        person.getAccount().setUsername(username);

        PersonEntity saved = personRepository.save(person);
        auditService.entityEvent("PERSON", "UPDATE", saved.getPersonId(), actor);
        return personMapper.toDetail(saved);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePersonById(UUID personId, String actor) {
        PersonEntity person = personRepository.findByPersonId(personId)
            .orElseThrow(() -> new NotFoundException("Person not found"));

        if (dayPersonRepository.existsByPerson_PersonId(personId)) {
            throw new ConflictException("Person cannot be deleted because planning assignments exist");
        }

        personRepository.delete(person);
        auditService.entityEvent("PERSON", "DELETE", personId, actor);
    }

    private Specification<PersonEntity> buildSpecification(String search, AccountRole role, PersonStatus status) {
        Specification<PersonEntity> specification = Specification.where(null);

        if (search != null && !search.isBlank()) {
            String pattern = "%" + search.toLowerCase() + "%";
            specification = specification.and((root, query, cb) -> {
                var accountJoin = root.join("account");
                return cb.or(
                    cb.like(cb.lower(root.get("name")), pattern),
                    cb.like(cb.lower(accountJoin.get("email")), pattern),
                    cb.like(cb.lower(accountJoin.get("username")), pattern)
                );
            });
        }

        if (role != null) {
            specification = specification.and((root, query, cb) -> cb.equal(root.join("account").get("role"), role));
        }

        if (status != null) {
            specification = specification.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        return specification;
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }
}
