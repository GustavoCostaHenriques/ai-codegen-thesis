package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.WeekStatus;
import com.example.weeklyplanning.repository.DayPlanRepository;
import com.example.weeklyplanning.repository.ProjectRepository;
import com.example.weeklyplanning.repository.WeekRepository;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.dto.WeekCreateRequest;
import com.example.weeklyplanning.service.mapper.ApiMapper;
import com.example.weeklyplanning.web.rest.errors.BadRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WeekServiceTest {

    @Mock
    private WeekRepository weekRepository;

    @Mock
    private DayPlanRepository dayPlanRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private PaginationService paginationService;

    @Mock
    private ApiMapper apiMapper;

    @Mock
    private AuditService auditService;

    private WeekService weekService;

    @BeforeEach
    void setUp() {
        weekService = new WeekService(
            weekRepository,
            dayPlanRepository,
            projectRepository,
            paginationService,
            apiMapper,
            auditService
        );
    }

    @Test
    void createWeekShouldRejectCompletedStatus() {
        WeekCreateRequest request = new WeekCreateRequest(
            LocalDate.of(2026, 2, 23),
            LocalDate.of(2026, 2, 27),
            WeekStatus.COMPLETED
        );

        assertThrows(BadRequestException.class,
            () -> weekService.createWeek(request, new AuthenticatedPrincipal(null, null, "admin", null, null, "jti")));
    }

    @Test
    void createWeekShouldRejectInvalidRange() {
        WeekCreateRequest request = new WeekCreateRequest(
            LocalDate.of(2026, 3, 1),
            LocalDate.of(2026, 2, 27),
            WeekStatus.PLANNED
        );

        assertThrows(BadRequestException.class,
            () -> weekService.createWeek(request, new AuthenticatedPrincipal(null, null, "admin", null, null, "jti")));
    }
}
