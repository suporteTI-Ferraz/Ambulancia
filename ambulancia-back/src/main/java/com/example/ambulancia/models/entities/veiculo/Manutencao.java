package com.example.ambulancia.models.entities.veiculo;

import com.example.ambulancia.models.entities.BaseEntity;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
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
public class Manutencao extends BaseEntity {
    private String tipoManutencao;
    private Double custoManutencao;

    @ManyToOne
    @JoinColumn(name = "veiculo_id", referencedColumnName = "id")
    private Veiculo veiculo;
}
