package com.mycompany.weeklyplanning.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.mycompany.weeklyplanning.security.AuthoritiesConstants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

/**
 * Minimal security configuration for the backend prototype:
 * - API-first endpoints are publicly callable (no IdP needed).
 * - Existing JHipster endpoints remain protected (keeps generated tests meaningful).
 */
@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfigurationMinimal {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, MvcRequestMatcher.Builder mvc) throws Exception {
        http.cors(withDefaults());
        http.csrf(csrf -> csrf.disable());
        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        http.authorizeHttpRequests(authz ->
            // prettier-ignore
            authz
                // Public API docs
                .requestMatchers(mvc.pattern("/v3/api-docs/**")).permitAll()
                .requestMatchers(mvc.pattern("/swagger-ui/**"), mvc.pattern("/swagger-ui.html")).permitAll()

                // Public API-first endpoints (per requirements)
                .requestMatchers(mvc.pattern("/api/users/**")).permitAll()
                .requestMatchers(mvc.pattern("/api/projects/**")).permitAll()
                .requestMatchers(mvc.pattern("/api/weeks/**")).permitAll()

                // Keep other JHipster endpoints protected
                .requestMatchers(mvc.pattern("/api/admin/**")).hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(mvc.pattern("/api/**")).authenticated()

                // Allow basic actuator endpoints without auth
                .requestMatchers(mvc.pattern("/management/health/**")).permitAll()
                .requestMatchers(mvc.pattern("/management/info")).permitAll()
                .requestMatchers(mvc.pattern("/management/prometheus")).permitAll()
                .requestMatchers(mvc.pattern("/management/**")).hasAuthority(AuthoritiesConstants.ADMIN)

                .anyRequest().permitAll()
        );

        http.httpBasic(withDefaults());
        return http.build();
    }

    @Bean
    MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {
        return new MvcRequestMatcher.Builder(introspector);
    }
}

