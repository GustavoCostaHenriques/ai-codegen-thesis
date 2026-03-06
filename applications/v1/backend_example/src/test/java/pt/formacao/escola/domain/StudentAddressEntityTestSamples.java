package pt.formacao.escola.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class StudentAddressEntityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static StudentAddressEntity getStudentAddressEntitySample1() {
        return new StudentAddressEntity().id(1L).adressLine("adressLine1").postalCode("postalCode1").city("city1").country("country1");
    }

    public static StudentAddressEntity getStudentAddressEntitySample2() {
        return new StudentAddressEntity().id(2L).adressLine("adressLine2").postalCode("postalCode2").city("city2").country("country2");
    }

    public static StudentAddressEntity getStudentAddressEntityRandomSampleGenerator() {
        return new StudentAddressEntity()
            .id(longCount.incrementAndGet())
            .adressLine(UUID.randomUUID().toString())
            .postalCode(UUID.randomUUID().toString())
            .city(UUID.randomUUID().toString())
            .country(UUID.randomUUID().toString());
    }
}
