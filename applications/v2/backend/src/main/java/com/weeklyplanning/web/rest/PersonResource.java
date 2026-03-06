package com.weeklyplanning.web.rest;

import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.service.PersonService;
import com.weeklyplanning.service.dto.PersonDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.web.rest.api.ApiModels;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/people")
public class PersonResource {

    private final PersonService personService;

    public PersonResource(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN, T(com.weeklyplanning.security.AuthoritiesConstants).VIEWER)")
    public ResponseEntity<ApiModels.PeoplePage> listPeople(
        @RequestParam(name = "status", required = false) PersonStatus status,
        @RequestParam(name = "q", required = false) String q,
        Pageable pageable
    ) {
        validatePageable(pageable);
        Page<PersonDTO> page = personService.search(status, q, pageable);
        List<ApiModels.Person> items = page.getContent().stream().map(this::toApiPerson).toList();
        ApiModels.PeoplePage body = new ApiModels.PeoplePage(items, toPageInfo(page));
        return ResponseEntity.ok(body);
    }

    @PostMapping
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.Person> createPerson(@Valid @RequestBody ApiModels.PersonUpsertRequest request) {
        PersonDTO personDTO = toPersonDTO(request);
        PersonDTO created = personService.save(personDTO);
        return ResponseEntity.created(URI.create("/api/people/" + created.getId())).body(toApiPerson(created));
    }

    @GetMapping("/{personId}")
    @PreAuthorize("hasAnyAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN, T(com.weeklyplanning.security.AuthoritiesConstants).VIEWER)")
    public ResponseEntity<ApiModels.Person> getPerson(@PathVariable UUID personId) {
        PersonDTO person = personService.findOne(personId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Person not found"));
        return ResponseEntity.ok(toApiPerson(person));
    }

    @PutMapping("/{personId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.Person> updatePerson(
        @PathVariable UUID personId,
        @Valid @RequestBody ApiModels.PersonUpsertRequest request
    ) {
        PersonDTO personDTO = toPersonDTO(request);
        personDTO.setId(personId);
        PersonDTO updated = personService.update(personDTO);
        return ResponseEntity.ok(toApiPerson(updated));
    }

    @DeleteMapping("/{personId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<Void> deletePerson(@PathVariable UUID personId) {
        personService.findOne(personId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Person not found"));
        personService.delete(personId);
        return ResponseEntity.noContent().build();
    }

    private PersonDTO toPersonDTO(ApiModels.PersonUpsertRequest request) {
        PersonDTO dto = new PersonDTO();
        dto.setName(request.name());
        dto.setEmail(request.email());
        dto.setRole(request.role());
        dto.setStatus(request.status());
        return dto;
    }

    private ApiModels.Person toApiPerson(PersonDTO dto) {
        return new ApiModels.Person(dto.getId(), dto.getName(), dto.getEmail(), dto.getRole(), dto.getStatus());
    }

    private ApiModels.PageInfo toPageInfo(Page<?> page) {
        List<ApiModels.SortInfo> sort = page
            .getSort()
            .stream()
            .map(order ->
                new ApiModels.SortInfo(
                    order.getProperty(),
                    order.isAscending() ? ApiModels.SortDirection.ASC : ApiModels.SortDirection.DESC
                )
            )
            .toList();
        return new ApiModels.PageInfo(page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages(), sort);
    }

    private void validatePageable(Pageable pageable) {
        if (pageable.getPageNumber() < 0 || pageable.getPageSize() < 1 || pageable.getPageSize() > 200) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid pagination parameters");
        }
    }
}
