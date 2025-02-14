package com.example.ambulancia.repositories.veiculo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.veiculo.PecaManutencao;

public interface PecaManutencaoRepository extends JpaRepository<PecaManutencao, Long> {
    
}
