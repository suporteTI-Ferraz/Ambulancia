package com.example.ambulancia.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para Fornecedor, excluindo a lista de manutenções.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FornecedorDTO {
    private Long id;
    private String nome;
    private String cnpj;
    private String telefone;
}