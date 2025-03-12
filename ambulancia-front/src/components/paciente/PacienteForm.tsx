import React, { useState } from "react";
import { Paciente } from "../../types/paciente/PacienteType";
import TelefonePacForm from "./TelefonePacForm";
import EnderecoPacForm from "./EnderecoPacForm";
import ButtonSpinner from "../itens/ButtonSpinner";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

// Validação de CPF: agora retorna um boolean
const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/[^\d]/g, '');
  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) return false;
  return true;
};

interface PacienteFormProps {
  paciente?: Paciente | null; // Para edição ou criação
  onSave: (paciente: Paciente) => void;
  onCancel: () => void;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ paciente, onSave, onCancel }) => {
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
    createdAt: "",
  };

  const [formData, setFormData] = useState<Paciente>(initialFormData);
  const [cpfError, setCpfError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loading, setLoading } = useLoading();
  const { handleLoad, dismissLoading } = useToast();
  const [shouldResetTelefones, setShouldResetTelefones] = useState(false);
  const [shouldResetEnderecos, setShouldResetEnderecos] = useState(false);
  const [validationState, setValidationState] = useState({
    nomePaciente: false,
    cpf: false,
    sus: false,
    dataNasc: false
  });

  const getInputClasses = (fieldName: string, value: string, isValid: boolean) => {
    const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none";
    if (!value) return `${baseClasses} border-red-500 focus:border-red-600`;
    return isValid 
      ? `${baseClasses} border-green-500 focus:border-green-600` 
      : `${baseClasses} border-red-500 focus:border-red-600`;
  };

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

  const handleCancel = () => {
    setShouldResetTelefones(true);
    setShouldResetEnderecos(true);
    setTimeout(() => {
      setShouldResetTelefones(false);
      setShouldResetEnderecos(false);
    }, 0);
    setFormData(initialFormData);
    onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Se algum campo obrigatório estiver inválido, mostra a mensagem de erro
    if (!validationState.nomePaciente || !validationState.cpf || !validationState.sus || !validationState.dataNasc) {
      setErrorMessage("Um ou mais campos estão inválidos. Clique aqui para fechar.");
      return;
    }
    if (loading) return;
    setLoading(true);
    const toastKey = handleLoad("Carregando...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSave(formData);
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h4>Paciente</h4>
        <label>Nome Completo</label>
        <input
          type="text"
          name="nomePaciente"
          value={formData.nomePaciente}
          onChange={(e) => {
            handleInputChange(e);
            setValidationState({
              ...validationState,
              nomePaciente: e.target.value.length > 0
            });
          }}
          className={getInputClasses('nomePaciente', formData.nomePaciente, validationState.nomePaciente)}
          required
        />
      </div>

      <div>
        <DatePicker
          selected={formData.dataNasc ? new Date(formData.dataNasc) : null}
          onChange={(date) => {
            setFormData({ ...formData, dataNasc: date?.toISOString().split("T")[0] || "" });
            setValidationState({
              ...validationState,
              dataNasc: !!date
            });
          }}
          className={getInputClasses('dataNasc', formData.dataNasc, validationState.dataNasc)}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={120}
          maxDate={new Date()}
          placeholderText="DD/MM/AAAA"
          popperPlacement="left-end"
        />
      </div>

      <div>
        <label>CPF</label>
        <InputMask
          mask="999.999.999-99"
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            const inputVal = e.target.value;
            const numericCPF = inputVal.replace(/[^\d]/g, '');
            const isValid = numericCPF.length === 11 && validateCPF(inputVal);
            setValidationState({
              ...validationState,
              cpf: isValid
            });
            if (!isValid && numericCPF.length === 11) {
              setCpfError("CPF inválido");
            } else {
              setCpfError("");
            }
          }}
          className={getInputClasses('cpf', formData.cpf, validationState.cpf)}
          required
        />
        {cpfError && <div className="text-red-500 text-sm mt-1">{cpfError}</div>}
      </div>

      <div>
        <label>SUS</label>
        <input 
          type="text" 
          name="sus" 
          value={formData.sus}
          onChange={(e) => {
            handleInputChange(e);
            setValidationState({
              ...validationState,
              sus: e.target.value.length > 0
            });
          }}
          className={getInputClasses('sus', formData.sus, validationState.sus)}
          required 
        />
      </div>

      <div>
        <label>Condições Específicas</label>
        <input
          type="text"
          name="condicoesEspecificas"
          placeholder="(EX: Cadeirante)"
          value={formData.condicoesEspecificas}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <TelefonePacForm onTelefonesChange={handleTelefonesChange} resetTelefones={shouldResetTelefones} isModal={false} />
      <EnderecoPacForm onEnderecosChange={handleEnderecosChange} resetEnderecos={shouldResetEnderecos} isModal={false} />

      {errorMessage && (
        <div
          className="mt-2 bg-red-100 text-red-700 px-4 py-2 rounded cursor-pointer"
          onClick={() => setErrorMessage("")}
        >
          {errorMessage}
        </div>
      )}

      <div className="mt-4 space-x-2">
        <ButtonSpinner name="Salvar" isLoading={loading} type="submit" />
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Limpar
        </button>
      </div>
    </form>
  );
};

export default PacienteForm;
