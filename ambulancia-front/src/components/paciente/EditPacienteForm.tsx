import React, { useEffect, useState } from "react";
import { Paciente } from "../../types/paciente/PacienteType";
import TelefonePacForm from "./TelefonePacForm";
import EnderecoPacForm from "./EnderecoPacForm";
import ButtonSpinner from "../itens/ButtonSpinner";
import { EnderecoPac } from "../../types/paciente/EnderecoPacType";
import DatePicker from "react-datepicker";
interface PacienteFormProps {
  paciente: Paciente;
  onSave: (updatedPaciente: Paciente, notUpdatedPaciente: Paciente) => void;
  onCancel: () => void;
}

const EditPacienteForm: React.FC<PacienteFormProps> = ({ paciente, onSave }) => {
  const initialFormData: Paciente = {
    id: paciente?.id || 0,
    nomePaciente: paciente?.nomePaciente || "",
    dataNasc: paciente?.dataNasc || "",
    cpf: paciente?.cpf || "",
    sus: paciente?.sus || "",
    condicoesEspecificas: paciente?.condicoesEspecificas || "",
    enderecos: paciente?.enderecos || [],
    telefones: paciente?.telefones || [],
    deletedAt: paciente?.deletedAt || null,
    falecido: false,
    createdAt: paciente?.createdAt || "",
  };

  const [formData, setFormData] = useState<Paciente>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentEnderecos, setCurrentEnderecos] = useState<EnderecoPac[]>([]);

  useEffect(() => {
    setCurrentEnderecos(paciente?.enderecos || []);
  }, [paciente?.enderecos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTelefonesChange = (telefones: Paciente["telefones"]) => {
    setFormData({ ...formData, telefones });
  };

  const handleEnderecosChange = (enderecos: Paciente["enderecos"]) => {
    setFormData({ ...formData, enderecos });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSave(formData, paciente);
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <h4 className="form-title">Paciente</h4>
        <label className="form-label">Nome Completo</label>
        <input
          type="text"
          name="nomePaciente"
          value={formData.nomePaciente}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Data de Nascimento</label>
        <DatePicker
          selected={formData.dataNasc ? new Date(formData.dataNasc) : null}
          onChange={(date) =>
            setFormData({
              ...formData,
              dataNasc: date?.toISOString().split("T")[0] || "",
            })
          }
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={120}
          maxDate={new Date()}
          placeholderText="DD/MM/AAAA"
          className="form-datepicker"
        />
      </div>

      <div className="form-group">
        <label className="form-label">CPF</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">SUS</label>
        <input
          type="text"
          name="sus"
          value={formData.sus}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Condições Específicas</label>
        <input
          type="text"
          name="condicoesEspecificas"
          placeholder="(EX: Cadeirante)"
          value={formData.condicoesEspecificas}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <TelefonePacForm
        onTelefonesChange={handleTelefonesChange}
        resetTelefones={false}
        isModal={true}
        telefonesIniciais={paciente?.telefones || []}
      />

      <EnderecoPacForm
        onEnderecosChange={handleEnderecosChange}
        resetEnderecos={false}
        isModal={true}
        enderecosIniciais={paciente?.enderecos || []}
      />

      <div className="form-group">
        <ButtonSpinner name="Salvar" isLoading={isLoading} type="submit" />
      </div>
    </form>
  );
};

export default EditPacienteForm;
