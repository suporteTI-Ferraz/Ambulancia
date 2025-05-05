
import { useState, useEffect } from 'react';
import "../../styles/EditPacienteForm.css";
import { EnderecoPac } from "../../types/paciente/EnderecoPacType";
import { Paciente } from "../../types/paciente/PacienteType";
import ButtonSpinner from "../itens/ButtonSpinner";
import EnderecoPacForm from "./EnderecoPacForm";
import TelefonePacForm from "./TelefonePacForm";

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
  // Validation for date of birth
  const [dateIsValid, setDateIsValid] = useState<boolean>(false);

  useEffect(() => {
    setCurrentEnderecos(paciente?.enderecos || []);
  }, [paciente?.enderecos]);

  // Validation for date (not in future and after 1900)
  const validateDate = (value: string) => {
    if (!value) return false;
    const [year, month, day] = value.split('-').map((v) => parseInt(v, 10));
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const inputDate = new Date(year, month - 1, day);
    return inputDate <= currentDate && year >= 1900;
  };

  useEffect(() => {
    setDateIsValid(validateDate(formData.dataNasc));
  }, [formData.dataNasc]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, dataNasc: value });
    setDateIsValid(validateDate(value));
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

    // Validate date before submit
    if (!dateIsValid) {
      alert("Por favor, insira uma data de nascimento válida e não futura.");
      return;
    }

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
    <form onSubmit={handleSubmit} className="global-modal-edit-pac">
      <div className="form-modal-pacientes">
        <div className="form-input-paciente">
          <h4 className="titulo-paciente-modal-edit">Paciente</h4>
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

        <div className="form-input-paciente">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            name="dataNasc"
            value={formData.dataNasc || ""}
            onChange={handleDateChange}
            className={`form-control ${dateIsValid ? 'is-valid' : ''} ${!dateIsValid && formData.dataNasc ? 'is-invalid' : ''}`}
            max={new Date().toISOString().split("T")[0]}
            placeholder="DD/MM/AAAA"
            required
          />
          <div className="invalid-feedback" style={{ display: !dateIsValid && formData.dataNasc ? "block" : "none" }}>
            Por favor, insira uma data válida e não futura.
          </div>
          <div className="valid-feedback" style={{ display: dateIsValid ? "block" : "none" }}>
            Data válida!
          </div>
        </div>

        <div className="form-input-paciente">
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

        <div className="form-input-paciente">
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

        <div className="form-input-paciente">
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
        <ButtonSpinner name="Salvar" isLoading={isLoading} type="submit" classe={""} />
      </div>
    </form>
  );
};

export default EditPacienteForm;
