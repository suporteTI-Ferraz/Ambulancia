package com.example.ambulancia.repositories.motorista;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.motorista.Motorista;


public interface MotoristaRepository extends JpaRepository<Motorista, Long>{
    
}
