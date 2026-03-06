package com.mycompany.weeklyplanning.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ProjectEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ProjectEntity getProjectEntitySample1() {
        return new ProjectEntity().id(1L).name("name1");
    }

    public static ProjectEntity getProjectEntitySample2() {
        return new ProjectEntity().id(2L).name("name2");
    }

    public static ProjectEntity getProjectEntityRandomSampleGenerator() {
        return new ProjectEntity().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
