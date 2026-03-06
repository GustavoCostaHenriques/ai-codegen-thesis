package com.example.weeklyplanning.security;

import com.example.weeklyplanning.config.BruteForceProperties;
import com.example.weeklyplanning.web.rest.errors.UnauthorizedException;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class BruteForceProtectionService {

    private final BruteForceProperties properties;
    private final Map<String, AttemptState> attempts = new ConcurrentHashMap<>();

    public BruteForceProtectionService(BruteForceProperties properties) {
        this.properties = properties;
    }

    public void verifyAllowed(String username) {
        AttemptState state = attempts.get(normalize(username));
        if (state == null) {
            return;
        }
        Instant now = Instant.now();
        if (state.lockedUntil != null && now.isBefore(state.lockedUntil)) {
            throw new UnauthorizedException("Too many failed login attempts. Account temporarily locked.");
        }
    }

    public void recordFailure(String username) {
        String key = normalize(username);
        attempts.compute(key, (k, current) -> {
            Instant now = Instant.now();
            if (current == null || current.windowStarted.plusSeconds(properties.getWindowSeconds()).isBefore(now)) {
                current = new AttemptState(1, now, null);
            } else {
                current = new AttemptState(current.count + 1, current.windowStarted, current.lockedUntil);
            }

            if (current.count >= properties.getMaxAttempts()) {
                return new AttemptState(current.count, current.windowStarted, now.plusSeconds(properties.getLockDurationSeconds()));
            }
            return current;
        });
    }

    public void recordSuccess(String username) {
        attempts.remove(normalize(username));
    }

    private String normalize(String username) {
        return username == null ? "" : username.trim().toLowerCase();
    }

    private record AttemptState(int count, Instant windowStarted, Instant lockedUntil) {
    }
}
