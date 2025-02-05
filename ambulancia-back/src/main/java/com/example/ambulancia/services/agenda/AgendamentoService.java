package com.example.ambulancia.services.agenda;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ambulancia.models.entities.agenda.Agenda;
import com.example.ambulancia.models.entities.agenda.Agendamento;
import com.example.ambulancia.models.entities.hospital.Hospital;
import com.example.ambulancia.models.entities.motorista.Motorista;
import com.example.ambulancia.models.entities.paciente.Paciente;
import com.example.ambulancia.models.entities.user.User;
import com.example.ambulancia.models.entities.veiculo.Veiculo;
import com.example.ambulancia.repositories.agenda.AgendaRepository;
import com.example.ambulancia.repositories.agenda.AgendamentoRepository;
import com.example.ambulancia.repositories.hospital.HospitalRepository;
import com.example.ambulancia.repositories.motorista.MotoristaRepository;
import com.example.ambulancia.repositories.paciente.PacienteRepository;
import com.example.ambulancia.repositories.user.UserRepository;
import com.example.ambulancia.repositories.veiculo.VeiculoRepository;



@Service
public class AgendamentoService {
    @Autowired
    AgendamentoRepository repository;

    @Autowired 
    AgendaRepository agendaRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired 
    MotoristaRepository motoristaRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    @Autowired
    HospitalRepository hospitalRepository;

    @Autowired
    PacienteRepository pacienteRepository;

       public List<Agendamento> findAll() {
        return repository.findAll();
    }

    public Agendamento findById(Long id) {
        Optional<Agendamento> obj = repository.findById(id);
        return obj.orElse(null);
    }

        public Agendamento insertAgendamento(Agendamento agendamento, Long agendaId, Long userId, 
                                         Long motoristaId, Long veiculoId, Long hospitalId, 
                                         List<Long> pacientesIds) {
        // Busca as entidades no banco
        Agenda agenda = agendaRepository.findById(agendaId).orElseThrow(() -> new RuntimeException("Agenda não encontrada"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Motorista motorista = motoristaRepository.findById(motoristaId).orElseThrow(() -> new RuntimeException("Motorista não encontrado"));
        Veiculo veiculo = veiculoRepository.findById(veiculoId).orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        Hospital hospital = hospitalRepository.findById(hospitalId).orElseThrow(() -> new RuntimeException("Hospital não encontrado"));
        
        // Busca os pacientes e adiciona na lista
        List<Paciente> pacientes = pacienteRepository.findAllById(pacientesIds);

        // Configura os relacionamentos no objeto Agendamento
        agendamento.setAgenda(agenda);
        agendamento.setUser(user);
        agendamento.setMotorista(motorista);
        agendamento.setVeiculo(veiculo);
        agendamento.setHospital(hospital);
        agendamento.setPacientes(pacientes);

        // Salva no banco
        return repository.save(agendamento);
    }

    public Agendamento updateAgendamento(Long id, Agendamento novoAgendamento, Long agendaId, Long userId, 
                                     Long motoristaId, Long veiculoId, Long hospitalId, 
                                     List<Long> pacientesIds) {
    // Busca o agendamento no banco
    Agendamento agendamento = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

    // Atualiza os campos básicos
    agendamento.setServico(novoAgendamento.getServico());
    agendamento.setHorarioInic(novoAgendamento.getHorarioInic());
    agendamento.setHorarioFim(novoAgendamento.getHorarioFim());

    // Busca e atualiza os relacionamentos
    Agenda agenda = agendaRepository.findById(agendaId)
        .orElseThrow(() -> new RuntimeException("Agenda não encontrada"));
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    Motorista motorista = motoristaRepository.findById(motoristaId)
        .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));
    Veiculo veiculo = veiculoRepository.findById(veiculoId)
        .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
    Hospital hospital = hospitalRepository.findById(hospitalId)
        .orElseThrow(() -> new RuntimeException("Hospital não encontrado"));

    // Busca os pacientes
    List<Paciente> pacientes = pacienteRepository.findAllById(pacientesIds);

    // Atualiza as referências
    agendamento.setAgenda(agenda);
    agendamento.setUser(user);
    agendamento.setMotorista(motorista);
    agendamento.setVeiculo(veiculo);
    agendamento.setHospital(hospital);
    agendamento.setPacientes(pacientes);

    // Salva e retorna o agendamento atualizado
    return repository.save(agendamento);
}



        // Método para remover um paciente de um agendamento
        public Agendamento removePacienteFromAgendamento(Long agendamentoId, Long pacienteId) {
            // Encontra o agendamento pelo ID
            Agendamento agendamento = repository.findById(agendamentoId)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
    
            // Encontra o paciente pelo ID
            Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
    
            // Remove o paciente da lista de pacientes
            agendamento.getPacientes().remove(paciente);
    
            // Atualiza o agendamento no banco
            return repository.save(agendamento);
        }
        
}


