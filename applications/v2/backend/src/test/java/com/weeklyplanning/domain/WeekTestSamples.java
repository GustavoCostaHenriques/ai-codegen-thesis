package com.weeklyplanning.domain;

import java.util.UUID;

public class WeekTestSamples {

    public static Week getWeekSample1() {
        return new Week().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa"));
    }

    public static Week getWeekSample2() {
        return new Week().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367"));
    }

    public static Week getWeekRandomSampleGenerator() {
        return new Week().id(UUID.randomUUID());
    }
}
