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

@Entity
@Table
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PecaManutencao extends BaseEntity {
    private String nomePeca;
    private Integer quantidade;
    private Double custoUnitario;

    @ManyToOne
    @JoinColumn(name = "manutencao_id", referencedColumnName = "id")
    private Manutencao manutencao;
}
