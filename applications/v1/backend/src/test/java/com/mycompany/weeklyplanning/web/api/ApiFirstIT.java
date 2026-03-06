package com.mycompany.weeklyplanning.web.api;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.weeklyplanning.IntegrationTest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@IntegrationTest
@AutoConfigureMockMvc
class ApiFirstIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Transactional
    void createUserProjectWeekAndPublish_singleDayWeek() throws Exception {
        UUID userId = createUser("Alice", "alice+" + UUID.randomUUID() + "@example.com");
        UUID projectId = createProject("My Project", "PRJ-" + UUID.randomUUID());

        LocalDate date = LocalDate.of(2026, 1, 5);
        UUID weekId = createWeek("Week 1", date, date);

        // add user to day
        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/users", weekId, date)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"userId\":\"" + userId + "\"}")
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user.id").value(userId.toString()))
            .andExpect(jsonPath("$.projects").isArray());

        // assign project to user on that day
        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/users/{userId}/projects", weekId, date, userId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"projectId\":\"" + projectId + "\"}")
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.project.id").value(projectId.toString()))
            .andExpect(jsonPath("$.tasks").isArray());

        // add a task
        var taskResult = mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/users/{userId}/projects/{projectId}/tasks", weekId, date, userId, projectId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"text\":\"Do work\"}")
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.text").value("Do work"))
            .andReturn();

        JsonNode taskNode = objectMapper.readTree(taskResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        assertThat(taskNode.get("id").asText()).isNotBlank();

        // publish week (should succeed for single-day week with one user/project/task)
        mockMvc
            .perform(
                put("/api/weeks/{weekId}", weekId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        objectMapper.writeValueAsString(
                            objectMapper.createObjectNode()
                                .put("label", "Week 1")
                                .put("startDate", date.toString())
                                .put("endDate", date.toString())
                                .put("status", "PUBLISHED")
                        )
                    )
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("PUBLISHED"))
            .andExpect(jsonPath("$.dayPlans[0].users[0].projects[0].tasks[0].text").value("Do work"));
    }

    @Test
    @Transactional
    void publishWeekWithoutUsersFails() throws Exception {
        LocalDate date = LocalDate.of(2026, 1, 6);
        UUID weekId = createWeek("Empty", date, date);

        mockMvc
            .perform(
                put("/api/weeks/{weekId}", weekId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"label\":\"Empty\",\"startDate\":\"" + date + "\",\"endDate\":\"" + date + "\",\"status\":\"PUBLISHED\"}")
            )
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    @Transactional
    void duplicateUserOnSameDayReturnsConflict() throws Exception {
        UUID userId = createUser("Bob", "bob+" + UUID.randomUUID() + "@example.com");
        LocalDate date = LocalDate.of(2026, 1, 7);
        UUID weekId = createWeek("Dup", date, date);

        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/users", weekId, date)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"userId\":\"" + userId + "\"}")
            )
            .andExpect(status().isCreated());

        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/users", weekId, date)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"userId\":\"" + userId + "\"}")
            )
            .andExpect(status().isConflict())
            .andExpect(jsonPath("$.code").value("CONFLICT"));
    }

    @Test
    @Transactional
    void taskTextTooShortReturnsValidationError() throws Exception {
        UUID userId = createUser("Carol", "carol+" + UUID.randomUUID() + "@example.com");
        UUID projectId = createProject("Short", "S-" + UUID.randomUUID());
        LocalDate date = LocalDate.of(2026, 1, 8);
        UUID weekId = createWeek("ShortTask", date, date);

        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/users", weekId, date)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"userId\":\"" + userId + "\"}")
            )
            .andExpect(status().isCreated());

        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/users/{userId}/projects", weekId, date, userId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"projectId\":\"" + projectId + "\"}")
            )
            .andExpect(status().isCreated());

        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/users/{userId}/projects/{projectId}/tasks", weekId, date, userId, projectId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"text\":\"aa\"}")
            )
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    private UUID createUser(String name, String email) throws Exception {
        var result = mockMvc
            .perform(
                post("/api/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"name\":\"" + name + "\",\"email\":\"" + email + "\",\"role\":\"USER\"}")
            )
            .andExpect(status().isCreated())
            .andReturn();

        JsonNode node = objectMapper.readTree(result.getResponse().getContentAsString(StandardCharsets.UTF_8));
        return UUID.fromString(node.get("id").asText());
    }

    private UUID createProject(String name, String code) throws Exception {
        var result = mockMvc
            .perform(
                post("/api/projects")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"name\":\"" + name + "\",\"code\":\"" + code + "\"}")
            )
            .andExpect(status().isCreated())
            .andReturn();

        JsonNode node = objectMapper.readTree(result.getResponse().getContentAsString(StandardCharsets.UTF_8));
        return UUID.fromString(node.get("id").asText());
    }

    private UUID createWeek(String label, LocalDate startDate, LocalDate endDate) throws Exception {
        var result = mockMvc
            .perform(
                post("/api/weeks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"label\":\"" + label + "\",\"startDate\":\"" + startDate + "\",\"endDate\":\"" + endDate + "\"}")
            )
            .andExpect(status().isCreated())
            .andReturn();

        JsonNode node = objectMapper.readTree(result.getResponse().getContentAsString(StandardCharsets.UTF_8));
        return UUID.fromString(node.get("id").asText());
    }
}

