package com.example.ambulancia.repositories.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
            Optional<User> findByEmail(String email); 

    
}
