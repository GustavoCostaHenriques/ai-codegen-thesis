package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonStatus;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.security.CurrentUserProvider;
import com.example.weeklyplanning.service.PersonService;
import com.example.weeklyplanning.service.dto.PagedPeople;
import com.example.weeklyplanning.service.dto.Person;
import com.example.weeklyplanning.service.dto.PersonCreateRequest;
import com.example.weeklyplanning.service.dto.PersonUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/people")
public class PersonResource {

    private final PersonService personService;
    private final CurrentUserProvider currentUserProvider;

    public PersonResource(PersonService personService, CurrentUserProvider currentUserProvider) {
        this.personService = personService;
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping
    public ResponseEntity<PagedPeople> listPeople(@RequestParam(defaultValue = "0") Integer page,
                                                   @RequestParam(defaultValue = "20") Integer size,
                                                   @RequestParam(required = false) String sort,
                                                   @RequestParam(required = false) PersonStatus status,
                                                   @RequestParam(required = false, name = "role") AccountRole role,
                                                   @RequestParam(required = false) String search) {
        return ResponseEntity.ok(personService.listPeople(page, size, sort, status, role, search));
    }

    @PostMapping
    public ResponseEntity<Person> createPerson(@Valid @RequestBody PersonCreateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        Person created = personService.createPerson(request, principal);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{personId}")
    public ResponseEntity<Person> getPersonById(@PathVariable UUID personId) {
        return ResponseEntity.ok(personService.getPersonById(personId));
    }

    @PutMapping("/{personId}")
    public ResponseEntity<Person> updatePerson(@PathVariable UUID personId,
                                               @Valid @RequestBody PersonUpdateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(personService.updatePerson(personId, request, principal));
    }

    @DeleteMapping("/{personId}")
    public ResponseEntity<Void> deletePerson(@PathVariable UUID personId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        personService.deletePerson(personId, principal);
        return ResponseEntity.noContent().build();
    }
}
