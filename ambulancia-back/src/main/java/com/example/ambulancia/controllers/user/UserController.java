package com.example.ambulancia.controllers.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ambulancia.models.entities.user.User;
import com.example.ambulancia.services.authentication.AuthenticationService;
import com.example.ambulancia.services.user.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "api/user")
public class UserController {
    @Autowired
    UserService service;

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping
        public ResponseEntity<List<User>> findAll(){
            List<User> list = service.findAll();
                return ResponseEntity.ok().body(list);
        
    }



    @GetMapping(value = "/getid")
    public ResponseEntity<Long> getUserId(HttpServletRequest request){
        Long id = Long.valueOf(authenticationService.getUserIdFromToken(request).toString());
        return ResponseEntity.ok().body(id);

    }

}