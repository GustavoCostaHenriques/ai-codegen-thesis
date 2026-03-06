package com.weeklyplanning.domain;

import java.util.UUID;

public class DayPlanTestSamples {

    public static DayPlan getDayPlanSample1() {
        return new DayPlan().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa"));
    }

    public static DayPlan getDayPlanSample2() {
        return new DayPlan().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367"));
    }

    public static DayPlan getDayPlanRandomSampleGenerator() {
        return new DayPlan().id(UUID.randomUUID());
    }
}
