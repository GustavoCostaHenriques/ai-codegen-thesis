package com.mycompany.weeklyplanning.service.api;

import java.util.UUID;

/**
 * Minimal, deterministic ID mapping for the prototype.
 *
 * OpenAPI uses UUIDs; domain entities use numeric IDs (Long). To avoid changing the
 * generated JDL entities, we encode Long ids into UUIDs as: new UUID(0L, id).
 */
public final class ApiIdCodec {

    private ApiIdCodec() {}

    public static UUID toUuid(Long id) {
        if (id == null) {
            throw new ApiValidationException("Missing id");
        }
        return new UUID(0L, id);
    }

    public static Long toLong(UUID id) {
        if (id == null) {
            throw new ApiValidationException("Missing id");
        }
        if (id.getMostSignificantBits() != 0L) {
            throw new ApiValidationException("Invalid id format");
        }
        long value = id.getLeastSignificantBits();
        if (value <= 0L) {
            throw new ApiValidationException("Invalid id value");
        }
        return value;
    }
}

