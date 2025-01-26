package com.example.ambulancia.models.entities.paciente;

import com.example.ambulancia.models.entities.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.Builder;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "EnderecoPaciente") // Renomeie a tabela aqui
public class EnderecoPac extends BaseEntity {
    @Column(nullable = false)
    private String ruaPac;
    @Column(nullable = false)
    private String bairroPac;
    @Builder.Default
    private String cidadePac = "Ferraz de Vasconcelos";
    @Builder.Default
    private String estadoPac = "SP";
    @Column(nullable = false)
    private String cepPac;
    @Column(nullable = false)
    private String numeroPac;
    @Column(nullable = false)
    private String complementoPac;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "paciente_id", referencedColumnName = "id", nullable = false)
    private Paciente paciente;
}