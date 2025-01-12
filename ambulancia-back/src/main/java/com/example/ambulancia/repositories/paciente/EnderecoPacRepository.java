package com.example.ambulancia.repositories.paciente;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.paciente.EnderecoPac;

public interface EnderecoPacRepository extends JpaRepository<EnderecoPac, Long> {
    
}
