package com.example.ambulancia.controllers.authentication;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.ambulancia.services.authentication.AuthenticationService;
import com.example.ambulancia.services.authentication.JwtService;
import com.example.ambulancia.services.authentication.requests.AuthenticationRequest;
import com.example.ambulancia.services.authentication.requests.RegisterRequest;
import com.example.ambulancia.services.authentication.responses.AuthenticationResponse;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    
    private final AuthenticationService service;
    private final JwtService jwtService;


    @PostMapping("/register")
     public ResponseEntity<AuthenticationResponse> register(
    @RequestBody RegisterRequest request,
    HttpServletResponse httpResponse // Inject HttpServletResponse
) {
  
    AuthenticationResponse authenticationResponse = service.register(request);
    // Set the access token as an HttpOnly cookie in the response
    Cookie tokenCookie = new Cookie("token", authenticationResponse.getAccessToken());
    tokenCookie.setHttpOnly(true); // Set HttpOnly flag
    tokenCookie.setPath("/"); // Set cookie path as needed
    httpResponse.addCookie(tokenCookie);


    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(authenticationResponse.getId()).toUri();

    return ResponseEntity.created(uri).body(authenticationResponse);
}


 @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletResponse httpResponse
    ) {
        AuthenticationResponse authenticationResponse = service.authenticate(request);

        Cookie tokenCookie = new Cookie("token", authenticationResponse.getAccessToken());
        tokenCookie.setHttpOnly(true); // Set HttpOnly flag
        tokenCookie.setPath("/"); // Set cookie path as needed
        httpResponse.addCookie(tokenCookie);


        return ResponseEntity.ok(authenticationResponse);
    }

    @GetMapping("/check")
public ResponseEntity<Void> checkAuthentication(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    String token = null;

    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if ("token".equals(cookie.getName())) {
                token = cookie.getValue();
                break;
            }
        }
    }

    if (token != null) {
        try {
            Integer userId = jwtService.getUserIdFromToken(token);
            if (userId != 0) {
                return ResponseEntity.ok().build(); // Token válido
            }
        } catch (Exception e) {
            // Token inválido ou expirado
        }
    }

    return ResponseEntity.status(401).build(); // Não autorizado
}
}