import React, { useState } from "react";
import { CreateAgendamentoDTO } from "../../types/agenda/Agendamento";
import { useParams } from "react-router-dom";
import Select from "react-select";  
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Hospital } from "../../types/hospital/HospitalType";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import { Paciente } from "../../types/paciente/PacienteType";
import { Motorista } from "../../types/motorista/MotoristaType";

interface AgendamentoFormProps {
  pacientes: Paciente[];
  motoristas: Motorista[];
  veiculos: Veiculo[];
  hospitais: Hospital[];
  onSave: (dto: CreateAgendamentoDTO) => void;
}

const AgendamentoForm: React.FC<AgendamentoFormProps> = ({ pacientes, motoristas, veiculos, hospitais, onSave }) => {
  const { agendaId } = useParams<{ agendaId: string }>();

  const [formData, setFormData] = useState<CreateAgendamentoDTO>({
    servico: "",
    horarioInic: "",
    horarioFim: "",
    agendaId: agendaId ? Number(agendaId) : 0,
    motoristaId: 0,
    veiculoId: 0,
    hospitalId: 0,
    pacientesIds: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="agendamento-form">
      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ width: "40%" }}>
        <h2>Criar Agendamento</h2>

        <label>Serviço:</label>
        <input name="servico" value={formData.servico} onChange={handleChange} />

        <label>Horário Início:</label>
        <input name="horarioInic" type="time" value={formData.horarioInic} onChange={handleChange} />

        <label>Horário Fim:</label>
        <input name="horarioFim" type="time" value={formData.horarioFim} onChange={handleChange} />

        {/* Selects */}
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
