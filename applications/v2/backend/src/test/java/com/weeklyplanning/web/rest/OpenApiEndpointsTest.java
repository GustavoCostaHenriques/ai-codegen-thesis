package com.weeklyplanning.web.rest;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.weeklyplanning.IntegrationTest;
import java.time.LocalDate;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@AutoConfigureMockMvc
@IntegrationTest
@Transactional
class OpenApiEndpointsIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper om;

    @Test
    void allOpenApiEndpointsAreCallable() throws Exception {
        String adminToken = createAccountAndLogin("ADMIN");
        String viewerToken = createAccountAndLogin("VIEWER");

        MvcResult createPersonResult = mockMvc
            .perform(
                post("/api/people")
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        {
                          "name":"Ana Martins",
                          "email":"ana.martins@weeklyplanning.local",
                          "role":"Backend Engineer",
                          "status":"ACTIVE"
                        }
                        """
                    )
            )
            .andExpect(status().isCreated())
            .andReturn();
        String personId = om.readTree(createPersonResult.getResponse().getContentAsString()).get("id").asText();

        mockMvc.perform(get("/api/people").header(AUTHORIZATION, bearer(viewerToken))).andExpect(status().isOk());
        mockMvc.perform(get("/api/people/{personId}", personId).header(AUTHORIZATION, bearer(viewerToken))).andExpect(status().isOk());
        mockMvc
            .perform(
                put("/api/people/{personId}", personId)
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        {
                          "name":"Ana Martins",
                          "email":"ana.martins@weeklyplanning.local",
                          "role":"Lead Engineer",
                          "status":"ACTIVE"
                        }
                        """
                    )
            )
            .andExpect(status().isOk());

        MvcResult createProjectResult = mockMvc
            .perform(
                post("/api/projects")
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        {
                          "name":"Contract Alignment",
                          "code":"CNT-API",
                          "ownerId":"%s",
                          "status":"ACTIVE"
                        }
                        """
                            .formatted(personId)
                    )
            )
            .andExpect(status().isCreated())
            .andReturn();
        String projectId = om.readTree(createProjectResult.getResponse().getContentAsString()).get("id").asText();

        mockMvc.perform(get("/api/projects").header(AUTHORIZATION, bearer(viewerToken))).andExpect(status().isOk());
        mockMvc.perform(get("/api/projects/{projectId}", projectId).header(AUTHORIZATION, bearer(viewerToken))).andExpect(status().isOk());
        mockMvc
            .perform(
                put("/api/projects/{projectId}", projectId)
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        {
                          "name":"Contract Alignment",
                          "code":"CNT-API",
                          "ownerId":"%s",
                          "status":"ACTIVE"
                        }
                        """
                            .formatted(personId)
                    )
            )
            .andExpect(status().isOk());

        LocalDate weekStart = LocalDate.of(2026, 3, 2);
        LocalDate weekEnd = LocalDate.of(2026, 3, 6);

        MvcResult createWeekResult = mockMvc
            .perform(
                post("/api/weeks")
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        {
                          "startDate":"%s",
                          "endDate":"%s",
                          "status":"PLANNED"
                        }
                        """
                            .formatted(weekStart, weekEnd)
                    )
            )
            .andExpect(status().isCreated())
            .andReturn();
        String weekId = om.readTree(createWeekResult.getResponse().getContentAsString()).get("id").asText();

        mockMvc.perform(get("/api/weeks").header(AUTHORIZATION, bearer(viewerToken))).andExpect(status().isOk());
        mockMvc.perform(get("/api/weeks/{weekId}", weekId).header(AUTHORIZATION, bearer(viewerToken))).andExpect(status().isOk());
        mockMvc
            .perform(
                put("/api/weeks/{weekId}", weekId)
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        {
                          "startDate":"%s",
                          "endDate":"%s",
                          "status":"PLANNED"
                        }
                        """
                            .formatted(weekStart, weekEnd)
                    )
            )
            .andExpect(status().isOk());

        mockMvc.perform(get("/api/weeks/{weekId}/planning", weekId).header(AUTHORIZATION, bearer(viewerToken))).andExpect(status().isOk());

        LocalDate day = weekStart.plusDays(1);
        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/people", weekId, day)
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        { "personId":"%s" }
                        """
                            .formatted(personId)
                    )
            )
            .andExpect(status().isCreated());

        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/people/{personId}/projects", weekId, day, personId)
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        { "projectId":"%s" }
                        """
                            .formatted(projectId)
                    )
            )
            .andExpect(status().isCreated());

        MvcResult addTaskResult = mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}/tasks", weekId, day, personId, projectId)
                    .header(AUTHORIZATION, bearer(adminToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        { "description":"Implement controller validation flow" }
                        """
                    )
            )
            .andExpect(status().isCreated())
            .andReturn();
        String taskId = om.readTree(addTaskResult.getResponse().getContentAsString()).get("id").asText();

        mockMvc
            .perform(
                delete(
                    "/api/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}/tasks/{taskId}",
                    weekId,
                    day,
                    personId,
                    projectId,
                    taskId
                ).header(AUTHORIZATION, bearer(adminToken))
            )
            .andExpect(status().isNoContent());

        mockMvc
            .perform(
                delete("/api/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}", weekId, day, personId, projectId)
                    .header(AUTHORIZATION, bearer(adminToken))
            )
            .andExpect(status().isNoContent());

        mockMvc
            .perform(delete("/api/weeks/{weekId}/days/{date}/people/{personId}", weekId, day, personId).header(AUTHORIZATION, bearer(adminToken)))
            .andExpect(status().isNoContent());

        mockMvc.perform(delete("/api/weeks/{weekId}", weekId).header(AUTHORIZATION, bearer(adminToken))).andExpect(status().isNoContent());
        mockMvc.perform(delete("/api/projects/{projectId}", projectId).header(AUTHORIZATION, bearer(adminToken))).andExpect(status().isNoContent());
        mockMvc.perform(delete("/api/people/{personId}", personId).header(AUTHORIZATION, bearer(adminToken))).andExpect(status().isNoContent());
    }

    private String createAccountAndLogin(String role) throws Exception {
        String suffix = UUID.randomUUID().toString().substring(0, 8);
        String username = role.toLowerCase() + "_" + suffix;
        String password = "Password123!";

        mockMvc
            .perform(
                post("/api/accounts")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        {
                          "username":"%s",
                          "password":"%s",
                          "role":"%s"
                        }
                        """
                            .formatted(username, password, role)
                    )
            )
            .andExpect(status().isCreated());

        MvcResult loginResult = mockMvc
            .perform(
                post("/api/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                        {
                          "username":"%s",
                          "password":"%s"
                        }
                        """
                            .formatted(username, password)
                    )
            )
            .andExpect(status().isOk())
            .andReturn();

        JsonNode payload = om.readTree(loginResult.getResponse().getContentAsString());
        return payload.get("accessToken").asText();
    }

    private String bearer(String token) {
        return "Bearer " + token;
    }
}
