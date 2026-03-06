package com.weeklyplanning.domain;

import java.util.UUID;

public class DayPersonProjectTestSamples {

    public static DayPersonProject getDayPersonProjectSample1() {
        return new DayPersonProject().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa"));
    }

    public static DayPersonProject getDayPersonProjectSample2() {
        return new DayPersonProject().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367"));
    }

    public static DayPersonProject getDayPersonProjectRandomSampleGenerator() {
        return new DayPersonProject().id(UUID.randomUUID());
    }
}
