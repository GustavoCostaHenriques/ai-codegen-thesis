package com.mycompany.weeklyplanning.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class DayUserEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static DayUserEntity getDayUserEntitySample1() {
        return new DayUserEntity().id(1L);
    }

    public static DayUserEntity getDayUserEntitySample2() {
        return new DayUserEntity().id(2L);
    }

    public static DayUserEntity getDayUserEntityRandomSampleGenerator() {
        return new DayUserEntity().id(longCount.incrementAndGet());
    }
}
