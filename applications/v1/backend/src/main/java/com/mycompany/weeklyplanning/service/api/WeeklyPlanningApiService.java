package com.mycompany.weeklyplanning.service.api;

import com.mycompany.weeklyplanning.domain.AppUserEntity;
import com.mycompany.weeklyplanning.domain.ProjectEntity;
import com.mycompany.weeklyplanning.repository.AppUserRepository;
import com.mycompany.weeklyplanning.repository.DayUserProjectRepository;
import com.mycompany.weeklyplanning.repository.DayUserRepository;
import com.mycompany.weeklyplanning.repository.ProjectRepository;
import com.mycompany.weeklyplanning.service.api.dto.PageMetadata;
import com.mycompany.weeklyplanning.service.api.dto.Project;
import com.mycompany.weeklyplanning.service.api.dto.ProjectCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.ProjectStatus;
import com.mycompany.weeklyplanning.service.api.dto.ProjectSummary;
import com.mycompany.weeklyplanning.service.api.dto.ProjectUpdateRequest;
import com.mycompany.weeklyplanning.service.api.dto.ProjectsPage;
import com.mycompany.weeklyplanning.service.api.dto.User;
import com.mycompany.weeklyplanning.service.api.dto.UserCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.UserRole;
import com.mycompany.weeklyplanning.service.api.dto.UserStatus;
import com.mycompany.weeklyplanning.service.api.dto.UserSummary;
import com.mycompany.weeklyplanning.service.api.dto.UserUpdateRequest;
import com.mycompany.weeklyplanning.service.api.dto.UsersPage;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WeeklyPlanningApiService {

    private final AppUserRepository appUserRepository;
    private final DayUserRepository dayUserRepository;
    private final ProjectRepository projectRepository;
    private final DayUserProjectRepository dayUserProjectRepository;
    private final int taskMinLength;

    public WeeklyPlanningApiService(
        AppUserRepository appUserRepository,
        DayUserRepository dayUserRepository,
        ProjectRepository projectRepository,
        DayUserProjectRepository dayUserProjectRepository,
        @Value("${application.planning.task-min-length:3}") int taskMinLength
    ) {
        this.appUserRepository = appUserRepository;
        this.dayUserRepository = dayUserRepository;
        this.projectRepository = projectRepository;
        this.dayUserProjectRepository = dayUserProjectRepository;
        this.taskMinLength = taskMinLength;
    }

    @Transactional(readOnly = true)
    public UsersPage listUsers(Integer page, Integer size, String sort) {
        Pageable pageable = toPageable(page, size, sort, Set.of("id", "name", "email"), "id");
        Page<AppUserEntity> result = appUserRepository.findAll(pageable);

        List<User> items = result.getContent().stream().map(this::toUser).toList();
        return new UsersPage().items(items).page(toPageMetadata(result));
    }

    public User createUser(UserCreateRequest request) {
        String email = request.getEmail();
        if (appUserRepository.existsByEmailIgnoreCase(email)) {
            throw new ApiConflictException("A user with this email already exists", List.of(new ApiFieldError("email", "already exists")));
        }

        AppUserEntity entity = new AppUserEntity()
            .name(request.getName())
            .email(email)
            .role(request.getRole())
            .status(request.getStatus() != null ? request.getStatus() : UserStatus.ACTIVE);

        entity = appUserRepository.save(entity);
        return toUser(entity);
    }

    @Transactional(readOnly = true)
    public User getUser(UUID userId) {
        AppUserEntity entity = appUserRepository.findById(ApiIdCodec.toLong(userId)).orElseThrow(() -> new ApiNotFoundException("User not found"));
        return toUser(entity);
    }

    public User updateUser(UUID userId, UserUpdateRequest request) {
        Long id = ApiIdCodec.toLong(userId);
        AppUserEntity entity = appUserRepository.findById(id).orElseThrow(() -> new ApiNotFoundException("User not found"));

        String email = request.getEmail();
        if (appUserRepository.existsByEmailIgnoreCaseAndIdNot(email, id)) {
            throw new ApiConflictException("A user with this email already exists", List.of(new ApiFieldError("email", "already exists")));
        }

        entity
            .name(request.getName())
            .email(email)
            .role(request.getRole())
            .status(request.getStatus() != null ? request.getStatus() : (entity.getStatus() != null ? entity.getStatus() : UserStatus.ACTIVE));

        entity = appUserRepository.save(entity);
        return toUser(entity);
    }

    public void deleteUser(UUID userId) {
        Long id = ApiIdCodec.toLong(userId);
        if (!appUserRepository.existsById(id)) {
            throw new ApiNotFoundException("User not found");
        }
        if (dayUserRepository.existsByUserId(id)) {
            throw new ApiConflictException("User is assigned to at least one day and cannot be deleted");
        }
        appUserRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public ProjectsPage listProjects(Integer page, Integer size, String sort) {
        Pageable pageable = toPageable(page, size, sort, Set.of("id", "name", "code", "status"), "id");
        Page<ProjectEntity> result = projectRepository.findAll(pageable);

        List<Project> items = result.getContent().stream().map(this::toProject).toList();
        return new ProjectsPage().items(items).page(toPageMetadata(result));
    }

    public Project createProject(ProjectCreateRequest request) {
        String code = request.getCode();
        if (projectRepository.existsByCodeIgnoreCase(code)) {
            throw new ApiConflictException("A project with this code already exists", List.of(new ApiFieldError("code", "already exists")));
        }

        ProjectEntity entity = new ProjectEntity()
            .name(request.getName())
            .code(code)
            .status(request.getStatus() != null ? request.getStatus() : ProjectStatus.ACTIVE);

        entity = projectRepository.save(entity);
        return toProject(entity);
    }

    @Transactional(readOnly = true)
    public Project getProject(UUID projectId) {
        ProjectEntity entity = projectRepository
            .findById(ApiIdCodec.toLong(projectId))
            .orElseThrow(() -> new ApiNotFoundException("Project not found"));
        return toProject(entity);
    }

    public Project updateProject(UUID projectId, ProjectUpdateRequest request) {
        Long id = ApiIdCodec.toLong(projectId);
        ProjectEntity entity = projectRepository.findById(id).orElseThrow(() -> new ApiNotFoundException("Project not found"));

        String code = request.getCode();
        if (projectRepository.existsByCodeIgnoreCaseAndIdNot(code, id)) {
            throw new ApiConflictException("A project with this code already exists", List.of(new ApiFieldError("code", "already exists")));
        }

        entity.name(request.getName()).code(code).status(request.getStatus());
        entity = projectRepository.save(entity);
        return toProject(entity);
    }

    public void deleteProject(UUID projectId) {
        Long id = ApiIdCodec.toLong(projectId);
        if (!projectRepository.existsById(id)) {
            throw new ApiNotFoundException("Project not found");
        }
        if (dayUserProjectRepository.existsByProjectId(id)) {
            throw new ApiConflictException("Project is assigned to at least one day and cannot be deleted");
        }
        projectRepository.deleteById(id);
    }

    private Pageable toPageable(Integer page, Integer size, String sort, Set<String> allowedProperties, String defaultSortProperty) {
        int p = page != null ? page : 0;
        int s = size != null ? size : 20;
        Sort springSort = parseSort(sort, allowedProperties, defaultSortProperty);
        return PageRequest.of(p, s, springSort);
    }

    private Sort parseSort(String sort, Set<String> allowedProperties, String defaultSortProperty) {
        if (sort == null || sort.isBlank()) {
            return Sort.by(Sort.Order.asc(defaultSortProperty));
        }
        String[] criteria = sort.split(";");
        List<Sort.Order> orders = new ArrayList<>();
        for (String c : criteria) {
            String trimmed = c.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            String[] parts = trimmed.split(",", 2);
            String property = parts[0].trim();
            if (!allowedProperties.contains(property)) {
                continue;
            }
            boolean desc = parts.length == 2 && "desc".equalsIgnoreCase(parts[1].trim());
            orders.add(desc ? Sort.Order.desc(property) : Sort.Order.asc(property));
        }
        return orders.isEmpty() ? Sort.by(Sort.Order.asc(defaultSortProperty)) : Sort.by(orders);
    }

    private PageMetadata toPageMetadata(Page<?> page) {
        return new PageMetadata()
            .page(page.getNumber())
            .size(page.getSize())
            .totalElements(Math.toIntExact(page.getTotalElements()))
            .totalPages(page.getTotalPages());
    }

    private User toUser(AppUserEntity entity) {
        UUID id = ApiIdCodec.toUuid(entity.getId());
        String email = entity.getEmail() != null ? entity.getEmail() : ("unknown+" + id + "@example.invalid");
        UserRole role = entity.getRole() != null ? entity.getRole() : UserRole.USER;
        UserStatus status = entity.getStatus() != null ? entity.getStatus() : UserStatus.ACTIVE;
        return new User().id(id).name(entity.getName()).email(email).role(role).status(status);
    }

    private UserSummary toUserSummary(AppUserEntity entity) {
        UUID id = ApiIdCodec.toUuid(entity.getId());
        String email = entity.getEmail() != null ? entity.getEmail() : ("unknown+" + id + "@example.invalid");
        return new UserSummary().id(id).name(entity.getName()).email(email);
    }

    private Project toProject(ProjectEntity entity) {
        Project project = new Project()
            .id(ApiIdCodec.toUuid(entity.getId()))
            .name(entity.getName())
            .code(entity.getCode() != null ? entity.getCode() : ("P-" + entity.getId()))
            .status(entity.getStatus() != null ? entity.getStatus() : ProjectStatus.ACTIVE);

        if (entity.getOwner() != null) {
            project.owner(toUserSummary(entity.getOwner()));
        }
        return project;
    }

    private ProjectSummary toProjectSummary(ProjectEntity entity) {
        return new ProjectSummary()
            .id(ApiIdCodec.toUuid(entity.getId()))
            .name(entity.getName())
            .code(entity.getCode() != null ? entity.getCode() : ("P-" + entity.getId()))
            .status(entity.getStatus() != null ? entity.getStatus() : ProjectStatus.ACTIVE);
    }
}
