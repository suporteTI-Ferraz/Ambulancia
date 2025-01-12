package com.example.ambulancia.services.authentication.audit;

import org.springframework.stereotype.Component;

import java.io.IOException;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

@Component("customRequestContextFilter")  // Renomeie para algo único
public class RequestContextFilter implements Filter {

    private static final ThreadLocal<String> clientIp = new ThreadLocal<>();

    public static String getClientIp() {
        return clientIp.get();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (request instanceof HttpServletRequest httpRequest) {
            String ip = httpRequest.getHeader("X-Forwarded-For");
            if (ip == null || ip.isEmpty()) {
                ip = httpRequest.getRemoteAddr();
            }
            clientIp.set(ip);
        }
        try {
            chain.doFilter(request, response);
        } finally {
            clientIp.remove();
        }
    }
}