package com.mycompany.weeklyplanning.web.api;

import com.mycompany.weeklyplanning.service.api.WeeklyPlanningApiService;
import com.mycompany.weeklyplanning.service.api.dto.User;
import com.mycompany.weeklyplanning.service.api.dto.UserCreateRequest;
import com.mycompany.weeklyplanning.service.api.dto.UserUpdateRequest;
import com.mycompany.weeklyplanning.service.api.dto.UsersPage;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsersApiDelegateImpl implements UsersApiDelegate {

    private final WeeklyPlanningApiService apiService;

    public UsersApiDelegateImpl(WeeklyPlanningApiService apiService) {
        this.apiService = apiService;
    }

    @Override
    public ResponseEntity<User> createUser(UserCreateRequest userCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apiService.createUser(userCreateRequest));
    }

    @Override
    public ResponseEntity<Void> deleteUser(UUID userId) {
        apiService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<User> getUser(UUID userId) {
        return ResponseEntity.ok(apiService.getUser(userId));
    }

    @Override
    public ResponseEntity<UsersPage> listUsers(Integer page, Integer size, String sort) {
        return ResponseEntity.ok(apiService.listUsers(page, size, sort));
    }

    @Override
    public ResponseEntity<User> updateUser(UUID userId, UserUpdateRequest userUpdateRequest) {
        return ResponseEntity.ok(apiService.updateUser(userId, userUpdateRequest));
    }
}

