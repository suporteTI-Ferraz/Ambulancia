package com.example.ambulancia.services.motorista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.repositories.MotoristaRepository;

@Service
public class MotoristaService {
    @Autowired
    MotoristaRepository repository;
    
}
