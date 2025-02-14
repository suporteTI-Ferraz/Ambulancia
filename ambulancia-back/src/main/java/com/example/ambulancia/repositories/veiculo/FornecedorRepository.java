package com.example.ambulancia.repositories.veiculo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.veiculo.Fornecedor;
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    
}
