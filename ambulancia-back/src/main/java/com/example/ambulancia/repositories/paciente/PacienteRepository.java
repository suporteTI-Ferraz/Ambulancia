package com.example.ambulancia.repositories.paciente;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.paciente.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    
}
