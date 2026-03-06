package com.example.weeklyplanning.config.security;

import com.example.weeklyplanning.service.security.AccountSecurityService;
import com.example.weeklyplanning.service.security.AuthenticatedPrincipal;
import com.example.weeklyplanning.service.security.JwtTokenService;
import com.example.weeklyplanning.service.security.TokenBlacklistService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;
    private final AccountSecurityService accountSecurityService;
    private final TokenBlacklistService tokenBlacklistService;

    public JwtAuthenticationFilter(
        JwtTokenService jwtTokenService,
        AccountSecurityService accountSecurityService,
        TokenBlacklistService tokenBlacklistService
    ) {
        this.jwtTokenService = jwtTokenService;
        this.accountSecurityService = accountSecurityService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith("Bearer ") && SecurityContextHolder.getContext().getAuthentication() == null) {
            String token = header.substring(7);
            try {
                if (!tokenBlacklistService.isBlacklisted(token)) {
                    UUID accountId = jwtTokenService.extractAccountId(token);
                    AuthenticatedPrincipal principal = accountSecurityService.loadByAccountId(accountId);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        principal,
                        null,
                        principal.getAuthorities()
                    );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception ex) {
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }
}
