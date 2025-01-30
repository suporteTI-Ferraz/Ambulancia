package com.example.ambulancia.models.entities.hospital;
import java.util.List;

import com.example.ambulancia.models.entities.BaseEntity;
import com.example.ambulancia.models.entities.agenda.Agendamento;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.CascadeType;
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
public class Hospital extends BaseEntity {
    private String nomeHosp;

    @Builder.Default
    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EnderecoHosp> enderecos = new ArrayList<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "hospital")
    private List<Agendamento> agendamentos = new ArrayList<>();
}
