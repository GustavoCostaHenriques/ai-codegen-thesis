package com.weeklyplanning.web.rest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.weeklyplanning.domain.DayPerson;
import com.weeklyplanning.domain.DayPersonProject;
import com.weeklyplanning.domain.Person;
import com.weeklyplanning.domain.Project;
import com.weeklyplanning.domain.Task;
import com.weeklyplanning.domain.Week;
import com.weeklyplanning.domain.enumeration.AccountRole;
import com.weeklyplanning.domain.enumeration.PersonStatus;
import com.weeklyplanning.domain.enumeration.ProjectStatus;
import com.weeklyplanning.domain.enumeration.WeekStatus;
import com.weeklyplanning.service.AccountService;
import com.weeklyplanning.service.DayPersonProjectService;
import com.weeklyplanning.service.DayPersonService;
import com.weeklyplanning.service.DayPlanService;
import com.weeklyplanning.service.PersonService;
import com.weeklyplanning.service.ProjectService;
import com.weeklyplanning.service.TaskService;
import com.weeklyplanning.service.WeekService;
import com.weeklyplanning.service.dto.AccountCreateDTO;
import com.weeklyplanning.service.dto.AccountDTO;
import com.weeklyplanning.service.dto.PersonDTO;
import com.weeklyplanning.service.dto.ProjectDTO;
import com.weeklyplanning.service.dto.WeekDTO;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = { AuthenticateController.class, AccountResource.class, PersonResource.class, ProjectResource.class, WeekResource.class, PlanningResource.class })
@AutoConfigureMockMvc(addFilters = false)
class OpenApiControllerMappingsTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AccountService accountService;

    @MockBean
    private PersonService personService;

    @MockBean
    private ProjectService projectService;

    @MockBean
    private WeekService weekService;

    @MockBean
    private DayPlanService dayPlanService;

    @MockBean
    private DayPersonService dayPersonService;

    @MockBean
    private DayPersonProjectService dayPersonProjectService;

    @MockBean
    private TaskService taskService;

    @MockBean
    private JwtEncoder jwtEncoder;

    @MockBean
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    @BeforeEach
    void setUp() throws Exception {
        AccountDTO account = new AccountDTO();
        account.setId(UUID.randomUUID());
        account.setUsername("admin");
        account.setRole(AccountRole.ADMIN);

        when(accountService.create(any(AccountCreateDTO.class))).thenReturn(account);
        when(accountService.findByUsername(eq("admin"))).thenReturn(Optional.of(account));
        when(jwtEncoder.encode(any(JwtEncoderParameters.class)))
            .thenReturn(
                new Jwt(
                    "token-123",
                    Instant.now(),
                    Instant.now().plusSeconds(3600),
                    Map.of("alg", "HS512"),
                    Map.of("sub", "admin", "auth", "ROLE_ADMIN")
                )
            );

        Authentication authentication = org.mockito.Mockito.mock(Authentication.class);
        when(authentication.getName()).thenReturn("admin");
        org.mockito.Mockito.doReturn(List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))).when(authentication).getAuthorities();

        AuthenticationManager authenticationManager = org.mockito.Mockito.mock(AuthenticationManager.class);
        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(authentication);
        when(authenticationManagerBuilder.getObject()).thenReturn(authenticationManager);
    }

    @Test
    void allOpenApiPathsAreCallable() throws Exception {
        UUID personId = UUID.randomUUID();
        UUID projectId = UUID.randomUUID();
        UUID weekId = UUID.randomUUID();
        UUID taskId = UUID.randomUUID();
        LocalDate day = LocalDate.of(2026, 3, 3);

        PersonDTO personDTO = new PersonDTO();
        personDTO.setId(personId);
        personDTO.setName("Ana");
        personDTO.setEmail("ana@weeklyplanning.local");
        personDTO.setRole("Engineer");
        personDTO.setStatus(PersonStatus.ACTIVE);

        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(projectId);
        projectDTO.setName("Contract");
        projectDTO.setCode("CNT");
        projectDTO.setStatus(ProjectStatus.ACTIVE);
        projectDTO.setOwner(personDTO);

        WeekDTO weekDTO = new WeekDTO();
        weekDTO.setId(weekId);
        weekDTO.setStartDate(LocalDate.of(2026, 3, 2));
        weekDTO.setEndDate(LocalDate.of(2026, 3, 6));
        weekDTO.setStatus(WeekStatus.PLANNED);

        when(personService.search(any(), any(), any())).thenReturn(new PageImpl<>(List.of(personDTO), PageRequest.of(0, 20), 1));
        when(personService.save(any(PersonDTO.class))).thenReturn(personDTO);
        when(personService.findOne(eq(personId))).thenReturn(Optional.of(personDTO));
        when(personService.update(any(PersonDTO.class))).thenReturn(personDTO);

        when(projectService.search(any(), any(), any(), any())).thenReturn(new PageImpl<>(List.of(projectDTO), PageRequest.of(0, 20), 1));
        when(projectService.save(any(ProjectDTO.class))).thenReturn(projectDTO);
        when(projectService.findOne(eq(projectId))).thenReturn(Optional.of(projectDTO));
        when(projectService.update(any(ProjectDTO.class))).thenReturn(projectDTO);

        when(weekService.search(any(), any(), any(), any())).thenReturn(new PageImpl<>(List.of(weekDTO), PageRequest.of(0, 20), 1));
        when(weekService.save(any(WeekDTO.class))).thenReturn(weekDTO);
        when(weekService.findOne(eq(weekId))).thenReturn(Optional.of(weekDTO));
        when(weekService.update(any(WeekDTO.class))).thenReturn(weekDTO);

        Week week = new Week();
        week.setId(weekId);
        week.setStartDate(weekDTO.getStartDate());
        week.setEndDate(weekDTO.getEndDate());
        week.setStatus(WeekStatus.PLANNED);
        when(dayPlanService.getWeekOrThrow(eq(weekId))).thenReturn(week);
        when(dayPlanService.findPlanningDays(eq(weekId))).thenReturn(List.of());

        Person person = new Person();
        person.setId(personId);
        person.setName("Ana");
        DayPerson dayPerson = new DayPerson();
        dayPerson.setPerson(person);
        dayPerson.setProjects(java.util.Collections.emptySet());
        when(dayPersonService.addPersonToDay(eq(weekId), eq(day), eq(personId))).thenReturn(dayPerson);

        Project project = new Project();
        project.setId(projectId);
        project.setName("Contract");
        project.setCode("CNT");
        DayPersonProject dayPersonProject = new DayPersonProject();
        dayPersonProject.setProject(project);
        dayPersonProject.setTasks(java.util.Collections.emptySet());
        when(dayPersonProjectService.addProjectToPerson(eq(weekId), eq(day), eq(personId), eq(projectId))).thenReturn(dayPersonProject);

        Task task = new Task();
        task.setId(taskId);
        task.setDescription("Task");
        when(taskService.addTaskToProject(eq(weekId), eq(day), eq(personId), eq(projectId), any())).thenReturn(task);

        mockMvc
            .perform(post("/api/accounts").contentType(MediaType.APPLICATION_JSON).content("{\"username\":\"admin\",\"password\":\"Password123!\",\"role\":\"ADMIN\"}"))
            .andExpect(status().isCreated());
        mockMvc
            .perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content("{\"username\":\"admin\",\"password\":\"Password123!\"}"))
            .andExpect(status().isOk());

        mockMvc.perform(get("/api/people")).andExpect(status().isOk());
        mockMvc
            .perform(post("/api/people").contentType(MediaType.APPLICATION_JSON).content("{\"name\":\"Ana\",\"email\":\"ana@weeklyplanning.local\",\"role\":\"Engineer\",\"status\":\"ACTIVE\"}"))
            .andExpect(status().isCreated());
        mockMvc.perform(get("/api/people/{personId}", personId)).andExpect(status().isOk());
        mockMvc
            .perform(put("/api/people/{personId}", personId).contentType(MediaType.APPLICATION_JSON).content("{\"name\":\"Ana\",\"email\":\"ana@weeklyplanning.local\",\"role\":\"Engineer\",\"status\":\"ACTIVE\"}"))
            .andExpect(status().isOk());
        mockMvc.perform(delete("/api/people/{personId}", personId)).andExpect(status().isNoContent());

        mockMvc.perform(get("/api/projects")).andExpect(status().isOk());
        mockMvc
            .perform(
                post("/api/projects")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"name\":\"Contract\",\"code\":\"CNT\",\"ownerId\":\"" + personId + "\",\"status\":\"ACTIVE\"}")
            )
            .andExpect(status().isCreated());
        mockMvc.perform(get("/api/projects/{projectId}", projectId)).andExpect(status().isOk());
        mockMvc
            .perform(
                put("/api/projects/{projectId}", projectId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"name\":\"Contract\",\"code\":\"CNT\",\"ownerId\":\"" + personId + "\",\"status\":\"ACTIVE\"}")
            )
            .andExpect(status().isOk());
        mockMvc.perform(delete("/api/projects/{projectId}", projectId)).andExpect(status().isNoContent());

        mockMvc.perform(get("/api/weeks")).andExpect(status().isOk());
        mockMvc
            .perform(post("/api/weeks").contentType(MediaType.APPLICATION_JSON).content("{\"startDate\":\"2026-03-02\",\"endDate\":\"2026-03-06\",\"status\":\"PLANNED\"}"))
            .andExpect(status().isCreated());
        mockMvc.perform(get("/api/weeks/{weekId}", weekId)).andExpect(status().isOk());
        mockMvc
            .perform(put("/api/weeks/{weekId}", weekId).contentType(MediaType.APPLICATION_JSON).content("{\"startDate\":\"2026-03-02\",\"endDate\":\"2026-03-06\",\"status\":\"PLANNED\"}"))
            .andExpect(status().isOk());
        mockMvc.perform(delete("/api/weeks/{weekId}", weekId)).andExpect(status().isNoContent());

        mockMvc.perform(get("/api/weeks/{weekId}/planning", weekId)).andExpect(status().isOk());
        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/people", weekId, day)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"personId\":\"" + personId + "\"}")
            )
            .andExpect(status().isCreated());
        mockMvc.perform(delete("/api/weeks/{weekId}/days/{date}/people/{personId}", weekId, day, personId)).andExpect(status().isNoContent());
        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/people/{personId}/projects", weekId, day, personId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"projectId\":\"" + projectId + "\"}")
            )
            .andExpect(status().isCreated());
        mockMvc
            .perform(delete("/api/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}", weekId, day, personId, projectId))
            .andExpect(status().isNoContent());
        mockMvc
            .perform(
                post("/api/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}/tasks", weekId, day, personId, projectId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"description\":\"Task\"}")
            )
            .andExpect(status().isCreated());
        mockMvc
            .perform(delete("/api/weeks/{weekId}/days/{date}/people/{personId}/projects/{projectId}/tasks/{taskId}", weekId, day, personId, projectId, taskId))
            .andExpect(status().isNoContent());
    }
}
