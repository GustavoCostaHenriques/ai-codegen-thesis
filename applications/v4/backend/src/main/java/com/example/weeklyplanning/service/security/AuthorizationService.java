package com.example.weeklyplanning.service.security;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.example.weeklyplanning.repository.DayPlanRepository;

@Component
public class AuthorizationService {

    private final DayPlanRepository dayPlanRepository;

    public AuthorizationService(DayPlanRepository dayPlanRepository) {
        this.dayPlanRepository = dayPlanRepository;
    }

    public boolean dayPlanBelongsToWeek(UUID weekId, UUID dayPlanId) {
        return dayPlanRepository
                .findByDayPlanIdAndWeek_WeekId(dayPlanId, weekId).isPresent();
    }
}