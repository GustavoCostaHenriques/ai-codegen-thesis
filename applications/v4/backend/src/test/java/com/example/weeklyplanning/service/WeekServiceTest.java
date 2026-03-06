package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.WeekEntity;
import com.example.weeklyplanning.domain.enumeration.WeekStatus;
import com.example.weeklyplanning.repository.WeekRepository;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.mapper.PageMapper;
import com.example.weeklyplanning.service.mapper.WeekMapper;
import com.example.weeklyplanning.web.rest.errors.ConflictException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WeekServiceTest {

    @Mock
    private WeekRepository weekRepository;

    @Mock
    private PageMapper pageMapper;

    @Mock
    private PaginationSupport paginationSupport;

    @Mock
    private AuditService auditService;

    private WeekService weekService;

    @BeforeEach
    void setUp() {
        weekService = new WeekService(weekRepository, new WeekMapper(), pageMapper, paginationSupport, auditService);
    }

    @Test
    void createWeekShouldDefaultStatusToPlannedAndGenerateDayPlans() {
        ApiSchemas.CreateWeekRequest request = new ApiSchemas.CreateWeekRequest(
            LocalDate.of(2026, 2, 2),
            LocalDate.of(2026, 2, 8),
            null
        );

        when(weekRepository.existsByWeekStartAndWeekEnd(request.weekStart(), request.weekEnd())).thenReturn(false);
        when(weekRepository.save(any(WeekEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ApiSchemas.WeekDetail detail = weekService.createWeek(request, "admin");

        assertEquals(WeekStatus.PLANNED, detail.status());
        assertEquals(LocalDate.of(2026, 2, 2), detail.weekStart());
        assertEquals(LocalDate.of(2026, 2, 8), detail.weekEnd());
    }

    @Test
    void assertPlanningWritableShouldRejectCompletedWeeks() {
        WeekEntity week = new WeekEntity();
        week.setStatus(WeekStatus.COMPLETED);

        assertThrows(ConflictException.class, () -> weekService.assertPlanningWritable(week));
    }
}
