package com.example.ambulancia.models.entities.veiculo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.ambulancia.models.entities.BaseEntity;
import com.example.ambulancia.models.enums.StatusManutencao;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Manutencao extends BaseEntity {
    private String descricao;
    private LocalDate dataManutencao;
    @Enumerated(EnumType.STRING)  // Salva o enum como texto no banco
    @Column(nullable = false)
    private StatusManutencao status;


    private String tipoManutencao;
    private String descricaoProblema;
    private String servicoRealizado;
    private Double custoManutencao;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "veiculo_id", referencedColumnName = "id")
    private Veiculo veiculo;

    @OneToMany(mappedBy = "manutencao", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<PecaManutencao> pecasManutencao = new ArrayList<>(); // RELACIONAMENTO COM PEÇAS

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fornecedor_id", referencedColumnName = "id")
    private Fornecedor fornecedor; // RELACIONAMENTO COM FORNECEDOR (OPCIONAL)
}
