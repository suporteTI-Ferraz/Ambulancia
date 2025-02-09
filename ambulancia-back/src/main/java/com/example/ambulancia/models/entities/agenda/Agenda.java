package com.example.ambulancia.models.entities.agenda;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.ambulancia.models.entities.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Builder;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table
public class Agenda extends BaseEntity {
    private LocalDate dataAgenda;
    @Builder.Default
    private Boolean diaFinalizado = false;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "agenda")
    private List<Agendamento> agendamentos = new ArrayList<>();

    @Builder.Default
    @Column(nullable = false)
    private Integer quilometragemTotal = 0; // Inicializa com 0

        // Método para recalcular a quilometragem total do dia
        public void calcularQuilometragemTotal() {
            this.quilometragemTotal = agendamentos.stream()
                .filter(a -> a.getQuilometragemInicial() != null && a.getQuilometragemFinal() != null)
                .mapToInt(a -> a.getQuilometragemFinal() - a.getQuilometragemInicial())
                .sum();
        }

        public void finalizarDia() {
            calcularQuilometragemTotal();
            this.diaFinalizado = true;
        }
}
