import { Hospital } from "../hospital/HospitalType";
import { Motorista } from "../motorista/MotoristaType";
import { Paciente } from "../paciente/PacienteType";
import { Veiculo } from "../veiculo/VeiculoType";
import { Agenda } from "./Agenda";
export interface Agendamento {
    id: number;
    servico: string;
    horarioInic: string; // "HH:mm:ss"
    horarioFim: string; // "HH:mm:ss"
    quilometragemInicial: number;
    quilometragemFinal: number
    agenda: Agenda;
    userId: number;
    motorista: Motorista;
    veiculo: Veiculo;
    hospital: Hospital; // Nome do hospital
    pacientes: Paciente[];
    createdAt: string;
  }

  export interface CreateAgendamentoDTO {
    id?: number; // ID opcional
    servico: string;
    horarioInic: string; // "HH:mm:ss"
    horarioFim: string;  // "HH:mm:ss"
    quilometragemInicial: number;  
    agendaId: number;
    motoristaId: number;
    veiculoId: number;
    hospitalId: number;
    pacientesIds: number[];
  }

  export interface EditAgendamentoDTO {
    id: number; // ID opcional
    servico: string;
    horarioInic: string; // "HH:mm:ss"
    horarioFim: string;  // "HH:mm:ss"
    quilometragemInicial: number;  
    agendaId: number;
    motoristaId: number;
    veiculoId: number;
    hospitalId: number;
    pacientesIds: number[];
  }
  