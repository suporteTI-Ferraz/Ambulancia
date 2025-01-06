package com.example.ambulancia.services.authentication;

import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {


  @Override
  public void logout(
      HttpServletRequest request,
      HttpServletResponse response,
      org.springframework.security.core.Authentication authentication) {
    // Extrair o valor do cookie "token"
    Cookie[] cookies = request.getCookies();
    String tokenCookieValue = null;
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("token")) {
          tokenCookieValue = cookie.getValue();
          break;
        }
      }
    }

    // Verificar se o valor do cookie é válido
    if (tokenCookieValue != null) {
        Cookie cookieToDelete = new Cookie("token", null);
        cookieToDelete.setMaxAge(0);
        cookieToDelete.setPath("/"); // Certifique-se de definir o mesmo caminho usado para criar o cookie
        response.addCookie(cookieToDelete);
    }
  }
}