package com.weeklyplanning.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.security.JwtTokenService;
import com.weeklyplanning.service.ProjectService;
import com.weeklyplanning.service.dto.ApiDtos;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = ProjectController.class)
@AutoConfigureMockMvc(addFilters = false)
class ProjectControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProjectService projectService;

    @MockBean
    private JwtTokenService jwtTokenService;

    @Test
    void createProjectShouldReturnCreatedAndLocationHeader() throws Exception {
        UUID projectId = UUID.fromString("cccccccc-cccc-cccc-cccc-cccccccccccc");
        ApiDtos.ProjectDetail response = new ApiDtos.ProjectDetail(
            projectId,
            "Atlas",
            "ATLS",
            ProjectStatus.ACTIVE,
            OffsetDateTime.parse("2026-02-10T10:00:00Z"),
            OffsetDateTime.parse("2026-02-10T10:00:00Z")
        );

        when(projectService.createProject(any())).thenReturn(response);

        ApiDtos.CreateProjectRequest request = new ApiDtos.CreateProjectRequest("Atlas", "ATLS", ProjectStatus.ACTIVE);

        mockMvc.perform(post("/api/v1/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", "/api/v1/projects/" + projectId))
            .andExpect(jsonPath("$.projectId").value(projectId.toString()))
            .andExpect(jsonPath("$.code").value("ATLS"));
    }
}
