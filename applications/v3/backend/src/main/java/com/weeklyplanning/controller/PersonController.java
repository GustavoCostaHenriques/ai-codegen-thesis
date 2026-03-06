package com.weeklyplanning.controller;

import com.weeklyplanning.domain.enumeration.AccountRole;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.service.PersonService;
import com.weeklyplanning.service.dto.ApiDtos;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import java.net.URI;
import java.util.UUID;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/persons")
@Validated
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public ApiDtos.PersonPage listPersons(
        @PageableDefault(size = 20, sort = "name", direction = Sort.Direction.ASC)
        Pageable pageable,
        @RequestParam(name = "search", required = false)
        @Size(min = 1, max = 120) String search,
        @RequestParam(name = "role", required = false)
        AccountRole role,
        @RequestParam(name = "status", required = false)
        PersonStatus status
    ) {
        return personService.listPersons(pageable, role, status, search);
    }


    @PostMapping
    public ResponseEntity<ApiDtos.PersonDetail> createPerson(@Valid @RequestBody ApiDtos.CreatePersonRequest request) {
        ApiDtos.PersonDetail response = personService.createPerson(request);
        return ResponseEntity.created(URI.create("/api/v1/persons/" + response.personId())).body(response);
    }

    @GetMapping("/{personId}")
    public ApiDtos.PersonDetail getPersonById(@PathVariable(name = "personId") UUID personId) {
        return personService.getPersonById(personId);
    }

    @PutMapping("/{personId}")
    public ApiDtos.PersonDetail updatePersonById(@PathVariable(name = "personId") UUID personId,
                                                  @Valid @RequestBody ApiDtos.UpdatePersonRequest request) {
        return personService.updatePerson(personId, request);
    }

    @DeleteMapping("/{personId}")
    public ResponseEntity<Void> deletePersonById(@PathVariable(name = "personId") UUID personId) {
        personService.deletePerson(personId);
        return ResponseEntity.noContent().build();
    }
}
