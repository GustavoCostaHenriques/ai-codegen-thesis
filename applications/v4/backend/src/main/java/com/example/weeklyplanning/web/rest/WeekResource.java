package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.domain.enumeration.WeekStatus;
import com.example.weeklyplanning.service.WeekService;
import com.example.weeklyplanning.service.dto.ApiSchemas;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@Validated
public class WeekResource {

    private final WeekService weekService;

    public WeekResource(WeekService weekService) {
        this.weekService = weekService;
    }

    @GetMapping("/weeks")
    public ResponseEntity<ApiSchemas.WeekPage> listWeeks(
        @RequestParam(value = "page", required = false) @Min(0) Integer page,
        @RequestParam(value = "size", required = false) @Min(1) @Max(100) Integer size,
        @RequestParam(value = "sort", required = false) String sort,
        @RequestParam(value = "status", required = false) WeekStatus status,
        @RequestParam(value = "weekStartFrom", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStartFrom,
        @RequestParam(value = "weekStartTo", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStartTo
    ) {
        return ResponseEntity.ok(weekService.listWeeks(page, size, sort, status, weekStartFrom, weekStartTo));
    }

    @PostMapping("/weeks")
    public ResponseEntity<ApiSchemas.WeekDetail> createWeek(
        @Valid @RequestBody ApiSchemas.CreateWeekRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        ApiSchemas.WeekDetail response = weekService.createWeek(request, actor);
        return ResponseEntity.created(URI.create("/api/v1/weeks/" + response.weekId())).body(response);
    }

    @GetMapping("/weeks/{weekId}")
    public ResponseEntity<ApiSchemas.WeekDetail> getWeekById(@PathVariable UUID weekId) {
        return ResponseEntity.ok(weekService.getWeekById(weekId));
    }

    @PutMapping("/weeks/{weekId}")
    public ResponseEntity<ApiSchemas.WeekDetail> updateWeekById(
        @PathVariable UUID weekId,
        @Valid @RequestBody ApiSchemas.UpdateWeekRequest request,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        return ResponseEntity.ok(weekService.updateWeekById(weekId, request, actor));
    }

    @DeleteMapping("/weeks/{weekId}")
    public ResponseEntity<Void> deleteWeekById(
        @PathVariable UUID weekId,
        @AuthenticationPrincipal AuthenticatedPrincipal principal
    ) {
        String actor = principal == null ? "anonymous" : principal.getUsername();
        weekService.deleteWeekById(weekId, actor);
        return ResponseEntity.noContent().build();
    }
}
