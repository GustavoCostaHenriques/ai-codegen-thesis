package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.domain.enumeration.AccountRole;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import com.example.weeklyplanning.service.PersonService;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PersonResource.class)
@AutoConfigureMockMvc(addFilters = false)
class PersonResourceIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PersonService personService;

    @Test
    void listPersonsShouldReturnPagedResponse() throws Exception {
        ApiSchemas.PersonSummary person = new ApiSchemas.PersonSummary(
            UUID.randomUUID(),
            UUID.randomUUID(),
            "viewer",
            "Default Viewer",
            "viewer@example.com",
            AccountRole.VIEWER,
            PersonStatus.ACTIVE
        );

        ApiSchemas.PersonPage page = new ApiSchemas.PersonPage(
            List.of(person),
            new ApiSchemas.PageMetadata(0, 20, 1, 1, List.of())
        );

        when(personService.listPersons(any(), any(), any(), any(), any(), any())).thenReturn(page);

        mockMvc.perform(get("/api/v1/persons"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content[0].username").value("viewer"))
            .andExpect(jsonPath("$.page.totalElements").value(1));
    }

    @Test
    void createPersonShouldReturnCreatedWithLocationHeader() throws Exception {
        UUID personId = UUID.randomUUID();
        ApiSchemas.CreatePersonRequest request = new ApiSchemas.CreatePersonRequest(
            "Ana Silva",
            "ana",
            "ana@example.com",
            "Password123!",
            AccountRole.ADMIN,
            PersonStatus.ACTIVE
        );

        ApiSchemas.PersonDetail detail = new ApiSchemas.PersonDetail(
            personId,
            UUID.randomUUID(),
            "ana",
            "Ana Silva",
            "ana@example.com",
            AccountRole.ADMIN,
            PersonStatus.ACTIVE,
            Instant.now(),
            Instant.now()
        );

        when(personService.createPerson(any(ApiSchemas.CreatePersonRequest.class), eq("anonymous"))).thenReturn(detail);

        mockMvc.perform(post("/api/v1/persons")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", "/api/v1/persons/" + personId))
            .andExpect(jsonPath("$.personId").value(personId.toString()));
    }
}
