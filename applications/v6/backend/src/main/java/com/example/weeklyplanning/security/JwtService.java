package com.example.weeklyplanning.security;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PersonStatus;
import com.example.weeklyplanning.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Component
public class JwtService {

    private final JwtProperties jwtProperties;
    private final SecretKey secretKey;

    public JwtService(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
        this.secretKey = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(AccountEntity account, PersonEntity person, String jti) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(jwtProperties.getAccessTokenExpirationSeconds());

        return Jwts.builder()
            .subject(account.getId().toString())
            .id(jti)
            .issuedAt(Date.from(now))
            .expiration(Date.from(expiry))
            .claims(Map.of(
                "username", account.getUsername(),
                "personId", person.getId().toString(),
                "role", account.getRole().name(),
                "status", person.getStatus().name()
            ))
            .signWith(secretKey)
            .compact();
    }

    public JwtClaims parse(String token) {
        Jws<Claims> jws = Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token);

        Claims claims = jws.getPayload();
        return new JwtClaims(
            UUID.fromString(claims.getSubject()),
            UUID.fromString(claims.get("personId", String.class)),
            claims.get("username", String.class),
            AccountRole.valueOf(claims.get("role", String.class)),
            PersonStatus.valueOf(claims.get("status", String.class)),
            claims.getId(),
            claims.getExpiration().toInstant()
        );
    }

    public long getAccessTokenExpirationSeconds() {
        return jwtProperties.getAccessTokenExpirationSeconds();
    }

    public record JwtClaims(
        UUID accountId,
        UUID personId,
        String username,
        AccountRole role,
        PersonStatus status,
        String jti,
        Instant expiresAt
    ) {
    }
}
