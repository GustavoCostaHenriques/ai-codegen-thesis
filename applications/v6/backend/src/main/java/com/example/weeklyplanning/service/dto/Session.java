package com.example.weeklyplanning.service.dto;

public record Session(
    String accessToken,
    SessionTokenType tokenType,
    long expiresIn,
    AuthenticatedUser user
) {
}
