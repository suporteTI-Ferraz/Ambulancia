package com.example.ambulancia.repositories.veiculo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.veiculo.Multa;

public interface MultaRepository extends JpaRepository<Multa, Long> {
    
}
