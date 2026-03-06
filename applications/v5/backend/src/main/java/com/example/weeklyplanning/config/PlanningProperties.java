package com.example.weeklyplanning.config;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.planning")
public class PlanningProperties {

    @Min(1)
    @Max(2000)
    private int taskMinLength = 1;

    public int getTaskMinLength() {
        return taskMinLength;
    }

    public void setTaskMinLength(int taskMinLength) {
        this.taskMinLength = taskMinLength;
    }
}
