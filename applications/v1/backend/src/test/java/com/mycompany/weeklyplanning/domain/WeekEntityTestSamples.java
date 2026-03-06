package com.mycompany.weeklyplanning.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class WeekEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static WeekEntity getWeekEntitySample1() {
        return new WeekEntity().id(1L).label("label1");
    }

    public static WeekEntity getWeekEntitySample2() {
        return new WeekEntity().id(2L).label("label2");
    }

    public static WeekEntity getWeekEntityRandomSampleGenerator() {
        return new WeekEntity().id(longCount.incrementAndGet()).label(UUID.randomUUID().toString());
    }
}
