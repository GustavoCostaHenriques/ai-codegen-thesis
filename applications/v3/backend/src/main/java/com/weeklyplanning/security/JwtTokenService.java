package com.weeklyplanning.security;

import com.weeklyplanning.config.AuthoritiesConstants;
import com.weeklyplanning.domain.Account;
import com.weeklyplanning.domain.Person;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.MessageDigest;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenService {

    private final JwtProperties jwtProperties;

    public JwtTokenService(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    public String createToken(Account account, Person person) {
        OffsetDateTime now = OffsetDateTime.now(ZoneOffset.UTC);
        OffsetDateTime expiry = now.plusMinutes(jwtProperties.getExpirationMinutes());

        String authority = account.getRole().name().equals("ADMIN")
            ? AuthoritiesConstants.ADMIN
            : AuthoritiesConstants.VIEWER;

        return Jwts.builder()
            .subject(account.getUsername())
            .issuer(jwtProperties.getIssuer())
            .issuedAt(Date.from(now.toInstant()))
            .expiration(Date.from(expiry.toInstant()))
            .claim("accountId", account.getId().toString())
            .claim("personId", person.getId().toString())
            .claim("role", authority)
            .signWith(getSigningKey())
            .compact();
    }

    public long getExpirationSeconds() {
        return jwtProperties.getExpirationMinutes() * 60;
    }

    public Authentication parseAuthentication(String token) {
        Claims claims = parseClaims(token);
        String role = claims.get("role", String.class);
        UUID accountId = UUID.fromString(claims.get("accountId", String.class));
        UUID personId = UUID.fromString(claims.get("personId", String.class));
        String username = claims.getSubject();

        var authority = new SimpleGrantedAuthority(role);
        ApiUserPrincipal principal = new ApiUserPrincipal(accountId, personId, username, role, List.of(authority));
        return new UsernamePasswordAuthenticationToken(principal, token, principal.authorities());
    }

    public boolean isValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (RuntimeException ex) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey getSigningKey() {
        String secret = jwtProperties.getSecret();
        byte[] bytes;

        try {
            bytes = Decoders.BASE64.decode(secret);
            if (bytes.length < 32) {
                bytes = digest(secret);
            }
        } catch (Exception ex) {
            bytes = digest(secret);
        }

        return Keys.hmacShaKeyFor(bytes);
    }

    private byte[] digest(String secret) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return digest.digest(secret.getBytes(StandardCharsets.UTF_8));
        } catch (Exception ex) {
            throw new IllegalStateException("Unable to initialize JWT secret", ex);
        }
    }
}
