package com.example.ambulancia.models.entities.veiculo;

import java.time.LocalDate;

import com.example.ambulancia.models.entities.BaseEntity;
import com.example.ambulancia.models.enums.StatusManutencao;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    private LocalDate dataEntradaManutencao; // Quando o veículo foi para a manutenção
    private LocalDate dataSaidaManutencao;   // Quando o veículo foi retirado da manutenção
    @Enumerated(EnumType.STRING)  // Salva o enum como texto no banco
    @Column(nullable = false)
    private StatusManutencao status;


    private String tipoManutencao;
    private String descricaoProblema;
    private String servicoRealizado;
    private Double custoMaoObra;
    private Double custoPecas;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "veiculo_id", referencedColumnName = "id")
    private Veiculo veiculo;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fornecedor_id", referencedColumnName = "id")
    private Fornecedor fornecedor; // RELACIONAMENTO COM FORNECEDOR (OPCIONAL)

      
}
