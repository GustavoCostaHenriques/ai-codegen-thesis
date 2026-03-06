package com.weeklyplanning.service;

import com.weeklyplanning.service.dto.AccountCreateDTO;
import com.weeklyplanning.service.dto.AccountDTO;
import java.util.Optional;

public interface AccountService {
    AccountDTO create(AccountCreateDTO request);

    Optional<AccountDTO> findByUsername(String username);
}
