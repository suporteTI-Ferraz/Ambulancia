package com.example.ambulancia.services.agenda.requests;

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
    private Long agendaId;
    private Long motoristaId;
    private Long veiculoId;
    private Long hospitalId;
    private List<Long> pacientesIds;
}
