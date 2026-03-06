package com.mycompany.weeklyplanning;

import com.mycompany.weeklyplanning.config.AsyncSyncConfiguration;
import com.mycompany.weeklyplanning.config.EmbeddedSQL;
import com.mycompany.weeklyplanning.config.JacksonConfiguration;
import com.mycompany.weeklyplanning.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(
    classes = { WeeklyplanningApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class, TestSecurityConfiguration.class }
)
@EmbeddedSQL
public @interface IntegrationTest {
}
