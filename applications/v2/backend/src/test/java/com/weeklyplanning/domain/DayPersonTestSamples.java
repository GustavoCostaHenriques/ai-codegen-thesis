package com.weeklyplanning.domain;

import java.util.UUID;

public class DayPersonTestSamples {

    public static DayPerson getDayPersonSample1() {
        return new DayPerson().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa"));
    }

    public static DayPerson getDayPersonSample2() {
        return new DayPerson().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367"));
    }

    public static DayPerson getDayPersonRandomSampleGenerator() {
        return new DayPerson().id(UUID.randomUUID());
    }
}
