package com.weeklyplanning.config;

import com.weeklyplanning.domain.Account;
import com.weeklyplanning.domain.enumeration.AccountRole;
import com.weeklyplanning.repository.AccountRepository;
import com.weeklyplanning.security.AuthoritiesConstants;
import java.util.Locale;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityInMemoryConfiguration {

    private final AccountRepository accountRepository;

    public SecurityInMemoryConfiguration(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            String normalizedUsername = username == null ? null : username.trim().toLowerCase(Locale.ROOT);
            Account account = accountRepository
                .findOneByUsernameIgnoreCase(normalizedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found"));

            return User.withUsername(account.getUsername())
                .password(account.getPasswordHash())
                .authorities(toAuthority(account.getRole()))
                .build();
        };
    }

    private String toAuthority(AccountRole role) {
        if (role == AccountRole.ADMIN) {
            return AuthoritiesConstants.ADMIN;
        }
        return AuthoritiesConstants.VIEWER;
    }
}
