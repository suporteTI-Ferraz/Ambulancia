package com.example.ambulancia.models.entities.veiculo;
import java.util.ArrayList;
import java.util.List;

import com.example.ambulancia.models.entities.BaseEntity;
import com.example.ambulancia.models.entities.agenda.Agendamento;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table
public class Veiculo extends BaseEntity {
    private String modeloVeic;
    @Column(nullable = false)
    private String placaVeic;
    @Column(nullable = false)
    private Integer quilometragemAtual; 
    

    @Builder.Default
    @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Manutencao> manutencoes = new ArrayList<>();


    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "veiculo")
    private List<Agendamento> agendamentos = new ArrayList<>();

}
