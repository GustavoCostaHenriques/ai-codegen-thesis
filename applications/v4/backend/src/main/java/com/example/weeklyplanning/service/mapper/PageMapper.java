package com.example.weeklyplanning.service.mapper;

import com.example.weeklyplanning.service.dto.ApiSchemas;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PageMapper {

    public ApiSchemas.PageMetadata toMetadata(Page<?> page) {
        List<ApiSchemas.SortOrder> sortOrders = page.getSort().stream()
            .map(this::toSortOrder)
            .toList();

        return new ApiSchemas.PageMetadata(
            page.getNumber(),
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages(),
            sortOrders
        );
    }

    private ApiSchemas.SortOrder toSortOrder(Sort.Order order) {
        return new ApiSchemas.SortOrder(order.getProperty(), order.getDirection().name().toLowerCase());
    }
}
