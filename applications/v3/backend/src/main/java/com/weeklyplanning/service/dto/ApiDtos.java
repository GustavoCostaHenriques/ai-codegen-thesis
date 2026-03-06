package com.weeklyplanning.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.weeklyplanning.domain.enumeration.AccountRole;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public final class ApiDtos {

    private ApiDtos() {
    }

    public record LoginRequest(
        @NotBlank @Size(max = 128) String username,
        @NotBlank @Size(min = 8, max = 128) String password
    ) {
    }

    public record LoginResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        AuthenticatedAccount account
    ) {
    }

    public record AuthenticatedAccount(
        UUID accountId,
        UUID personId,
        String username,
        String name,
        String email,
        AccountRole role,
        PersonStatus status
    ) {
    }

    public record AccountRegistrationRequest(
        @NotBlank @Size(max = 120) String name,
        @Size(min = 1, max = 128) String username,
        @NotBlank @Email @Size(max = 320) String email,
        @NotBlank @Size(min = 8, max = 128) String password
    ) {
    }

    public record AccountRegistrationResponse(
        UUID accountId,
        UUID personId,
        String username,
        String name,
        String email,
        AccountRole role,
        PersonStatus status,
        OffsetDateTime createdAt
    ) {
    }

    public record PasswordChangeRequest(
        @NotBlank @Size(max = 128) String username,
        @NotBlank @Size(min = 8, max = 128) String currentPassword,
        @NotBlank @Size(min = 8, max = 128) String newPassword,
        @NotBlank @Size(min = 8, max = 128) String confirmNewPassword
    ) {
    }

    public record CreatePersonRequest(
        @NotBlank @Size(max = 120) String name,
        @Size(min = 1, max = 128) String username,
        @NotBlank @Email @Size(max = 320) String email,
        @NotBlank @Size(min = 8, max = 128) String password,
        @NotNull AccountRole role,
        @NotNull PersonStatus status
    ) {
    }

    public record UpdatePersonRequest(
        @NotBlank @Size(max = 120) String name,
        @Size(min = 1, max = 128) String username,
        @NotBlank @Email @Size(max = 320) String email,
        @NotNull AccountRole role,
        @NotNull PersonStatus status
    ) {
    }

    public record PersonSummary(
        UUID personId,
        UUID accountId,
        String username,
        String name,
        String email,
        AccountRole role,
        PersonStatus status
    ) {
    }

    public record PersonDetail(
        UUID personId,
        UUID accountId,
        String username,
        String name,
        String email,
        AccountRole role,
        PersonStatus status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
    ) {
    }

    public record PersonPage(
        List<PersonSummary> content,
        PageMetadata page
    ) {
    }

    public record CreateProjectRequest(
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Size(max = 40) String code,
        @NotNull ProjectStatus status
    ) {
    }

    public record UpdateProjectRequest(
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Size(max = 40) String code,
        @NotNull ProjectStatus status
    ) {
    }

    public record ProjectSummary(
        UUID projectId,
        String name,
        String code,
        ProjectStatus status
    ) {
    }

    public record ProjectDetail(
        UUID projectId,
        String name,
        String code,
        ProjectStatus status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
    ) {
    }

    public record ProjectPage(
        List<ProjectSummary> content,
        PageMetadata page
    ) {
    }

    public record CreateWeekRequest(
        @NotNull LocalDate weekStart,
        @NotNull LocalDate weekEnd,
        WeekStatus status
    ) {
    }

    public record UpdateWeekRequest(
        @NotNull LocalDate weekStart,
        @NotNull LocalDate weekEnd,
        @NotNull WeekStatus status
    ) {
    }

    public record WeekSummary(
        UUID weekId,
        LocalDate weekStart,
        LocalDate weekEnd,
        WeekStatus status
    ) {
    }

    public record WeekDetail(
        UUID weekId,
        LocalDate weekStart,
        LocalDate weekEnd,
        WeekStatus status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
    ) {
    }

    public record WeekPage(
        List<WeekSummary> content,
        PageMetadata page
    ) {
    }

    public record WeekPlanningBoard(
        WeekDetail week,
        List<DayPlanResponse> dayPlans
    ) {
    }

    public record DayPlanCollection(
        UUID weekId,
        List<DayPlanResponse> dayPlans
    ) {
    }

    public record DayPlanResponse(
        UUID dayPlanId,
        UUID weekId,
        LocalDate date,
        DayOfWeek dayOfWeek,
        List<DayPersonResponse> dayPersons
    ) {
    }

    public record DayPersonResponse(
        UUID dayPersonId,
        PersonReference person,
        List<DayPersonProjectResponse> dayPersonProjects
    ) {
    }

    public record DayPersonProjectResponse(
        UUID dayPersonProjectId,
        ProjectReference project,
        List<TaskResponse> tasks
    ) {
    }

    public record TaskResponse(
        UUID taskId,
        String description,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
    ) {
    }

    public record PersonReference(
        UUID personId,
        String name,
        String email,
        PersonStatus status
    ) {
    }

    public record ProjectReference(
        UUID projectId,
        String name,
        String code,
        ProjectStatus status
    ) {
    }

    public record AddPersonToDayRequest(
        @NotNull UUID personId
    ) {
    }

    public record AddProjectToDayPersonRequest(
        @NotNull UUID projectId
    ) {
    }

    public record AddTaskRequest(
        @NotBlank @Size(max = 2000) String description
    ) {
    }

    public record PageMetadata(
        int page,
        int size,
        long totalElements,
        int totalPages,
        List<SortOrder> sort
    ) {
    }

    public record SortOrder(
        String property,
        String direction
    ) {
    }

    public record FieldErrorResponse(
        String field,
        String message,
        @JsonInclude(JsonInclude.Include.ALWAYS) String rejectedValue
    ) {
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record ErrorResponse(
        OffsetDateTime timestamp,
        int status,
        String error,
        String code,
        String message,
        String path,
        List<FieldErrorResponse> fieldErrors
    ) {
    }
}
