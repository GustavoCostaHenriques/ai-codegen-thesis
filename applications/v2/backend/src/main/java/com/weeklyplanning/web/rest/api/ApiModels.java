package com.weeklyplanning.web.rest.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.weeklyplanning.domain.enumeration.AccountRole;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public final class ApiModels {

    private ApiModels() {}

    public record LoginRequest(@NotBlank @Size(min = 3, max = 50) String username, @NotBlank @Size(min = 8, max = 128) String password) {}

    public record AccountCreateRequest(
        @NotBlank @Size(min = 3, max = 50) String username,
        @NotBlank @Size(min = 8, max = 128) String password,
        @NotNull AccountRole role
    ) {}

    public record PersonUpsertRequest(
        @NotBlank @Size(min = 1, max = 100) String name,
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(min = 1, max = 50) String role,
        @NotNull PersonStatus status
    ) {}

    public record ProjectUpsertRequest(
        @NotBlank @Size(min = 1, max = 120) String name,
        @NotBlank @Size(min = 1, max = 20) String code,
        @NotNull UUID ownerId,
        @NotNull ProjectStatus status
    ) {}

    public record WeekUpsertRequest(@NotNull LocalDate startDate, @NotNull LocalDate endDate, @NotNull WeekStatus status) {}

    public record AddPersonToDayRequest(@NotNull UUID personId) {}

    public record AddProjectToPersonRequest(@NotNull UUID projectId) {}

    public record AddTaskRequest(@NotBlank @Size(min = 1, max = 1000) String description) {}

    public record AccountSummary(UUID id, String username, AccountRole role) {}

    public record LoginResponse(String accessToken, String tokenType, @JsonInclude(JsonInclude.Include.NON_NULL) Long expiresIn, AccountSummary account) {}

    public record AccountResponse(UUID id, String username, AccountRole role) {}

    public record Person(UUID id, String name, String email, String role, PersonStatus status) {}

    public record PersonSummary(UUID id, String name) {}

    public record Project(UUID id, String name, String code, PersonSummary owner, ProjectStatus status) {}

    public record ProjectSummary(UUID id, String name, String code) {}

    public record Week(UUID id, LocalDate startDate, LocalDate endDate, WeekStatus status) {}

    public record Task(UUID id, String description) {}

    public record DayPersonProject(ProjectSummary project, List<Task> tasks) {}

    public record DayPerson(PersonSummary person, List<DayPersonProject> projects) {}

    public record DayPlan(LocalDate date, List<DayPerson> people) {}

    public record WeekPlanning(UUID id, LocalDate startDate, LocalDate endDate, WeekStatus status, List<DayPlan> days) {}

    public enum SortDirection {
        ASC,
        DESC,
    }

    public record SortInfo(String property, SortDirection direction) {}

    public record PageInfo(int page, int size, long totalElements, int totalPages, @JsonInclude(JsonInclude.Include.NON_NULL) List<SortInfo> sort) {}

    public record PeoplePage(List<Person> items, PageInfo page) {}

    public record ProjectsPage(List<Project> items, PageInfo page) {}

    public record WeeksPage(List<Week> items, PageInfo page) {}

    public record FieldError(String field, String message) {}

    public record ErrorResponse(
        OffsetDateTime timestamp,
        int status,
        String error,
        String message,
        String path,
        @JsonInclude(JsonInclude.Include.NON_EMPTY) List<FieldError> details
    ) {}
}
