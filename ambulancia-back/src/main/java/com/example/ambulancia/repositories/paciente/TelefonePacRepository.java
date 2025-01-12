package com.example.ambulancia.repositories.paciente;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.paciente.TelefonePac;

public interface TelefonePacRepository extends JpaRepository<TelefonePac, Long> {
    
}
