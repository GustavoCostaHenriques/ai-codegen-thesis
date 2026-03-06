package com.example.weeklyplanning.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuditService {

    private static final Logger LOG = LoggerFactory.getLogger("AUDIT");

    public void authenticationEvent(String action, String username, boolean success, String detail) {
        LOG.info(
            "event=auth action={} user={} success={} timestamp={} detail={}",
            action,
            username,
            success,
            Instant.now(),
            detail
        );
    }

    public void entityEvent(String entity, String action, UUID entityId, String username) {
        LOG.info(
            "event=entity entity={} action={} entityId={} user={} timestamp={}",
            entity,
            action,
            entityId,
            username,
            Instant.now()
        );
    }
}
