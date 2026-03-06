package com.example.weeklyplanning.service.security;

import com.example.weeklyplanning.config.security.SecurityProperties;
import com.example.weeklyplanning.web.rest.errors.UnauthorizedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtTokenService {

    private final SecurityProperties securityProperties;
    private final SecretKey secretKey;

    public JwtTokenService(SecurityProperties securityProperties) {
        this.securityProperties = securityProperties;
        if (securityProperties.getJwtSecret() == null || securityProperties.getJwtSecret().length() < 32) {
            throw new IllegalStateException("APP_JWT_SECRET must be set with at least 32 characters");
        }
        this.secretKey = Keys.hmacShaKeyFor(securityProperties.getJwtSecret().getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(AuthenticatedPrincipal principal) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(securityProperties.getJwtExpirationSeconds());

        return Jwts.builder()
            .subject(principal.getAccountId().toString())
            .issuedAt(Date.from(now))
            .expiration(Date.from(expiry))
            .claim("personId", principal.getPersonId().toString())
            .claim("role", principal.getRole().name())
            .claim("username", principal.getUsername())
            .signWith(secretKey)
            .compact();
    }

    public Claims parse(String token) {
        try {
            return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
        } catch (Exception ex) {
            throw new UnauthorizedException("Invalid authentication token");
        }
    }

    public UUID extractAccountId(String token) {
        return UUID.fromString(parse(token).getSubject());
    }

    public Instant extractExpiration(String token) {
        return parse(token).getExpiration().toInstant();
    }

    public long getExpiresInSeconds() {
        return securityProperties.getJwtExpirationSeconds();
    }
}
