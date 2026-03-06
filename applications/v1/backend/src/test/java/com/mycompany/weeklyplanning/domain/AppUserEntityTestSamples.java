package com.mycompany.weeklyplanning.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class AppUserEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AppUserEntity getAppUserEntitySample1() {
        return new AppUserEntity().id(1L).name("name1");
    }

    public static AppUserEntity getAppUserEntitySample2() {
        return new AppUserEntity().id(2L).name("name2");
    }

    public static AppUserEntity getAppUserEntityRandomSampleGenerator() {
        return new AppUserEntity().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
