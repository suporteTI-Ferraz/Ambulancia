import { Hospital } from "../hospital/HospitalType";
import { Motorista } from "../motorista/MotoristaType";
import { Paciente } from "../paciente/PacienteType";
import { Veiculo } from "../veiculo/VeiculoType";

export interface Agendamento {
    id: number;
    servico: string;
    horarioInic: string; // "HH:mm:ss"
    horarioFim: string; // "HH:mm:ss"
    agendaId: number;
    userId: number;
    motorista: Motorista;
    veiculo: Veiculo;
    hospital: Hospital; // Nome do hospital
    pacientes: Paciente[];
    createdAt: string;
  }