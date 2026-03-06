package com.mycompany.weeklyplanning.web.api;

import com.mycompany.weeklyplanning.service.api.WeeklyPlanningWeekApiService;
import com.mycompany.weeklyplanning.service.api.dto.DayPlan;
import com.mycompany.weeklyplanning.service.api.dto.DayPlansList;
import com.mycompany.weeklyplanning.service.api.dto.DayUser;
import com.mycompany.weeklyplanning.service.api.dto.DayUserCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.DayUserProject;
import com.mycompany.weeklyplanning.service.api.dto.DayUserProjectAssignRequest;
import com.mycompany.weeklyplanning.service.api.dto.DayUserProjectsList;
import com.mycompany.weeklyplanning.service.api.dto.DayUsersList;
import com.mycompany.weeklyplanning.service.api.dto.Task;
import com.mycompany.weeklyplanning.service.api.dto.TaskCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.TasksList;
import com.mycompany.weeklyplanning.service.api.dto.WeekCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.WeekDetail;
import com.mycompany.weeklyplanning.service.api.dto.WeekDuplicateRequest;
import com.mycompany.weeklyplanning.service.api.dto.WeekUpdateRequest;
import com.mycompany.weeklyplanning.service.api.dto.WeeksPage;
import java.time.LocalDate;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class WeeksApiDelegateImpl implements WeeksApiDelegate {

    private final WeeklyPlanningWeekApiService apiService;

    public WeeksApiDelegateImpl(WeeklyPlanningWeekApiService apiService) {
        this.apiService = apiService;
    }

    @Override
    public ResponseEntity<Task> addTask(UUID weekId, LocalDate date, UUID userId, UUID projectId, TaskCreateRequest taskCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apiService.addTask(weekId, date, userId, projectId, taskCreateRequest));
    }

    @Override
    public ResponseEntity<DayUser> addUserToDay(UUID weekId, LocalDate date, DayUserCreateRequest dayUserCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apiService.addUserToDay(weekId, date, dayUserCreateRequest));
    }

    @Override
    public ResponseEntity<DayUserProject> assignProjectToDayUser(
        UUID weekId,
        LocalDate date,
        UUID userId,
        DayUserProjectAssignRequest dayUserProjectAssignRequest
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apiService.assignProjectToDayUser(weekId, date, userId, dayUserProjectAssignRequest));
    }

    @Override
    public ResponseEntity<WeekDetail> createWeek(WeekCreateRequest weekCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apiService.createWeek(weekCreateRequest));
    }

    @Override
    public ResponseEntity<Void> deleteWeek(UUID weekId) {
        apiService.deleteWeek(weekId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<WeekDetail> duplicateWeek(UUID weekId, WeekDuplicateRequest weekDuplicateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apiService.duplicateWeek(weekId, weekDuplicateRequest));
    }

    @Override
    public ResponseEntity<DayPlan> getDayPlan(UUID weekId, LocalDate date) {
        return ResponseEntity.ok(apiService.getDayPlan(weekId, date));
    }

    @Override
    public ResponseEntity<WeekDetail> getWeek(UUID weekId) {
        return ResponseEntity.ok(apiService.getWeek(weekId));
    }

    @Override
    public ResponseEntity<DayUserProjectsList> listDayUserProjects(UUID weekId, LocalDate date, UUID userId) {
        return ResponseEntity.ok(apiService.listDayUserProjects(weekId, date, userId));
    }

    @Override
    public ResponseEntity<DayUsersList> listDayUsers(UUID weekId, LocalDate date) {
        return ResponseEntity.ok(apiService.listDayUsers(weekId, date));
    }

    @Override
    public ResponseEntity<TasksList> listTasks(UUID weekId, LocalDate date, UUID userId, UUID projectId) {
        return ResponseEntity.ok(apiService.listTasks(weekId, date, userId, projectId));
    }

    @Override
    public ResponseEntity<DayPlansList> listWeekDays(UUID weekId) {
        return ResponseEntity.ok(apiService.listWeekDays(weekId));
    }

    @Override
    public ResponseEntity<WeeksPage> listWeeks(Integer page, Integer size, String sort) {
        return ResponseEntity.ok(apiService.listWeeks(page, size, sort));
    }

    @Override
    public ResponseEntity<Void> removeProjectFromDayUser(UUID weekId, LocalDate date, UUID userId, UUID projectId) {
        apiService.removeProjectFromDayUser(weekId, date, userId, projectId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> removeTask(UUID weekId, LocalDate date, UUID userId, UUID projectId, UUID taskId) {
        apiService.removeTask(weekId, date, userId, projectId, taskId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> removeUserFromDay(UUID weekId, LocalDate date, UUID userId) {
        apiService.removeUserFromDay(weekId, date, userId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<WeekDetail> updateWeek(UUID weekId, WeekUpdateRequest weekUpdateRequest) {
        return ResponseEntity.ok(apiService.updateWeek(weekId, weekUpdateRequest));
    }
}

