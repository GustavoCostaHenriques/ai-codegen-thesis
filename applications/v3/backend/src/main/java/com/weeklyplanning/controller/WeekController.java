package com.weeklyplanning.controller;

import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.service.WeekService;
import com.weeklyplanning.service.dto.ApiDtos;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.net.URI;
import java.time.LocalDate;
import java.util.UUID;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/weeks")
@Validated
public class WeekController {

    private final WeekService weekService;

    public WeekController(WeekService weekService) {
        this.weekService = weekService;
    }

    @GetMapping
    public ApiDtos.WeekPage listWeeks(
        @PageableDefault(size = 20, sort = "weekStart", direction = Sort.Direction.ASC)
        Pageable pageable,
        @RequestParam(name="status", required = false) WeekStatus status,
        @RequestParam(name="weekStartFrom", required = false) LocalDate weekStartFrom,
        @RequestParam(name="weekStartTo", required = false) LocalDate weekStartTo
    ) {
        return weekService.listWeeks(pageable, status, weekStartFrom, weekStartTo);
    }


    @PostMapping
    public ResponseEntity<ApiDtos.WeekDetail> createWeek(@Valid @RequestBody ApiDtos.CreateWeekRequest request) {
        ApiDtos.WeekDetail response = weekService.createWeek(request);
        return ResponseEntity.created(URI.create("/api/v1/weeks/" + response.weekId())).body(response);
    }

    @GetMapping("/{weekId}")
    public ApiDtos.WeekDetail getWeekById(@PathVariable(name="weekId") UUID weekId) {
        return weekService.getWeekById(weekId);
    }

    @PutMapping("/{weekId}")
    public ApiDtos.WeekDetail updateWeekById(@PathVariable(name="weekId") UUID weekId,
                                             @Valid @RequestBody ApiDtos.UpdateWeekRequest request) {
        return weekService.updateWeek(weekId, request);
    }

    @DeleteMapping("/{weekId}")
    public ResponseEntity<Void> deleteWeekById(@PathVariable(name="weekId") UUID weekId) {
        weekService.deleteWeek(weekId);
        return ResponseEntity.noContent().build();
    }
}
