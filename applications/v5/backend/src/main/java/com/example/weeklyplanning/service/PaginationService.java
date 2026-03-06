package com.example.weeklyplanning.service;

import com.example.weeklyplanning.web.rest.errors.BadRequestException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class PaginationService {

    public Pageable toPageable(Integer page, Integer size, String sort, Set<String> allowedSortFields) {
        int safePage = page == null ? 0 : page;
        int safeSize = size == null ? 20 : size;

        if (safePage < 0) {
            throw new BadRequestException("Page index must be >= 0.");
        }
        if (safeSize < 1 || safeSize > 200) {
            throw new BadRequestException("Page size must be between 1 and 200.");
        }

        Sort sortSpec = parseSort(sort, allowedSortFields);
        return PageRequest.of(safePage, safeSize, sortSpec);
    }

    private Sort parseSort(String sort, Set<String> allowedSortFields) {

    if (sort == null || sort.isBlank()) {
        return Sort.unsorted();
    }

    String[] parts = sort.split(",", 2);

    if (parts.length != 2) {
        throw new BadRequestException("Invalid sort parameter format.");
    }

    String field = parts[0].trim();
    String direction = parts[1].trim();

    if (!allowedSortFields.contains(field)) {
        throw new BadRequestException("Sort field not allowed: " + field);
    }

    if (!direction.equalsIgnoreCase("asc") && !direction.equalsIgnoreCase("desc")) {
        throw new BadRequestException("Sort direction must be asc or desc.");
    }

    return Sort.by(new Sort.Order(Sort.Direction.fromString(direction), field));
}
}
