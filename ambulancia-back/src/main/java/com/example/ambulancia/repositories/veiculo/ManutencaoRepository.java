package com.example.ambulancia.repositories.veiculo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.veiculo.Manutencao;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {
    
}
