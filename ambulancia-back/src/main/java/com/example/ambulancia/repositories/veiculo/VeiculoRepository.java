package com.example.ambulancia.repositories.veiculo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.veiculo.Veiculo;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    
}
