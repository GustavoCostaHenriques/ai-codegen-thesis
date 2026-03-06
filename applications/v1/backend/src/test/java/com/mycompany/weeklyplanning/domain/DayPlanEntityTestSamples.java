package com.mycompany.weeklyplanning.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class DayPlanEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static DayPlanEntity getDayPlanEntitySample1() {
        return new DayPlanEntity().id(1L);
    }

    public static DayPlanEntity getDayPlanEntitySample2() {
        return new DayPlanEntity().id(2L);
    }

    public static DayPlanEntity getDayPlanEntityRandomSampleGenerator() {
        return new DayPlanEntity().id(longCount.incrementAndGet());
    }
}
