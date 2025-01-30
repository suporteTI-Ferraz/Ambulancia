package com.example.ambulancia.models.entities.motorista;

import java.util.ArrayList;
import java.util.List;

import com.example.ambulancia.models.entities.BaseEntity;
import com.example.ambulancia.models.entities.agenda.Agendamento;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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

    // Inicializa a lista de agendamentos como uma lista vazia
    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "motorista")
    private List<Agendamento> agendamentos = new ArrayList<>();
    
}
