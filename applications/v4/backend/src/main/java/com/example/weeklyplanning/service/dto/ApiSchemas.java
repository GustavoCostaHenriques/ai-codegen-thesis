package com.example.weeklyplanning.service.dto;

import com.example.weeklyplanning.domain.enumeration.AccountRole;
import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import com.example.weeklyplanning.domain.enumeration.ProjectStatus;
import com.example.weeklyplanning.domain.enumeration.WeekStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public final class ApiSchemas {

    private ApiSchemas() {
    }

    public record LoginRequest(
        @NotBlank @Size(min = 1, max = 128) String username,
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
        @NotBlank @Size(min = 1, max = 120) String name,
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
        Instant createdAt
    ) {
    }

    public record PasswordChangeRequest(
        @NotBlank @Size(min = 1, max = 128) String username,
        @NotBlank @Size(min = 8, max = 128) String currentPassword,
        @NotBlank @Size(min = 8, max = 128) String newPassword,
        @NotBlank @Size(min = 8, max = 128) String confirmNewPassword
    ) {
    }

    public record CreatePersonRequest(
        @NotBlank @Size(min = 1, max = 120) String name,
        @Size(min = 1, max = 128) String username,
        @NotBlank @Email @Size(max = 320) String email,
        @NotBlank @Size(min = 8, max = 128) String password,
        @NotNull AccountRole role,
        @NotNull PersonStatus status
    ) {
    }

    public record UpdatePersonRequest(
        @NotBlank @Size(min = 1, max = 120) String name,
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
        Instant createdAt,
        Instant updatedAt
    ) {
    }

    public record PersonPage(
        List<PersonSummary> content,
        PageMetadata page
    ) {
    }

    public record CreateProjectRequest(
        @NotBlank @Size(min = 1, max = 120) String name,
        @NotBlank @Size(min = 1, max = 40) String code,
        @NotNull ProjectStatus status
    ) {
    }

    public record UpdateProjectRequest(
        @NotBlank @Size(min = 1, max = 120) String name,
        @NotBlank @Size(min = 1, max = 40) String code,
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
        Instant createdAt,
        Instant updatedAt
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
        Instant createdAt,
        Instant updatedAt
    ) {
    }

    public record WeekPage(
        List<WeekSummary> content,
        PageMetadata page
    ) {
    }

    public record WeekPlanningBoard(
        WeekDetail week,
        List<DayPlan> dayPlans
    ) {
    }

    public record DayPlanCollection(
        UUID weekId,
        List<DayPlan> dayPlans
    ) {
    }

    public record DayPlan(
        UUID dayPlanId,
        UUID weekId,
        LocalDate date,
        DayOfWeek dayOfWeek,
        List<DayPerson> dayPersons
    ) {
    }

    public record DayPerson(
        UUID dayPersonId,
        PersonReference person,
        List<DayPersonProject> dayPersonProjects
    ) {
    }

    public record DayPersonProject(
        UUID dayPersonProjectId,
        ProjectReference project,
        List<Task> tasks
    ) {
    }

    public record Task(
        UUID taskId,
        String description,
        Instant createdAt,
        Instant updatedAt
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
        @NotBlank @Size(min = 1, max = 2000) String description
    ) {
    }

    public record PageMetadata(
        @Min(0) int page,
        @Min(1) @Max(100) int size,
        @Min(0) long totalElements,
        @Min(0) int totalPages,
        List<SortOrder> sort
    ) {
    }

    public record SortOrder(
        String property,
        String direction
    ) {
    }

    public record FieldError(
        String field,
        String message,
        String rejectedValue
    ) {
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record ErrorResponse(
        Instant timestamp,
        int status,
        String error,
        String code,
        String message,
        String path,
        List<FieldError> fieldErrors
    ) {
    }
}
