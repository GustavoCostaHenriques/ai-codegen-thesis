package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.domain.enumeration.AccountRole;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import com.example.weeklyplanning.service.PersonService;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@Validated
public class PersonResource {

    private final PersonService personService;

    public PersonResource(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/persons")
    public ResponseEntity<ApiSchemas.PersonPage> listPersons(
        @RequestParam(value = "page", required = false) @Min(0) Integer page,
        @RequestParam(value = "size", required = false) @Min(1) @Max(100) Integer size,
        @RequestParam(value = "sort", required = false) String sort,
        @RequestParam(value = "search", required = false) @Size(min = 1, max = 120) String search,
        @RequestParam(value = "role", required = false) AccountRole role,
        @RequestParam(value = "status", required = false) PersonStatus status
    ) {
        return ResponseEntity.ok(personService.listPersons(page, size, sort, search, role, status));
    }

    @PostMapping("/persons")
    public ResponseEntity<ApiSchemas.PersonDetail> createPerson(
        @Valid @RequestBody ApiSchemas.CreatePersonRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        ApiSchemas.PersonDetail response = personService.createPerson(request, actor);
        return ResponseEntity.created(URI.create("/api/v1/persons/" + response.personId())).body(response);
    }

    @GetMapping("/persons/{personId}")
    public ResponseEntity<ApiSchemas.PersonDetail> getPersonById(@PathVariable UUID personId) {
        return ResponseEntity.ok(personService.getPersonById(personId));
    }

    @PutMapping("/persons/{personId}")
    public ResponseEntity<ApiSchemas.PersonDetail> updatePersonById(
        @PathVariable UUID personId,
        @Valid @RequestBody ApiSchemas.UpdatePersonRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        return ResponseEntity.ok(personService.updatePersonById(personId, request, actor));
    }

    @DeleteMapping("/persons/{personId}")
    public ResponseEntity<Void> deletePersonById(
        @PathVariable UUID personId,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        personService.deletePersonById(personId, actor);
        return ResponseEntity.noContent().build();
    }
}
