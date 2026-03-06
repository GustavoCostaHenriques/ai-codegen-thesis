package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.security.CurrentUserProvider;
import com.example.weeklyplanning.service.StatisticsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class StatisticsResource {

    private static final String CONTENT_TYPE_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    private final StatisticsService statisticsService;
    private final CurrentUserProvider currentUserProvider;

    public StatisticsResource(StatisticsService statisticsService, CurrentUserProvider currentUserProvider) {
        this.statisticsService = statisticsService;
        this.currentUserProvider = currentUserProvider;
    }

    @PostMapping("/statistics-exports")
    public ResponseEntity<byte[]> createStatisticsExport() {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        byte[] data = statisticsService.exportStatistics(principal);
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(CONTENT_TYPE_XLSX))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=weekly-planning-statistics.xlsx")
            .body(data);
    }
}
