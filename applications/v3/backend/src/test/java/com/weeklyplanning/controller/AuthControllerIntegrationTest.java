package com.weeklyplanning.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weeklyplanning.domain.enumeration.AccountRole;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.security.JwtTokenService;
import com.weeklyplanning.service.AuthService;
import com.weeklyplanning.service.dto.ApiDtos;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtTokenService jwtTokenService;

    @Test
    void createAuthSessionShouldReturnTokenPayload() throws Exception {
        ApiDtos.AuthenticatedAccount account = new ApiDtos.AuthenticatedAccount(
            UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
            UUID.fromString("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
            "viewer",
            "Viewer User",
            "viewer@example.com",
            AccountRole.VIEWER,
            PersonStatus.ACTIVE
        );

        ApiDtos.LoginResponse response = new ApiDtos.LoginResponse("token-value", "Bearer", 3600L, account);
        when(authService.createSession(any())).thenReturn(response);

        ApiDtos.LoginRequest request = new ApiDtos.LoginRequest("viewer", "password123");

        mockMvc.perform(post("/api/v1/auth/sessions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.accessToken").value("token-value"))
            .andExpect(jsonPath("$.tokenType").value("Bearer"))
            .andExpect(jsonPath("$.account.username").value("viewer"));
    }
}
