package com.example.ambulancia.controllers.agenda;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ambulancia.models.entities.agenda.Agendamento;
import com.example.ambulancia.services.agenda.AgendamentoService;
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

    @GetMapping
    public ResponseEntity<List<Agendamento>> findAll(){
        List<Agendamento> list = service.findAll();
        return ResponseEntity.ok().body(list);
        
    }

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

    @DeleteMapping("/{agendamentoId}/pacientes/{pacienteId}")
    public ResponseEntity<Agendamento> removePacienteFromAgendamento(
        @PathVariable Long agendamentoId, 
        @PathVariable Long pacienteId
    ) {
        Agendamento updatedAgendamento = service.removePacienteFromAgendamento(agendamentoId, pacienteId);
        return ResponseEntity.ok(updatedAgendamento);
    }
}
