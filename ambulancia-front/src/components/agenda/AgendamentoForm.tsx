
import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select";
import { CreateAgendamentoDTO } from "../../types/agenda/Agendamento";
import { Hospital } from "../../types/hospital/HospitalType";
import { Motorista } from "../../types/motorista/MotoristaType";
import { Paciente } from "../../types/paciente/PacienteType";
import { Veiculo } from "../../types/veiculo/VeiculoType";

interface AgendamentoFormProps {
  pacientes: Paciente[];
  motoristas: Motorista[];
  veiculos: Veiculo[];
  hospitais: Hospital[];
  onSave: (dto: CreateAgendamentoDTO) => void;
}

const AgendamentoForm: React.FC<AgendamentoFormProps> = ({ pacientes, motoristas, veiculos, hospitais, onSave }) => {
  // Inicializa data como uma string
  const [formData, setFormData] = useState<CreateAgendamentoDTO>({
    servico: "",
    horarioInic: "",
    horarioFim: "",
    quilometragemInicial: 0,
    data: "",
    quilometragemFinal: 0,
    motoristaId: 0,
    veiculoId: 0,
    hospitalId: 0,
    pacientesIds: []
  });

  // Atualiza o formData conforme os inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Ao enviar, converte a data para formato "YYYY-MM-DD"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dto: CreateAgendamentoDTO = { 
      ...formData,
      data: new Date(formData.data).toISOString().split("T")[0] // passa apenas a data
    };
    onSave(dto);
  };

  return (
    <div className="agendamento-form">
      <form className="agendamento-form-form" onSubmit={handleSubmit}>
        <h2>Criar Agendamento</h2>
  
        <div className="agendamento-form-grid">
          <div className="agendamento-form-group">
            <label>Data do agendamento:</label>
            <input 
              name="data" 
              type="date" 
              value={formData.data} 
              onChange={handleChange} 
            />
          </div>
  
          <div className="agendamento-form-group">
            <label>Serviço:</label>
            <input 
              name="servico" 
              value={formData.servico} 
              onChange={handleChange} 
            />
          </div>
  
          <div className="agendamento-form-group">
            <label>Horário Início:</label>
            <input 
              name="horarioInic" 
              type="time" 
              value={formData.horarioInic} 
              onChange={handleChange} 
            />
          </div>
  
          <div className="agendamento-form-group">
            <label>Horário Fim:</label>
            <input 
              name="horarioFim" 
              type="time" 
              value={formData.horarioFim} 
              onChange={handleChange} 
            />
          </div>
  
          <div className="agendamento-form-group">
            <label>Quilometragem Percorrida:</label>
            <input 
              name="quilometragemFinal" 
              value={formData.quilometragemFinal} 
              onChange={handleChange} 
            />
          </div>
  
          <div className="agendamento-form-group">
            <label>Motoristas:</label>
            <Select 
              className="motorista-select"
              classNamePrefix="select-ag"
              options={motoristas.map(m => ({ value: m.id, label: m.nomeMotorista }))}
              onChange={(opt) => setFormData({ ...formData, motoristaId: opt?.value || 0 })}
            />
          </div>
  
          <div className="agendamento-form-group">
            <label>Veículos:</label>
            <Select 
              className="veiculo-select"
              classNamePrefix="select-ag"
              options={veiculos.map(v => ({ value: v.id, label: `${v.placaVeic} - ${v.modeloVeic}` }))}
              onChange={(opt) => setFormData({ ...formData, veiculoId: opt?.value || 0 })}
            />
          </div>
  
          <div className="agendamento-form-group">
            <label>Hospitais:</label>
            <Select 
              className="hospital-select"
              classNamePrefix="select-ag"
              options={hospitais.map(h => ({
                value: h.id,
                label: `${h.nomeHosp} - ${h.enderecos.map(e => e.ruaHosp).join(" | ")}`
              }))}
              onChange={(opt) => setFormData({ ...formData, hospitalId: opt?.value || 0 })}
            />
          </div>
  
          <div className="agendamento-form-group full-width">
            <label>Pacientes:</label>
            <Select 
              className="pacientes-select"
              classNamePrefix="select-ag"
              options={pacientes.map(p => ({ value: p.id, label: `${p.nomePaciente} - ${p.cpf}` }))}
              isMulti
              placeholder="Selecione um ou mais pacientes..."
              onChange={(opts) => setFormData({ ...formData, pacientesIds: opts.map(opt => opt.value) })}
            />
          </div>
        </div>
  
        <button type="submit">Criar Agendamento</button>
      </form>
    </div>
  );
  
};

export default AgendamentoForm;
