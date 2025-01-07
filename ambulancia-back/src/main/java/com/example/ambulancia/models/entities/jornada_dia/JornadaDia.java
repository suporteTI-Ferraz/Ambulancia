package com.example.ambulancia.models.entities.jornada_dia;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.example.ambulancia.models.entities.BaseEntity;
import com.example.ambulancia.models.entities.paciente.Paciente;
import com.example.ambulancia.models.entities.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table
public class JornadaDia extends BaseEntity {
    private LocalDateTime dataPlanejada;
    private boolean multado = false;
    private boolean manutencao = false;
    private LocalTime horaInicio;
    private LocalTime horaFim;

}