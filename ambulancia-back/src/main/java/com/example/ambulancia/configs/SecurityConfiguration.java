package com.example.ambulancia.configs;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import com.example.ambulancia.controllers.authentication.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

        // Lista que permite rotas que todos tem acesso...
        private static final String[] WHITE_LIST_URL = { "/api/auth/**",
                        // "/protoon/municipe/municipes",
                        // "/protoon/municipe/endereco",

                        "/webjars/**",
                        "/swagger-ui.html" };
        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;
        private final LogoutHandler logoutHandler;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .cors(withDefaults())
                    .csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests(req -> req.requestMatchers(WHITE_LIST_URL)
                            .permitAll()
                            .requestMatchers("/h2-console/**").permitAll()

                            .anyRequest()
                            .authenticated())
                    .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                    .authenticationProvider(authenticationProvider)
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                    .logout(logout -> logout.logoutUrl("/api/logout")
                            .addLogoutHandler(logoutHandler)
                            .logoutSuccessHandler((request, response,
                                    authentication) -> SecurityContextHolder
                                    .clearContext()))
                    .headers(headers -> headers.frameOptions().disable()); // Desabilitar proteção de frame

                return http.build();
        }
}
