package com.example.ambulancia.dto;

import java.time.LocalDate;

import com.example.ambulancia.models.enums.StatusManutencao;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para Manutenção, contendo os dados principais e integrando o DTO de Veículo e Fornecedor.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ManutencaoDTO {
    private Long id;
    private LocalDate dataEntradaManutencao;
    private LocalDate dataSaidaManutencao;
    private StatusManutencao status;
    private String tipoManutencao;
    private String descricaoProblema;
    private String servicoRealizado;
    private Double custoMaoObra;
    private Double custoPecas;
    
    // DTO relacionado: possibilita consulta da placa do veículo vinculado a esta manutenção.
    private VeiculoDTO veiculo;

    // Novo campo: Fornecedor relacionado a esta manutenção.
    private FornecedorDTO fornecedor;
}