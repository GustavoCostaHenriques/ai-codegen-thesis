package com.example.weeklyplanning.service.mapper;

import com.example.weeklyplanning.domain.AccountEntity;
import com.example.weeklyplanning.domain.AccountRole;
import com.example.weeklyplanning.domain.DayProjectEntity;
import com.example.weeklyplanning.domain.PersonEntity;
import com.example.weeklyplanning.domain.PersonStatus;
import com.example.weeklyplanning.domain.PlanningAssignmentEntity;
import com.example.weeklyplanning.domain.ProjectEntity;
import com.example.weeklyplanning.domain.ProjectStatus;
import com.example.weeklyplanning.service.dto.DayProject;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ApiMapperTest {

    private final ApiMapper apiMapper = new ApiMapper();

    @Test
    void toDayProjectShouldExposeWholeTeamWhenViewerIsAssigned() {
        UUID viewerPersonId = UUID.randomUUID();

        PersonEntity administrator = person(
            UUID.randomUUID(),
            "Administrator",
            "admin@weekly.local",
            AccountRole.ADMIN
        );
        PersonEntity gustavo = person(
            viewerPersonId,
            "Gustavo",
            "gustavo@weekly.local",
            AccountRole.VIEWER
        );

        DayProjectEntity dayProject = dayProject("Medevac", "MD", List.of(
            assignment(administrator),
            assignment(gustavo)
        ));

        DayProject mapped = apiMapper.toDayProject(dayProject, viewerPersonId);

        assertEquals(2, mapped.assignments().size());
        assertEquals("Administrator", mapped.assignments().get(0).person().name());
        assertEquals("Gustavo", mapped.assignments().get(1).person().name());
    }

    @Test
    void toDayProjectShouldHideAssignmentsWhenViewerIsNotAssigned() {
        UUID viewerPersonId = UUID.randomUUID();

        PersonEntity administrator = person(
            UUID.randomUUID(),
            "Administrator",
            "admin@weekly.local",
            AccountRole.ADMIN
        );

        DayProjectEntity dayProject = dayProject("Medevac", "MD", List.of(assignment(administrator)));

        DayProject mapped = apiMapper.toDayProject(dayProject, viewerPersonId);

        assertEquals(0, mapped.assignments().size());
    }

    private DayProjectEntity dayProject(String name, String code, List<PlanningAssignmentEntity> assignments) {
        ProjectEntity project = new ProjectEntity();
        project.setName(name);
        project.setCode(code);
        project.setStatus(ProjectStatus.ACTIVE);

        DayProjectEntity dayProject = new DayProjectEntity();
        ReflectionTestUtils.setField(dayProject, "id", UUID.randomUUID());
        dayProject.setProject(project);
        dayProject.getAssignments().addAll(assignments);
        assignments.forEach(assignment -> assignment.setDayProject(dayProject));
        return dayProject;
    }

    private PlanningAssignmentEntity assignment(PersonEntity person) {
        PlanningAssignmentEntity assignment = new PlanningAssignmentEntity();
        ReflectionTestUtils.setField(assignment, "id", UUID.randomUUID());
        assignment.setPerson(person);
        assignment.setEstimatedHours(0.0);
        assignment.setActualHours(null);
        return assignment;
    }

    private PersonEntity person(UUID id, String name, String email, AccountRole role) {
        AccountEntity account = new AccountEntity();
        account.setEmail(email);
        account.setRole(role);

        PersonEntity person = new PersonEntity();
        ReflectionTestUtils.setField(person, "id", id);
        person.setAccount(account);
        person.setName(name);
        person.setStatus(PersonStatus.ACTIVE);
        return person;
    }
}
