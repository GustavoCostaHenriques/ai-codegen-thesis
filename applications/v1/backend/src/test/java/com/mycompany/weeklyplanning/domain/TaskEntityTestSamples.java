package com.mycompany.weeklyplanning.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TaskEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static TaskEntity getTaskEntitySample1() {
        return new TaskEntity().id(1L).text("text1");
    }

    public static TaskEntity getTaskEntitySample2() {
        return new TaskEntity().id(2L).text("text2");
    }

    public static TaskEntity getTaskEntityRandomSampleGenerator() {
        return new TaskEntity().id(longCount.incrementAndGet()).text(UUID.randomUUID().toString());
    }
}
