package com.weeklyplanning.domain;

import java.util.UUID;

public class PersonTestSamples {

    public static Person getPersonSample1() {
        return new Person().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa")).name("name1").email("email1").role("role1");
    }

    public static Person getPersonSample2() {
        return new Person().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367")).name("name2").email("email2").role("role2");
    }

    public static Person getPersonRandomSampleGenerator() {
        return new Person()
            .id(UUID.randomUUID())
            .name(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .role(UUID.randomUUID().toString());
    }
}
