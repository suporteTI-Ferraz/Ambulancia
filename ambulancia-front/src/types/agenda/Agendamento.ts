import { Hospital } from "../hospital/HospitalType";
import { Motorista } from "../motorista/MotoristaType";
import { Paciente } from "../paciente/PacienteType";
import { Veiculo } from "../veiculo/VeiculoType";
// Removed import of Agenda as it's no longer used in the backend

export interface Agendamento {
    id: number;
    servico: string;
    horarioInic: string; // "HH:mm:ss"
    horarioFim: string; // "HH:mm:ss"
    quilometragemInicial: number;
    quilometragemFinal: number;
    data: string;
    userId: number;
    motorista: Motorista;
    veiculo: Veiculo;
    hospital: Hospital;
    pacientes: Paciente[];
    createdAt: string;
}

export interface CreateAgendamentoDTO {
    id?: number; // optional ID
    servico: string;
    horarioInic: string; // "HH:mm:ss"
    horarioFim: string;  // "HH:mm:ss"
    quilometragemInicial: number;  
    quilometragemFinal: number;
    data:string;
    // Removed agendaId property as it's no longer required by the backend
    motoristaId: number;
    veiculoId: number;
    hospitalId: number;
    pacientesIds: number[];
}

export interface EditAgendamentoDTO {
    id: number;
    data:string;
    servico: string;
    horarioInic: string; // "HH:mm:ss"
    horarioFim: string;  // "HH:mm:ss"
    quilometragemInicial: number;  
    quilometragemFinal: number;
    // Removed agendaId property as it's no longer required by the backend
    motoristaId: number;
    veiculoId: number;
    hospitalId: number;
    pacientesIds: number[];
}