package com.example.weeklyplanning;

import com.example.weeklyplanning.config.BruteForceProperties;
import com.example.weeklyplanning.config.BootstrapProperties;
import com.example.weeklyplanning.config.JwtProperties;
import com.example.weeklyplanning.config.PasswordPolicyProperties;
import com.example.weeklyplanning.config.PlanningProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@EnableConfigurationProperties({
    JwtProperties.class,
    PasswordPolicyProperties.class,
    BruteForceProperties.class,
    PlanningProperties.class,
    BootstrapProperties.class
})
public class WeeklyPlanningApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeeklyPlanningApplication.class, args);
    }
}
