package com.example.ambulancia.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para Veículo contendo os atributos essenciais.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VeiculoDTO {
    private Long id;
    private String placaVeic;
}