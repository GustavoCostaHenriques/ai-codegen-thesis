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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PersonServiceTest {

    @Mock
    private PersonRepository personRepository;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private DayPersonRepository dayPersonRepository;

    @Mock
    private PageMapper pageMapper;

    @Mock
    private PaginationSupport paginationSupport;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private PasswordPolicyService passwordPolicyService;

    @Mock
    private UsernameService usernameService;

    @Mock
    private AuditService auditService;

    private PersonService personService;

    @BeforeEach
    void setUp() {
        personService = new PersonService(
            personRepository,
            accountRepository,
            dayPersonRepository,
            new PersonMapper(),
            pageMapper,
            paginationSupport,
            passwordEncoder,
            passwordPolicyService,
            usernameService,
            auditService
        );
    }

    @Test
    void createPersonShouldPersistAndReturnDetail() {
        ApiSchemas.CreatePersonRequest request = new ApiSchemas.CreatePersonRequest(
            "Ana Silva",
            "ana",
            "ana@example.com",
            "Password123!",
            AccountRole.ADMIN,
            PersonStatus.ACTIVE
        );

        when(accountRepository.existsByEmailIgnoreCase("ana@example.com")).thenReturn(false);
        when(usernameService.normalize("ana")).thenReturn("ana");
        when(usernameService.isTaken("ana", null)).thenReturn(false);
        when(passwordEncoder.encode("Password123!")).thenReturn("ENCODED");
        when(personRepository.save(any(PersonEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ApiSchemas.PersonDetail detail = personService.createPerson(request, "admin");

        assertNotNull(detail.personId());
        assertNotNull(detail.accountId());
        assertEquals("ana", detail.username());
        assertEquals("ana@example.com", detail.email());
        assertEquals(AccountRole.ADMIN, detail.role());
        assertEquals(PersonStatus.ACTIVE, detail.status());

        ArgumentCaptor<PersonEntity> captor = ArgumentCaptor.forClass(PersonEntity.class);
        verify(personRepository).save(captor.capture());
        assertEquals("ENCODED", captor.getValue().getAccount().getPasswordHash());
    }

    @Test
    void createPersonShouldFailWhenEmailAlreadyExists() {
        ApiSchemas.CreatePersonRequest request = new ApiSchemas.CreatePersonRequest(
            "Ana Silva",
            "ana",
            "ana@example.com",
            "Password123!",
            AccountRole.ADMIN,
            PersonStatus.ACTIVE
        );

        when(accountRepository.existsByEmailIgnoreCase("ana@example.com")).thenReturn(true);

        assertThrows(ConflictException.class, () -> personService.createPerson(request, "admin"));
        verify(personRepository, never()).save(any(PersonEntity.class));
    }

    @Test
    void deletePersonShouldFailWhenAssignmentsExist() {
        UUID personId = UUID.randomUUID();
        PersonEntity person = new PersonEntity();
        person.setPersonId(personId);

        AccountEntity account = new AccountEntity();
        account.setAccountId(UUID.randomUUID());
        account.setUsername("ana");
        account.setEmail("ana@example.com");
        person.setAccount(account);

        when(personRepository.findByPersonId(personId)).thenReturn(java.util.Optional.of(person));
        when(dayPersonRepository.existsByPerson_PersonId(personId)).thenReturn(true);

        assertThrows(ConflictException.class, () -> personService.deletePersonById(personId, "admin"));
        verify(personRepository, never()).delete(any(PersonEntity.class));
    }
}
