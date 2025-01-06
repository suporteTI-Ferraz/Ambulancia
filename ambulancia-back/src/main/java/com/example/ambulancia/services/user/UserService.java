package com.example.ambulancia.services.user;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.user.User;
import com.example.ambulancia.repositories.UserRepository;
@Service
public class UserService {

    @Autowired
    UserRepository repository;


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
        entity.setUpdatedAt(LocalDateTime.now());
    }

}