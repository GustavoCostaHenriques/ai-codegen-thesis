package com.mycompany.weeklyplanning.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class DayUserProjectEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static DayUserProjectEntity getDayUserProjectEntitySample1() {
        return new DayUserProjectEntity().id(1L);
    }

    public static DayUserProjectEntity getDayUserProjectEntitySample2() {
        return new DayUserProjectEntity().id(2L);
    }

    public static DayUserProjectEntity getDayUserProjectEntityRandomSampleGenerator() {
        return new DayUserProjectEntity().id(longCount.incrementAndGet());
    }
}
