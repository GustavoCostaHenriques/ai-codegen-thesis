package pt.formacao.escola.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class DisciplinaEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static DisciplinaEntity getDisciplinaEntitySample1() {
        return new DisciplinaEntity().id(1L).name("name1").capacity(1).credits(1).teacherName("teacherName1");
    }

    public static DisciplinaEntity getDisciplinaEntitySample2() {
        return new DisciplinaEntity().id(2L).name("name2").capacity(2).credits(2).teacherName("teacherName2");
    }

    public static DisciplinaEntity getDisciplinaEntityRandomSampleGenerator() {
        return new DisciplinaEntity()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .capacity(intCount.incrementAndGet())
            .credits(intCount.incrementAndGet())
            .teacherName(UUID.randomUUID().toString());
    }
}
