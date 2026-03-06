package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.service.AuthService;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthResource.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthResourceIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @Test
    void createAuthSessionShouldReturnTokenPayload() throws Exception {
        ApiSchemas.LoginRequest request = new ApiSchemas.LoginRequest("admin", "admin12345");
        ApiSchemas.AuthenticatedAccount account = new ApiSchemas.AuthenticatedAccount(
            UUID.randomUUID(),
            UUID.randomUUID(),
            "admin",
            "System Admin",
            "admin@weekly.local",
            com.example.weeklyplanning.domain.enumeration.AccountRole.ADMIN,
            com.example.weeklyplanning.domain.enumeration.PersonStatus.ACTIVE
        );
        ApiSchemas.LoginResponse response = new ApiSchemas.LoginResponse("jwt-token", "Bearer", 900L, account);

        when(authService.createSession(any(ApiSchemas.LoginRequest.class), any(String.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/sessions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.accessToken").value("jwt-token"))
            .andExpect(jsonPath("$.tokenType").value("Bearer"))
            .andExpect(jsonPath("$.expiresIn").value(900));
    }

    @Test
    void deleteCurrentAuthSessionShouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/api/v1/auth/sessions/current")
                .header("Authorization", "Bearer token"))
            .andExpect(status().isNoContent());

        verify(authService).deleteCurrentSession(eq("Bearer token"), eq("anonymous"));
    }
}
