package com.weeklyplanning.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.weeklyplanning.domain.Project;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.repository.DayPersonProjectRepository;
import com.weeklyplanning.repository.ProjectRepository;
import com.weeklyplanning.service.dto.ApiDtos;
import com.weeklyplanning.service.exception.ConflictException;
import com.weeklyplanning.service.exception.NotFoundException;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private DayPersonProjectRepository dayPersonProjectRepository;

    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        projectService = new ProjectService(projectRepository, dayPersonProjectRepository);
    }

    @Test
    void createProjectShouldRejectDuplicateCode() {
        ApiDtos.CreateProjectRequest request = new ApiDtos.CreateProjectRequest("Atlas", "ATLS", ProjectStatus.ACTIVE);
        when(projectRepository.existsByCodeIgnoreCase("ATLS")).thenReturn(true);

        assertThrows(ConflictException.class, () -> projectService.createProject(request));
    }

    @Test
    void createProjectShouldPersistProject() {
        ApiDtos.CreateProjectRequest request = new ApiDtos.CreateProjectRequest("Atlas", "ATLS", ProjectStatus.ACTIVE);

        when(projectRepository.existsByCodeIgnoreCase("ATLS")).thenReturn(false);
        when(projectRepository.save(any(Project.class))).thenAnswer(invocation -> {
            Project entity = invocation.getArgument(0);
            entity.setId(UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"));
            entity.setCreatedAt(OffsetDateTime.now());
            entity.setUpdatedAt(OffsetDateTime.now());
            return entity;
        });

        ApiDtos.ProjectDetail result = projectService.createProject(request);

        assertEquals("Atlas", result.name());
        assertEquals("ATLS", result.code());
        assertEquals(ProjectStatus.ACTIVE, result.status());
        verify(projectRepository).save(any(Project.class));
    }

    @Test
    void deleteProjectShouldFailWhenNotFound() {
        UUID projectId = UUID.randomUUID();
        when(projectRepository.findById(projectId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> projectService.deleteProject(projectId));
    }

    @Test
    void deleteProjectShouldRejectWhenAssignedInPlanning() {
        UUID projectId = UUID.randomUUID();
        Project project = Project.builder().id(projectId).name("P").code("C").status(ProjectStatus.ACTIVE).build();

        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(dayPersonProjectRepository.existsByProjectId(projectId)).thenReturn(true);

        assertThrows(ConflictException.class, () -> projectService.deleteProject(projectId));
    }
}
