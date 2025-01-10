package com.example.ambulancia.models.entities.veiculo;
import java.util.ArrayList;
import java.util.List;

import com.example.ambulancia.models.entities.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.CascadeType;
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
public class Veiculo extends BaseEntity {
    private String numVeic;
    private String placaVeic;
    private Double kilometragem; 

    @Builder.Default
    @JsonIgnore
    @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Manutencao> manutencoes = new ArrayList<>();

    @Builder.Default
    @JsonIgnore
    @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Multa> multas = new ArrayList<>();

}
