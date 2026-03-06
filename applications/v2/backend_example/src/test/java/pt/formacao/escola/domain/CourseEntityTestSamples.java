package pt.formacao.escola.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CourseEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CourseEntity getCourseEntitySample1() {
        return new CourseEntity().id(1L).name("name1");
    }

    public static CourseEntity getCourseEntitySample2() {
        return new CourseEntity().id(2L).name("name2");
    }

    public static CourseEntity getCourseEntityRandomSampleGenerator() {
        return new CourseEntity().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
