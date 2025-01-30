package com.example.ambulancia.repositories.agenda;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.agenda.Agenda;
public interface AgendaRepository extends JpaRepository<Agenda, Long>  {
    
}
