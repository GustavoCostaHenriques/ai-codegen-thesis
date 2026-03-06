package com.weeklyplanning.web.rest;

import com.weeklyplanning.service.AccountService;
import com.weeklyplanning.service.dto.AccountCreateDTO;
import com.weeklyplanning.service.dto.AccountDTO;
import com.weeklyplanning.web.rest.api.ApiModels;
import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AccountResource {

    private final AccountService accountService;

    public AccountResource(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/accounts")
    public ResponseEntity<ApiModels.AccountResponse> createAccount(@Valid @RequestBody ApiModels.AccountCreateRequest request) {
        AccountCreateDTO createDTO = new AccountCreateDTO();
        createDTO.setUsername(request.username());
        createDTO.setPassword(request.password());
        createDTO.setRole(request.role());

        AccountDTO account = accountService.create(createDTO);
        ApiModels.AccountResponse response = new ApiModels.AccountResponse(account.getId(), account.getUsername(), account.getRole());
        return ResponseEntity.created(URI.create("/api/accounts/" + account.getId())).body(response);
    }
}
