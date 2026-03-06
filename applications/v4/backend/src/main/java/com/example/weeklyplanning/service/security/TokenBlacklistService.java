package com.example.weeklyplanning.service.security;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    private static final String TOKEN_PREFIX = "auth:blacklist:";

    private final StringRedisTemplate redisTemplate;
    private final Map<String, Instant> localBlacklist = new ConcurrentHashMap<>();

    public TokenBlacklistService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void blacklist(String token, Instant expiresAt) {
        String tokenHash = hash(token);
        Duration ttl = Duration.between(Instant.now(), expiresAt);
        if (ttl.isNegative() || ttl.isZero()) {
            return;
        }

        if (redisTemplate != null) {
            try {
                redisTemplate.opsForValue().set(TOKEN_PREFIX + tokenHash, "1", ttl);
                return;
            } catch (Exception ignored) {
            }
        }

        localBlacklist.put(tokenHash, expiresAt);
    }

    public boolean isBlacklisted(String token) {
        String tokenHash = hash(token);

        if (redisTemplate != null) {
            try {
                return Boolean.TRUE.equals(redisTemplate.hasKey(TOKEN_PREFIX + tokenHash));
            } catch (Exception ignored) {
            }
        }

        Instant expiry = localBlacklist.get(tokenHash);
        if (expiry == null) {
            return false;
        }
        if (expiry.isBefore(Instant.now())) {
            localBlacklist.remove(tokenHash);
            return false;
        }
        return true;
    }

    private String hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder builder = new StringBuilder();
            for (byte b : hash) {
                builder.append(String.format("%02x", b));
            }
            return builder.toString();
        } catch (Exception ex) {
            throw new IllegalStateException("Unable to hash token", ex);
        }
    }
}
