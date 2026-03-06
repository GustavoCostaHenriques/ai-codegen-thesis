package com.weeklyplanning.service;

import com.weeklyplanning.domain.Account;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.repository.AccountRepository;
import com.weeklyplanning.repository.DayPersonRepository;
import com.weeklyplanning.repository.PersonRepository;
import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.ConflictException;
import com.weeklyplanning.service.exception.NotFoundException;
import com.weeklyplanning.service.mapper.PageMapper;
import com.weeklyplanning.service.mapper.PersonMapper;

import jakarta.persistence.criteria.JoinType;
import jakarta.transaction.Transactional;
import java.util.Locale;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PersonService {

    private final PersonRepository personRepository;
    private final AccountRepository accountRepository;
    private final DayPersonRepository dayPersonRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsernameResolver usernameResolver;

    public PersonService(PersonRepository personRepository,
                         AccountRepository accountRepository,
                         DayPersonRepository dayPersonRepository,
                         PasswordEncoder passwordEncoder,
                         UsernameResolver usernameResolver) {
        this.personRepository = personRepository;
        this.accountRepository = accountRepository;
        this.dayPersonRepository = dayPersonRepository;
        this.passwordEncoder = passwordEncoder;
        this.usernameResolver = usernameResolver;
    }

    public ApiDtos.PersonPage listPersons(Pageable pageable,
                                          com.weeklyplanning.domain.enumeration.AccountRole role,
                                          com.weeklyplanning.domain.enumeration.PersonStatus status,
                                          String search) {
        Specification<Person> spec = Specification.where((root, query, cb) -> {

            if (query.getResultType() != Long.class) {
                root.fetch("account", JoinType.INNER);
                query.distinct(true);
            }

            return cb.conjunction();
        });

        if (search != null && !search.isBlank()) {
            String value = "%" + search.trim().toLowerCase(Locale.ROOT) + "%";
            spec = spec.and((root, query, cb) -> {
                var accountJoin = root.join("account");
                return cb.or(
                    cb.like(cb.lower(root.get("name")), value),
                    cb.like(cb.lower(root.get("email")), value),
                    cb.like(cb.lower(accountJoin.get("username")), value)
                );
            });
        }

        if (role != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.join("account").get("role"), role));
        }

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        Page<Person> page = personRepository.findAll(spec, pageable);
        return new ApiDtos.PersonPage(page.map(PersonMapper::toSummary).getContent(), PageMapper.toPageMetadata(page));
    }

    public ApiDtos.PersonDetail createPerson(ApiDtos.CreatePersonRequest request) {
        if (accountRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ConflictException("EMAIL_ALREADY_EXISTS", "Email is already in use.");
        }

        String username;
        if (request.username() != null && !request.username().isBlank()) {
            username = request.username().trim().toLowerCase(Locale.ROOT);
            if (accountRepository.existsByUsernameIgnoreCase(username)) {
                throw new ConflictException("USERNAME_ALREADY_EXISTS", "Username is already in use.");
            }
        } else {
            username = usernameResolver.resolveForCreate(null, request.email());
        }

        Account account = Account.builder()
            .username(username)
            .email(request.email().trim().toLowerCase(Locale.ROOT))
            .passwordHash(passwordEncoder.encode(request.password()))
            .role(request.role())
            .build();

        Account savedAccount = accountRepository.save(account);

        Person person = Person.builder()
            .account(savedAccount)
            .name(request.name().trim())
            .email(savedAccount.getEmail())
            .status(request.status())
            .build();

        return PersonMapper.toDetail(personRepository.save(person));
    }

    public ApiDtos.PersonDetail getPersonById(UUID personId) {
        return PersonMapper.toDetail(findPerson(personId));
    }

    public ApiDtos.PersonDetail updatePerson(UUID personId, ApiDtos.UpdatePersonRequest request) {
        Person person = findPerson(personId);
        Account account = person.getAccount();

        String normalizedEmail = request.email().trim().toLowerCase(Locale.ROOT);
        if (accountRepository.existsByEmailIgnoreCaseAndIdNot(normalizedEmail, account.getId())) {
            throw new ConflictException("EMAIL_ALREADY_EXISTS", "Email is already in use.");
        }

        String username = account.getUsername();
        if (request.username() != null && !request.username().isBlank()) {
            username = request.username().trim().toLowerCase(Locale.ROOT);
            if (accountRepository.existsByUsernameIgnoreCaseAndIdNot(username, account.getId())) {
                throw new ConflictException("USERNAME_ALREADY_EXISTS", "Username is already in use.");
            }
        }

        account.setUsername(username);
        account.setEmail(normalizedEmail);
        account.setRole(request.role());

        person.setName(request.name().trim());
        person.setEmail(normalizedEmail);
        person.setStatus(request.status());

        accountRepository.save(account);
        return PersonMapper.toDetail(personRepository.save(person));
    }

    public void deletePerson(UUID personId) {
        Person person = findPerson(personId);
        if (dayPersonRepository.existsByPersonId(personId)) {
            throw new ConflictException("PERSON_HAS_PLANNING", "Person is assigned in planning and cannot be removed.");
        }

        UUID accountId = person.getAccount().getId();
        personRepository.delete(person);
        accountRepository.deleteById(accountId);
    }

    public Person findPerson(UUID personId) {
        return personRepository.findById(personId)
            .orElseThrow(() -> new NotFoundException("PERSON_NOT_FOUND", "Person not found."));
    }
}
