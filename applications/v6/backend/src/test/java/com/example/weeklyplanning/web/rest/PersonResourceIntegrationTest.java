package com.example.weeklyplanning.web.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PersonResourceIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void adminCanCreatePerson() throws Exception {
        String adminToken = login("admin", "admin12345");

        Map<String, Object> body = Map.of(
            "name", "User " + UUID.randomUUID(),
            "username", "user" + UUID.randomUUID().toString().substring(0, 8),
            "email", "user" + UUID.randomUUID().toString().substring(0, 8) + "@weekly.local",
            "password", "Pass1234",
            "role", "VIEWER",
            "status", "ACTIVE"
        );

        mockMvc.perform(post("/people")
                .header("Authorization", "Bearer " + adminToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
            .andExpect(status().isCreated());
    }

    @Test
    void viewerCannotCreatePerson() throws Exception {
        String adminToken = login("admin", "admin12345");

        String viewerUsername = "viewer" + UUID.randomUUID().toString().substring(0, 8);
        String viewerEmail = "viewer" + UUID.randomUUID().toString().substring(0, 8) + "@weekly.local";

        Map<String, Object> createViewer = Map.of(
            "name", "Viewer User",
            "username", viewerUsername,
            "email", viewerEmail,
            "password", "Pass1234",
            "role", "VIEWER",
            "status", "ACTIVE"
        );

        mockMvc.perform(post("/people")
                .header("Authorization", "Bearer " + adminToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createViewer)))
            .andExpect(status().isCreated());

        String viewerToken = login(viewerUsername, "Pass1234");

        Map<String, Object> body = Map.of(
            "name", "Illegal Create",
            "username", "illegal" + UUID.randomUUID().toString().substring(0, 8),
            "email", "illegal" + UUID.randomUUID().toString().substring(0, 8) + "@weekly.local",
            "password", "Pass1234",
            "role", "VIEWER",
            "status", "ACTIVE"
        );

        mockMvc.perform(post("/people")
                .header("Authorization", "Bearer " + viewerToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
            .andExpect(status().isForbidden());
    }

    private String login(String username, String password) throws Exception {
        MvcResult result = mockMvc.perform(post("/sessions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of("username", username, "password", password))))
            .andExpect(status().isCreated())
            .andReturn();

        JsonNode root = objectMapper.readTree(result.getResponse().getContentAsString());
        return root.get("accessToken").asText();
    }
}
