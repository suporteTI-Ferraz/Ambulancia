package com.example.ambulancia.models.entities.paciente;

import com.example.ambulancia.models.entities.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "EnderecoPaciente") // Renomeie a tabela aqui
public class EnderecoPac extends BaseEntity {
    private String ruaPac;
    private String numeroPac;
    private String bairroPac;
    private String cidadePac;
    private String estadoPac;
    private String cepPac;
    private String complementoPac;

    @ManyToOne
    @JoinColumn(name = "paciente_id", referencedColumnName = "id")
    private Paciente paciente;
}