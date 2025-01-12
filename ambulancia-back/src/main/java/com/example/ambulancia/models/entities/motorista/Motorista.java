package com.example.ambulancia.models.entities.motorista;

import com.example.ambulancia.models.entities.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table
public class Motorista extends BaseEntity {
    @Column(nullable = false)
    private String nomeMotorista;
    
}
