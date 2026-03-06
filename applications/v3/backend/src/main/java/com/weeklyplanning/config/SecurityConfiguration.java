package com.weeklyplanning.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.weeklyplanning.security.JwtAuthenticationFilter;
import com.weeklyplanning.security.JwtProperties;
import com.weeklyplanning.web.error.RestAccessDeniedHandler;
import com.weeklyplanning.web.error.RestAuthenticationEntryPoint;
import java.util.List;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity
@EnableConfigurationProperties(JwtProperties.class)
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final RestAuthenticationEntryPoint authenticationEntryPoint;
    private final RestAccessDeniedHandler accessDeniedHandler;

    public SecurityConfiguration(JwtAuthenticationFilter jwtAuthenticationFilter,
                                 RestAuthenticationEntryPoint authenticationEntryPoint,
                                 RestAccessDeniedHandler accessDeniedHandler) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.accessDeniedHandler = accessDeniedHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(withDefaults())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler)
            )
            .authorizeHttpRequests(authz -> authz

                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public endpoints
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/sessions").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/accounts").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/password-changes").permitAll()

                // Authenticated user endpoints
                .requestMatchers(HttpMethod.GET, "/api/v1/accounts/me")
                    .hasAnyAuthority(AuthoritiesConstants.ADMIN, AuthoritiesConstants.VIEWER)
                .requestMatchers(HttpMethod.DELETE, "/api/v1/auth/sessions/current")
                    .hasAnyAuthority(AuthoritiesConstants.ADMIN, AuthoritiesConstants.VIEWER)

                // Persons
                .requestMatchers(HttpMethod.GET, "/api/v1/persons/**")
                    .hasAnyAuthority(AuthoritiesConstants.ADMIN, AuthoritiesConstants.VIEWER)
                .requestMatchers(HttpMethod.POST, "/api/v1/persons")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.PUT, "/api/v1/persons/**")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/v1/persons/**")
                    .hasAuthority(AuthoritiesConstants.ADMIN)

                // Projects
                .requestMatchers(HttpMethod.GET, "/api/v1/projects/**")
                    .hasAnyAuthority(AuthoritiesConstants.ADMIN, AuthoritiesConstants.VIEWER)
                .requestMatchers(HttpMethod.POST, "/api/v1/projects")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.PUT, "/api/v1/projects/**")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/v1/projects/**")
                    .hasAuthority(AuthoritiesConstants.ADMIN)

                // Weeks
                .requestMatchers(HttpMethod.GET, "/api/v1/weeks/**")
                    .hasAnyAuthority(AuthoritiesConstants.ADMIN, AuthoritiesConstants.VIEWER)
                .requestMatchers(HttpMethod.POST, "/api/v1/weeks")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.PUT, "/api/v1/weeks/**")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/v1/weeks/**")
                    .hasAuthority(AuthoritiesConstants.ADMIN)

                // Planning operations
                .requestMatchers(HttpMethod.POST, "/api/v1/weeks/*/day-plans/*/day-persons")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/v1/weeks/*/day-plans/*/day-persons/*")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/v1/weeks/*/day-plans/*/day-persons/*/day-person-projects")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/v1/weeks/*/day-plans/*/day-persons/*/day-person-projects/*")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/v1/weeks/*/day-plans/*/day-persons/*/day-person-projects/*/tasks")
                    .hasAuthority(AuthoritiesConstants.ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/v1/weeks/*/day-plans/*/day-persons/*/day-person-projects/*/tasks/*")
                    .hasAuthority(AuthoritiesConstants.ADMIN)

                // All other API endpoints require authentication
                .requestMatchers("/api/v1/**").authenticated()

                .anyRequest().permitAll()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
