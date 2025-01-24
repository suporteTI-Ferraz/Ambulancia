package com.example.ambulancia.repositories.hospital;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ambulancia.models.entities.hospital.Hospital;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    
}
