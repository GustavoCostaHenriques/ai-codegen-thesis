package com.example.weeklyplanning.web.rest;

import com.example.weeklyplanning.domain.WeekStatus;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.security.CurrentUserProvider;
import com.example.weeklyplanning.service.WeekService;
import com.example.weeklyplanning.service.dto.DuplicateWeekRequest;
import com.example.weeklyplanning.service.dto.PagedWeeks;
import com.example.weeklyplanning.service.dto.Week;
import com.example.weeklyplanning.service.dto.WeekCreateRequest;
import com.example.weeklyplanning.service.dto.WeekUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/weeks")
public class WeekResource {

    private final WeekService weekService;
    private final CurrentUserProvider currentUserProvider;

    public WeekResource(WeekService weekService, CurrentUserProvider currentUserProvider) {
        this.weekService = weekService;
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping
    public ResponseEntity<PagedWeeks> listWeeks(@RequestParam(defaultValue = "0") Integer page,
                                                @RequestParam(defaultValue = "20") Integer size,
                                                @RequestParam(value="sort", required = false) String sort,
                                                @RequestParam(required = false) WeekStatus status,
                                                @RequestParam(required = false) LocalDate weekStartFrom,
                                                @RequestParam(required = false) LocalDate weekStartTo,
                                                @RequestParam(required = false) String search) {
        return ResponseEntity.ok(weekService.listWeeks(page, size, sort, status, weekStartFrom, weekStartTo, search));
    }

    @PostMapping
    public ResponseEntity<Week> createWeek(@Valid @RequestBody WeekCreateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        Week created = weekService.createWeek(request, principal);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{weekId}")
    public ResponseEntity<Week> getWeekById(@PathVariable UUID weekId) {
        return ResponseEntity.ok(weekService.getWeekById(weekId));
    }

    @PutMapping("/{weekId}")
    public ResponseEntity<Week> updateWeek(@PathVariable UUID weekId,
                                           @Valid @RequestBody WeekUpdateRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        return ResponseEntity.ok(weekService.updateWeek(weekId, request, principal));
    }

    @DeleteMapping("/{weekId}")
    public ResponseEntity<Void> deleteWeek(@PathVariable UUID weekId) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        weekService.deleteWeek(weekId, principal);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{weekId}/duplicates")
    public ResponseEntity<Week> createWeekDuplicate(@PathVariable UUID weekId,
                                                    @Valid @RequestBody DuplicateWeekRequest request) {
        AuthenticatedPrincipal principal = currentUserProvider.requireCurrentUser();
        Week created = weekService.duplicateWeek(weekId, request, principal);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
