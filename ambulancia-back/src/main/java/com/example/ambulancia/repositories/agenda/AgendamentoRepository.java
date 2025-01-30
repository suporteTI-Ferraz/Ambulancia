package com.example.ambulancia.repositories.agenda;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.agenda.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    
}
