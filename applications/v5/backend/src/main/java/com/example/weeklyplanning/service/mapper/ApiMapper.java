package com.example.weeklyplanning.service.mapper;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.DayPlanEntity;
import com.example.weeklyplanning.domain.DayProjectEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PlanningAssignmentEntity;
import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.domain.TaskEntity;
import com.example.weeklyplanning.domain.WeekEntity;
import com.example.weeklyplanning.service.dto.AuthenticatedUser;
import com.example.weeklyplanning.service.dto.DayPlan;
import com.example.weeklyplanning.service.dto.DayProject;
import com.example.weeklyplanning.service.dto.PageMetadata;
import com.example.weeklyplanning.service.dto.Person;
import com.example.weeklyplanning.service.dto.PersonSummary;
import com.example.weeklyplanning.service.dto.PlanningAssignment;
import com.example.weeklyplanning.service.dto.Project;
import com.example.weeklyplanning.service.dto.ProjectSummary;
import com.example.weeklyplanning.service.dto.Task;
import com.example.weeklyplanning.service.dto.Week;
import com.example.weeklyplanning.service.dto.WeekSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Component
public class ApiMapper {

    public AuthenticatedUser toAuthenticatedUser(AccountEntity account, PersonEntity person) {
        return new AuthenticatedUser(
            account.getId(),
            person.getId(),
            person.getName(),
            account.getUsername(),
            account.getEmail(),
            account.getRole(),
            person.getStatus()
        );
    }

    public Person toPerson(PersonEntity person) {
        return new Person(
            person.getId(),
            person.getAccount().getId(),
            person.getName(),
            person.getAccount().getUsername(),
            person.getAccount().getEmail(),
            person.getAccount().getRole(),
            person.getStatus(),
            person.getCreatedAt(),
            person.getUpdatedAt()
        );
    }

    public PersonSummary toPersonSummary(PersonEntity person) {
        return new PersonSummary(
            person.getId(),
            person.getName(),
            person.getAccount().getEmail(),
            person.getAccount().getRole(),
            person.getStatus()
        );
    }

    public Project toProject(ProjectEntity project) {
        return new Project(
            project.getId(),
            project.getName(),
            project.getCode(),
            project.getStatus(),
            project.getCreatedAt(),
            project.getUpdatedAt()
        );
    }

    public ProjectSummary toProjectSummary(ProjectEntity project) {
        return new ProjectSummary(project.getId(), project.getName(), project.getCode(), project.getStatus());
    }

    public Week toWeek(WeekEntity week) {
        return new Week(
            week.getId(),
            week.getCode(),
            week.getWeekStart(),
            week.getWeekEnd(),
            week.getStatus(),
            week.getCreatedAt(),
            week.getUpdatedAt()
        );
    }

    public WeekSummary toWeekSummary(WeekEntity week) {
        return new WeekSummary(week.getId(), week.getCode(), week.getWeekStart(), week.getWeekEnd(), week.getStatus());
    }

    public DayPlan toDayPlan(DayPlanEntity entity, UUID viewerPersonId) {
        List<DayProject> projects = entity.getProjects().stream()
            .sorted(Comparator.comparing(dp -> dp.getProject().getCode(), String.CASE_INSENSITIVE_ORDER))
            .map(dayProject -> toDayProject(dayProject, viewerPersonId))
            .toList();

        return new DayPlan(entity.getId(), entity.getDayOfWeek(), entity.getDate(), projects);
    }

    public DayProject toDayProject(DayProjectEntity entity, UUID viewerPersonId) {
        List<PlanningAssignment> assignments = entity.getAssignments().stream()
            .filter(assignment -> viewerPersonId == null || assignment.getPerson().getId().equals(viewerPersonId))
            .sorted(Comparator.comparing(assignment -> assignment.getPerson().getName(), String.CASE_INSENSITIVE_ORDER))
            .map(this::toPlanningAssignment)
            .toList();

        return new DayProject(entity.getId(), toProjectSummary(entity.getProject()), assignments);
    }

    public PlanningAssignment toPlanningAssignment(PlanningAssignmentEntity entity) {
        List<Task> tasks = entity.getTasks().stream()
            .sorted(Comparator.comparing(TaskEntity::getCreatedAt))
            .map(this::toTask)
            .toList();

        return new PlanningAssignment(
            entity.getId(),
            toPersonSummary(entity.getPerson()),
            entity.getEstimatedHours(),
            entity.getActualHours(),
            tasks
        );
    }

    public Task toTask(TaskEntity entity) {
        return new Task(entity.getId(), entity.getDescription(), entity.getCreatedAt(), entity.getUpdatedAt());
    }

    public PageMetadata toPageMetadata(Page<?> page) {
        List<String> sort = page.getSort().stream()
            .map(order -> order.getProperty() + "," + order.getDirection().name().toLowerCase())
            .toList();

        return new PageMetadata(
            page.getNumber(),
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages(),
            sort.isEmpty() ? null : sort,
            page.hasNext(),
            page.hasPrevious()
        );
    }
}
