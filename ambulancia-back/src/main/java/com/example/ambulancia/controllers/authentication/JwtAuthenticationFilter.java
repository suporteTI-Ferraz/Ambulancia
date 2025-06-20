package com.example.ambulancia.controllers.authentication;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.ambulancia.services.authentication.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
      
      private final JwtService jwtService;
      private final UserDetailsService userDetailsService;

      @Override
      protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain

      ) throws ServletException, IOException {
            if (request.getServletPath().contains("/auth")){
                  filterChain.doFilter(request, response);
                  return;
            }
            String jwt = null;
            Cookie[] cookies = request.getCookies();
            if (cookies != null){
                  for (Cookie cookie : cookies) {
                        if (cookie.getName().equals("token")) {
                              jwt = cookie.getValue();
                              break;
                        }
                  }
            }
            
            if (jwt == null) {
                  filterChain.doFilter(request, response);
                  return;
                  
            }

            String userEmail = jwtService.extractUsername(jwt);
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                  UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                  if (jwtService.isTokenValid(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                  new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
                  }
            }
            filterChain.doFilter(request, response);
      }

}