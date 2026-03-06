package com.weeklyplanning.service.mapper;

import com.weeklyplanning.service.dto.ApiDtos;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public final class PageMapper {

    private PageMapper() {
    }

    public static ApiDtos.PageMetadata toPageMetadata(Page<?> page) {
        List<ApiDtos.SortOrder> sortOrders = page.getSort().stream()
            .map(PageMapper::toSortOrder)
            .toList();

        return new ApiDtos.PageMetadata(
            page.getNumber(),
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages(),
            sortOrders
        );
    }

    private static ApiDtos.SortOrder toSortOrder(Sort.Order order) {
        return new ApiDtos.SortOrder(order.getProperty(), order.getDirection().name().toLowerCase());
    }
}
