package pt.formacao.escola.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class GradeEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static GradeEntity getGradeEntitySample1() {
        return new GradeEntity().id(1L).value(1);
    }

    public static GradeEntity getGradeEntitySample2() {
        return new GradeEntity().id(2L).value(2);
    }

    public static GradeEntity getGradeEntityRandomSampleGenerator() {
        return new GradeEntity().id(longCount.incrementAndGet()).value(intCount.incrementAndGet());
    }
}
