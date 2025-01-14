package com.example.ambulancia.services.user;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.user.User;
import com.example.ambulancia.repositories.user.UserRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository repository;

    private final PasswordEncoder passwordEncoder;


    public List<User> findAll() {
        return repository.findAll();
    }

    public User findById(Long id) {
        Optional<User> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public User insert(User obj) {
       
        return repository.save(obj);
    }

    public User update (Long id, User obj) {
        User entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }

    public void updateData(User entity, User user){
        entity.setNome(user.getNome());
        entity.setEmail(user.getEmail());
        if (user.getSenha() != null && !user.getSenha().isEmpty()) {
            entity.setSenha(passwordEncoder.encode(user.getSenha()));
        }
        entity.setRole(user.getRole());
    }

    public User deleteById(Long id){
        User entity = repository.getReferenceById(id);
        entity.setDeletedAt(LocalDateTime.now());
        return repository.saveAndFlush(entity);
    }   
    
    public User reactivateById(Long id){
        User entity = repository.getReferenceById(id);
        entity.setDeletedAt(null);
        entity.setDeletedBy(null);
        return repository.saveAndFlush(entity);
    }

}