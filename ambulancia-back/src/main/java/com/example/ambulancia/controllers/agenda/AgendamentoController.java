package com.example.ambulancia.controllers.agenda;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.ambulancia.models.entities.agenda.Agendamento;
import com.example.ambulancia.services.agenda.AgendamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.ambulancia.services.agenda.requests.AgendamentoRequestDTO;
import com.example.ambulancia.services.authentication.AuthenticationService;

import jakarta.servlet.http.HttpServletRequest;



@RestController
@RequestMapping("/api/agendamento")
public class AgendamentoController {
    @Autowired
    private AgendamentoService service;
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<Agendamento> createAgendamento(@RequestBody AgendamentoRequestDTO dto, HttpServletRequest request) {
        Long userId = Long.valueOf(authenticationService.getUserIdFromToken(request).toString());
        Agendamento novoAgendamento = new Agendamento();
        novoAgendamento.setServico(dto.getServico());
        novoAgendamento.setHorarioInic(dto.getHorarioInic());
        novoAgendamento.setHorarioFim(dto.getHorarioFim());
        Agendamento agendamentoCriado = service.insertAgendamento(
            novoAgendamento, dto.getAgendaId(), userId,
            dto.getMotoristaId(), dto.getVeiculoId(),
            dto.getHospitalId(), dto.getPacientesIds()
        );

        return ResponseEntity.ok(agendamentoCriado);
    }
}
