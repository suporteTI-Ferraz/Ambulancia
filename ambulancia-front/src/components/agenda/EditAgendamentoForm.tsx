import React, { useState } from "react";
import { Agendamento, CreateAgendamentoDTO, EditAgendamentoDTO } from "../../types/agenda/Agendamento";
import { useParams } from "react-router-dom";
import Select, { SingleValue } from "react-select";  
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Hospital } from "../../types/hospital/HospitalType";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import { Paciente } from "../../types/paciente/PacienteType";
import { Motorista } from "../../types/motorista/MotoristaType";

interface EditAgendamentoFormProps {
  agendamento: Agendamento | null;
  pacientes: Paciente[];
  motoristas: Motorista[];
  veiculos: Veiculo[];
  hospitais: Hospital[];
  onSave: (dto: EditAgendamentoDTO) => void;
}

const EditAgendamentoForm: React.FC<EditAgendamentoFormProps> = ({ agendamento, pacientes, motoristas, veiculos, hospitais, onSave }) => {
  const { agendaId } = useParams<{ agendaId: string }>();

  const [formData, setFormData] = useState<EditAgendamentoDTO>({
    id: agendamento?.id || 0,
    servico: agendamento?.servico || "",
    horarioInic: agendamento?.horarioInic || "",
    horarioFim: agendamento?.horarioFim || "",
    quilometragemInicial: agendamento?.quilometragemInicial || 0,
    quilometragemFinal: 0,


    
    agendaId: agendaId ? Number(agendaId) : 0,
    motoristaId: agendamento?.motorista.id || 0,
    veiculoId: agendamento?.veiculo.id || 0,
    hospitalId: agendamento?.hospital.id || 0,
    pacientesIds: agendamento?.pacientes.map(p => p.id) || []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const quilometragemFinalCalculada = formData.quilometragemInicial + formData.quilometragemFinal;
  
    onSave({ 
      ...formData, 
      quilometragemFinal: quilometragemFinalCalculada
    });
  };

  const handleVehicleChange = (opt: SingleValue<{ value: number; label: string | undefined }>) => {
    if (opt) {
      const selectedVehicle = veiculos.find(v => v.id === opt.value);
      setFormData({
        ...formData,
        veiculoId: opt.value,
        quilometragemInicial: selectedVehicle ? selectedVehicle.quilometragemAtual : 0
      });
    } else {
      setFormData({
        ...formData,
        veiculoId: 0,
        quilometragemInicial: 0
      });
    }
  };

  const handleKilometragemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quilometragemFinal = Number(e.target.value) || 0;
    setFormData({ 
      ...formData, 
      quilometragemFinal 
    });
  };
  

  return (
    <div className="form-container">
      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ width: "40%" }}>
        <h2>Criar Agendamento</h2>

        <label>Serviço:</label>
        <input name="servico" value={formData.servico} onChange={handleChange} />

        <label>Horário Início:</label>
        <input name="horarioInic" type="time" value={formData.horarioInic} onChange={handleChange} />

        <label>Horário Fim:</label>
        <input name="horarioFim" type="time" value={formData.horarioFim} onChange={handleChange} />

        <label>Quilometragem Percorrida:</label>
<input 
  name="quilometragemPercorrida" 
  type="number"
  value={formData.quilometragemFinal} 
  onChange={handleKilometragemChange} 
/>

        {/* Selects */}
        <Select 
  options={motoristas.map(m => ({ value: m.id, label: m.nomeMotorista }))}
  value={motoristas.find(m => m.id === formData.motoristaId) ? { value: formData.motoristaId, label: motoristas.find(m => m.id === formData.motoristaId)?.nomeMotorista } : null}
  onChange={(opt) => setFormData({ ...formData, motoristaId: opt?.value || 0 })}
/>

<Select 
  options={veiculos.map(v => ({ value: v.id, label: `${v.placaVeic} - ${v.classe}` }))}
  value={veiculos.find(v => v.id === formData.veiculoId) ? { value: formData.veiculoId, label: veiculos.find(v => v.id === formData.veiculoId)?.placaVeic } : null}
  onChange={handleVehicleChange}
/>

<Select 
  options={hospitais.map(h => ({
    value: h.id,
    label: `${h.nomeHosp} - ${h.enderecos.map(e => e.ruaHosp).join(" | ")}`
  }))}
  value={hospitais.find(h => h.id === formData.hospitalId) ? { value: formData.hospitalId, label: hospitais.find(h => h.id === formData.hospitalId)?.nomeHosp } : null}
  onChange={(opt) => setFormData({ ...formData, hospitalId: opt?.value || 0 })}
/>

<Select 
  options={pacientes.map(p => ({ value: p.id, label: `${p.nomePaciente} - ${p.cpf}` }))} 
  isMulti
  className="pacientes-select"
  placeholder="Selecione um ou mais pacientes..."
  value={pacientes.filter(p => formData.pacientesIds.includes(p.id)).map(p => ({ value: p.id, label: `${p.nomePaciente} - ${p.cpf}` }))}
  onChange={(opts) => setFormData({ ...formData, pacientesIds: opts.map(opt => opt.value) })}
/>


        <button type="submit">Atualizar Agendamento</button>
      </form>

    </div>
  );
};

export default EditAgendamentoForm;
