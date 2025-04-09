package com.example.ambulancia.models.entities.agenda;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.example.ambulancia.models.entities.BaseEntity;
import com.example.ambulancia.models.entities.hospital.Hospital;
import com.example.ambulancia.models.entities.motorista.Motorista;
import com.example.ambulancia.models.entities.paciente.Paciente;
import com.example.ambulancia.models.entities.user.User;
import com.example.ambulancia.models.entities.veiculo.Veiculo;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "agendamentos")
public class Agendamento extends BaseEntity {
    private String servico;
    private LocalTime horarioInic;
    private LocalTime horarioFim;
    private Integer quilometragemInicial; 
    private Integer quilometragemFinal; 

    private LocalDate data;
    

    @ManyToOne(optional = false) // Um usuário cadastra o agendamento
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false) // Um motorista por agendamento
    @JoinColumn(name = "motorista_id", nullable = false)
    private Motorista motorista;

    @ManyToOne(optional = false) // Um veículo por agendamento
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @ManyToOne(optional = false) // Um hospital por agendamento
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToMany // Vários pacientes podem estar no mesmo agendamento
    @JoinTable(
        name = "agendamento_pacientes",
        joinColumns = @JoinColumn(name = "agendamento_id"),
        inverseJoinColumns = @JoinColumn(name = "paciente_id")
    )
    private List<Paciente> pacientes;


    
    
    

    //Método para juntar o dia de Agenda + a horaInic de Agendamento
    // @JsonIgnore
    //     public LocalDateTime getDataHoraInicio() {
    //     return LocalDateTime.of(agenda.getDataAgenda(), horarioInic);
    // }

      //Método para juntar o dia de Agenda + a horaFim de Agendamento
    // @JsonIgnore
    // public LocalDateTime getDataHoraFim() {
    //     return LocalDateTime.of(agenda.getDataAgenda(), horarioFim);
    // }
}
