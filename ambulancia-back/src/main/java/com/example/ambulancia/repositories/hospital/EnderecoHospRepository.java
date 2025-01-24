package com.example.ambulancia.repositories.hospital;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.hospital.EnderecoHosp;

public interface EnderecoHospRepository extends JpaRepository<EnderecoHosp, Long> {
    
}

