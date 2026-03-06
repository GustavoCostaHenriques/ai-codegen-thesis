package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.AuditLogEntity;
import com.example.weeklyplanning.repository.AuditLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuditService {

    private static final Logger LOG = LoggerFactory.getLogger(AuditService.class);

    private final AuditLogRepository auditLogRepository;

    public AuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void audit(UUID actorAccountId,
                      String actorUsername,
                      String action,
                      String resourceType,
                      UUID resourceId,
                      String details,
                      boolean success) {
        AuditLogEntity entity = new AuditLogEntity();
        entity.setOccurredAt(Instant.now());
        entity.setActorAccountId(actorAccountId);
        entity.setActorUsername(actorUsername);
        entity.setAction(action);
        entity.setResourceType(resourceType);
        entity.setResourceId(resourceId);
        entity.setDetails(details);
        entity.setSuccess(success);
        auditLogRepository.save(entity);

        LOG.info("event=audit action={} resourceType={} resourceId={} actor={} success={} details={}",
            action, resourceType, resourceId, actorUsername, success, details);
    }
}
