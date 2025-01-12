package com.example.ambulancia.models.entities.paciente;

import java.util.ArrayList;
import java.util.List;

import com.example.ambulancia.models.entities.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Column;
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
public class Paciente extends BaseEntity {
    @Column(nullable = false)
    private String nomePaciente;
    @Column(nullable = false, unique = true)
    private String cpf;
    @Column(nullable = false, unique = true)
    private String sus;
    @Column(nullable = true)
    private String condicoesEspecificas;  // Ex: "cadeirante", "obeso", "mobilidade reduzida"

    @Builder.Default
    @JsonIgnore
    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EnderecoPac> enderecos = new ArrayList<>();

    @Builder.Default
    @JsonIgnore
    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TelefonePac> telefones = new ArrayList<>();
}
