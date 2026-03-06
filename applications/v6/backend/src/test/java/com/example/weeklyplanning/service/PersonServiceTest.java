package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PersonStatus;
import com.example.weeklyplanning.repository.AccountRepository;
import com.example.weeklyplanning.repository.PersonRepository;
import com.example.weeklyplanning.repository.PlanningAssignmentRepository;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.dto.PersonCreateRequest;
import com.example.weeklyplanning.service.mapper.ApiMapper;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
    private PasswordEncoder passwordEncoder;

    @Mock
    private PasswordPolicyService passwordPolicyService;

    @Mock
    private PaginationService paginationService;

    @Mock
    private ApiMapper apiMapper;

    @Mock
    private AuditService auditService;

    @Mock
    private PlanningAssignmentRepository planningAssignmentRepository;

    private PersonService personService;

    @BeforeEach
    void setUp() {
        personService = new PersonService(
            personRepository,
            accountRepository,
            passwordEncoder,
            passwordPolicyService,
            paginationService,
            apiMapper,
            auditService,
            planningAssignmentRepository
        );
    }

    @Test
    void createPersonShouldFailWhenUsernameAlreadyExists() {
        PersonCreateRequest request = new PersonCreateRequest(
            "Alice",
            "alice",
            "alice@weekly.local",
            "Pass1234",
            AccountRole.VIEWER,
            PersonStatus.ACTIVE
        );
        when(accountRepository.existsByUsernameIgnoreCase("alice")).thenReturn(true);

        assertThrows(ConflictException.class,
            () -> personService.createPerson(request, new AuthenticatedPrincipal(null, null, "admin", AccountRole.ADMIN, PersonStatus.ACTIVE, "jti")));

        verify(accountRepository, never()).save(any(AccountEntity.class));
    }

    @Test
    void createPersonShouldCreateLinkedAccountAndPerson() {
        PersonCreateRequest request = new PersonCreateRequest(
            "Alice",
            "alice",
            "alice@weekly.local",
            "Pass1234",
            AccountRole.VIEWER,
            PersonStatus.ACTIVE
        );
        when(accountRepository.existsByUsernameIgnoreCase("alice")).thenReturn(false);
        when(accountRepository.existsByEmailIgnoreCase("alice@weekly.local")).thenReturn(false);
        when(passwordEncoder.encode("Pass1234")).thenReturn("hash");

        AuthenticatedPrincipal actor = new AuthenticatedPrincipal(null, null, "admin", AccountRole.ADMIN, PersonStatus.ACTIVE, "jti");
        personService.createPerson(request, actor);

        ArgumentCaptor<AccountEntity> accountCaptor = ArgumentCaptor.forClass(AccountEntity.class);
        verify(accountRepository).save(accountCaptor.capture());

        AccountEntity savedAccount = accountCaptor.getValue();
        assertEquals("alice", savedAccount.getUsername());
        assertEquals("alice@weekly.local", savedAccount.getEmail());
        assertEquals("hash", savedAccount.getPasswordHash());

        verify(personRepository).save(any(PersonEntity.class));
    }
}
