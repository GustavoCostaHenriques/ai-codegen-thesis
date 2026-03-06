package com.example.weeklyplanning.service.security;

import com.example.weeklyplanning.config.security.SecurityProperties;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    private static final String ATTEMPT_PREFIX = "auth:attempt:";
    private static final String LOCK_PREFIX = "auth:lock:";

    private final StringRedisTemplate redisTemplate;
    private final SecurityProperties securityProperties;
    private final Map<String, AttemptState> localState = new ConcurrentHashMap<>();

    public LoginAttemptService(StringRedisTemplate redisTemplate, SecurityProperties securityProperties) {
        this.redisTemplate = redisTemplate;
        this.securityProperties = securityProperties;
    }

    public boolean isBlocked(String key) {
        if (useRedis()) {
            try {
                String value = redisTemplate.opsForValue().get(LOCK_PREFIX + key);
                return value != null;
            } catch (Exception ignored) {
            }
        }
        AttemptState state = localState.get(key);
        return state != null && state.lockedUntil != null && state.lockedUntil.isAfter(Instant.now());
    }

    public void recordFailure(String key) {
        int maxAttempts = securityProperties.getBruteForce().getMaxAttempts();
        Duration lockDuration = Duration.ofMinutes(securityProperties.getBruteForce().getLockMinutes());

        if (useRedis()) {
            try {
                String attemptsKey = ATTEMPT_PREFIX + key;
                Long attempts = redisTemplate.opsForValue().increment(attemptsKey);
                redisTemplate.expire(attemptsKey, lockDuration);
                if (attempts != null && attempts >= maxAttempts) {
                    redisTemplate.opsForValue().set(LOCK_PREFIX + key, "1", lockDuration);
                }
                return;
            } catch (Exception ignored) {
            }
        }

        localState.compute(key, (k, old) -> {
            AttemptState next = old == null ? new AttemptState() : old;
            if (next.lockedUntil != null && next.lockedUntil.isAfter(Instant.now())) {
                return next;
            }
            next.failures++;
            if (next.failures >= maxAttempts) {
                next.lockedUntil = Instant.now().plus(lockDuration);
            }
            return next;
        });
    }

    public void clearFailures(String key) {
        if (useRedis()) {
            try {
                redisTemplate.delete(ATTEMPT_PREFIX + key);
                redisTemplate.delete(LOCK_PREFIX + key);
                return;
            } catch (Exception ignored) {
            }
        }
        localState.remove(key);
    }

    private boolean useRedis() {
        return redisTemplate != null;
    }

    private static final class AttemptState {
        private int failures;
        private Instant lockedUntil;
    }
}
