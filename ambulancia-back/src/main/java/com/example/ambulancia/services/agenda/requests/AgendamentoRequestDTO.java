package com.example.ambulancia.services.agenda.requests;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgendamentoRequestDTO {
    private String servico;
    private LocalTime horarioInic;
    private LocalTime horarioFim;
    private Integer quilometragemInicial;
    private Integer quilometragemFinal;
    private LocalDate data;
    private Long agendaId;
    private Long motoristaId;
    private Long veiculoId;
    private Long hospitalId;
    private List<Long> pacientesIds;
}
