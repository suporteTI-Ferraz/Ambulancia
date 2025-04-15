
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
  
        <label>Data do agendamento:</label>
        <input 
          name="data" 
          type="date" 
          value={formData.data} 
          onChange={handleChange} 
        />
  
        <label>Serviço:</label>
        <input name="servico" value={formData.servico} onChange={handleChange} />
  
        <label>Horário Início:</label>
        <input name="horarioInic" type="time" value={formData.horarioInic} onChange={handleChange} />
  
        <label>Horário Fim:</label>
        <input name="horarioFim" type="time" value={formData.horarioFim} onChange={handleChange} />
        
        <label>Quilometragem Percorrida:</label>
        <input name="quilometragemFinal" value={formData.quilometragemFinal} onChange={handleChange} />
  
        <label>Motoristas:</label>
        <Select 
          options={motoristas.map(m => ({ value: m.id, label: m.nomeMotorista }))}
          onChange={(opt) => setFormData({ ...formData, motoristaId: opt?.value || 0 })}
        />
  
        <label>Veículos:</label>
        <Select 
          options={veiculos.map(v => ({ value: v.id, label: `${v.placaVeic} - ${v.classe}` }))}
          onChange={(opt) => setFormData({ ...formData, veiculoId: opt?.value || 0 })}
        />
  
        <label>Hospitais:</label>
        <Select 
          options={hospitais.map(h => ({
            value: h.id,
            label: `${h.nomeHosp} - ${h.enderecos.map(e => e.ruaHosp).join(" | ")}`
          }))}
          onChange={(opt) => setFormData({ ...formData, hospitalId: opt?.value || 0 })}
        />
  
        <label>Pacientes:</label>
        <Select 
          options={pacientes.map(p => ({ value: p.id, label: `${p.nomePaciente} - ${p.cpf}` }))}
          isMulti
          className="pacientes-select"
          placeholder="Selecione um ou mais pacientes..."
          onChange={(opts) => setFormData({ ...formData, pacientesIds: opts.map(opt => opt.value) })}
        />
  
        <button type="submit">Criar Agendamento</button>
      </form>
    </div>
  );
  
};

export default AgendamentoForm;
