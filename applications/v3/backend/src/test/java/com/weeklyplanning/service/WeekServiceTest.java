package com.weeklyplanning.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.repository.WeekRepository;
import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.BadRequestException;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class WeekServiceTest {

    @Mock
    private WeekRepository weekRepository;

    private WeekService weekService;

    @BeforeEach
    void setUp() {
        weekService = new WeekService(weekRepository);
    }

    @Test
    void createWeekShouldRejectCompletedStatusOnCreate() {
        ApiDtos.CreateWeekRequest request = new ApiDtos.CreateWeekRequest(
            LocalDate.parse("2026-02-02"),
            LocalDate.parse("2026-02-08"),
            WeekStatus.COMPLETED
        );

        assertThrows(BadRequestException.class, () -> weekService.createWeek(request));
    }

    @Test
    void createWeekShouldCreatePlannedWeekAndDayPlans() {
        ApiDtos.CreateWeekRequest request = new ApiDtos.CreateWeekRequest(
            LocalDate.parse("2026-02-02"),
            LocalDate.parse("2026-02-08"),
            null
        );

        when(weekRepository.existsByCodeIgnoreCase(any())).thenReturn(false);
        when(weekRepository.save(any(Week.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ApiDtos.WeekDetail detail = weekService.createWeek(request);

        assertEquals(WeekStatus.PLANNED, detail.status());
        assertEquals(LocalDate.parse("2026-02-02"), detail.weekStart());
        assertEquals(LocalDate.parse("2026-02-08"), detail.weekEnd());
    }
}
