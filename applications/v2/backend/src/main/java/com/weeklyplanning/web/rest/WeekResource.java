package com.weeklyplanning.web.rest;

import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.service.WeekService;
import com.weeklyplanning.service.dto.WeekDTO;
import com.weeklyplanning.service.error.ApiException;
import com.weeklyplanning.web.rest.api.ApiModels;
import jakarta.validation.Valid;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weeks")
public class WeekResource {

    private final WeekService weekService;

    public WeekResource(WeekService weekService) {
        this.weekService = weekService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN, T(com.weeklyplanning.security.AuthoritiesConstants).VIEWER)")
    public ResponseEntity<ApiModels.WeeksPage> listWeeks(
        @RequestParam(name = "status", required = false) WeekStatus status,
        @RequestParam(name = "startDateFrom", required = false) LocalDate startDateFrom,
        @RequestParam(name = "startDateTo", required = false) LocalDate startDateTo,
        Pageable pageable
    ) {
        validatePageable(pageable);
        Page<WeekDTO> page = weekService.search(status, startDateFrom, startDateTo, pageable);
        List<ApiModels.Week> items = page.getContent().stream().map(this::toApiWeek).toList();
        ApiModels.WeeksPage body = new ApiModels.WeeksPage(items, toPageInfo(page));
        return ResponseEntity.ok(body);
    }

    @PostMapping
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.Week> createWeek(@Valid @RequestBody ApiModels.WeekUpsertRequest request) {
        WeekDTO weekDTO = toWeekDTO(request);
        WeekDTO created = weekService.save(weekDTO);
        return ResponseEntity.created(URI.create("/api/weeks/" + created.getId())).body(toApiWeek(created));
    }

    @GetMapping("/{weekId}")
    @PreAuthorize("hasAnyAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN, T(com.weeklyplanning.security.AuthoritiesConstants).VIEWER)")
    public ResponseEntity<ApiModels.Week> getWeek(@PathVariable UUID weekId) {
        WeekDTO week = weekService.findOne(weekId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Week not found"));
        return ResponseEntity.ok(toApiWeek(week));
    }

    @PutMapping("/{weekId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<ApiModels.Week> updateWeek(@PathVariable UUID weekId, @Valid @RequestBody ApiModels.WeekUpsertRequest request) {
        WeekDTO weekDTO = toWeekDTO(request);
        weekDTO.setId(weekId);
        WeekDTO updated = weekService.update(weekDTO);
        return ResponseEntity.ok(toApiWeek(updated));
    }

    @DeleteMapping("/{weekId}")
    @PreAuthorize("hasAuthority(T(com.weeklyplanning.security.AuthoritiesConstants).ADMIN)")
    public ResponseEntity<Void> deleteWeek(@PathVariable UUID weekId) {
        weekService.findOne(weekId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Week not found"));
        weekService.delete(weekId);
        return ResponseEntity.noContent().build();
    }

    private WeekDTO toWeekDTO(ApiModels.WeekUpsertRequest request) {
        WeekDTO dto = new WeekDTO();
        dto.setStartDate(request.startDate());
        dto.setEndDate(request.endDate());
        dto.setStatus(request.status());
        return dto;
    }

    private ApiModels.Week toApiWeek(WeekDTO dto) {
        return new ApiModels.Week(dto.getId(), dto.getStartDate(), dto.getEndDate(), dto.getStatus());
    }

    private ApiModels.PageInfo toPageInfo(Page<?> page) {
        List<ApiModels.SortInfo> sort = page
            .getSort()
            .stream()
            .map(order ->
                new ApiModels.SortInfo(
                    order.getProperty(),
                    order.isAscending() ? ApiModels.SortDirection.ASC : ApiModels.SortDirection.DESC
                )
            )
            .toList();
        return new ApiModels.PageInfo(page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages(), sort);
    }

    private void validatePageable(Pageable pageable) {
        if (pageable.getPageNumber() < 0 || pageable.getPageSize() < 1 || pageable.getPageSize() > 200) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid pagination parameters");
        }
    }
}
