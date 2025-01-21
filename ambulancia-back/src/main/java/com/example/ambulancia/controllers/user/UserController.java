package com.example.ambulancia.controllers.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id){
        User user = service.findById(id);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<User> updateById(@PathVariable Long id, @RequestBody User user){
        User obj = service.update(id, user);
        return ResponseEntity.ok(obj);

    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/reactivate/{id}")
    public ResponseEntity<Void> reactivateById(@PathVariable Long id) {
        service.reactivateById(id);
        return ResponseEntity.ok().build();  // Retorna 200 OK com corpo vazio
    }


    @GetMapping(value = "/getid")
    public ResponseEntity<Long> getUserId(HttpServletRequest request){
        Long id = Long.valueOf(authenticationService.getUserIdFromToken(request).toString());
        return ResponseEntity.ok().body(id);

    }

}