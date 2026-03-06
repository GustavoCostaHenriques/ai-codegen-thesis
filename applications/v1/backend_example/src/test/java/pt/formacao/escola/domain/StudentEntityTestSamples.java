package pt.formacao.escola.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class StudentEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static StudentEntity getStudentEntitySample1() {
        return new StudentEntity().id(1L).name("name1").age(1);
    }

    public static StudentEntity getStudentEntitySample2() {
        return new StudentEntity().id(2L).name("name2").age(2);
    }

    public static StudentEntity getStudentEntityRandomSampleGenerator() {
        return new StudentEntity().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString()).age(intCount.incrementAndGet());
    }
}
