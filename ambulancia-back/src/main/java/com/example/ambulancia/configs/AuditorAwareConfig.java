package com.example.ambulancia.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

import com.example.ambulancia.services.authentication.audit.AuditorAwareImpl;

@Configuration
public class AuditorAwareConfig {

    @Bean
    public AuditorAware<String> auditorProvider() {
        return new AuditorAwareImpl();
    }
}
