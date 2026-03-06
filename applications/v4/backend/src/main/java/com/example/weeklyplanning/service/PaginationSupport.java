package com.example.weeklyplanning.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PaginationSupport {

    public Pageable pageable(Integer page, Integer size, String sort, Sort defaultSort) {
        int safePage = page == null ? 0 : page;
        int safeSize = size == null ? 20 : size;
        Sort resolvedSort = resolveSort(sort, defaultSort);
        return PageRequest.of(safePage, safeSize, resolvedSort);
    }

    private Sort resolveSort(String rawSort, Sort defaultSort) {
        if (rawSort == null || rawSort.isBlank()) {
            return defaultSort;
        }

        String[] parts = rawSort.split(",");
        String property = parts[0].trim();

        Sort.Direction direction =
            parts.length > 1 && "desc".equalsIgnoreCase(parts[1].trim())
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        return Sort.by(new Sort.Order(direction, property));
    }

}
