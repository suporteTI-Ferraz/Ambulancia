import React, { useState } from "react";
import { Paciente } from "../../types/paciente/PacienteType";
import TelefonePacForm from "./TelefonePacForm";
import EnderecoPacForm from "./EnderecoPacForm";
import ButtonSpinner from "../itens/ButtonSpinner";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import { Form, Button, Alert } from 'react-bootstrap';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <>
      <Form onSubmit={handleSubmit}>
        <h4>Paciente</h4>

        <Form.Group controlId="nomePaciente">
          <Form.Label>Nome do Paciente</Form.Label>
          <Form.Control
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
            isValid={validationState.nomePaciente}
            isInvalid={!validationState.nomePaciente && formData.nomePaciente.length > 0}
            required
          />
          <Form.Control.Feedback type="valid">Nome válido!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Por favor, insira um nome.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="dataNasc">
          <Form.Label>Data Nascimento</Form.Label>
          <DatePicker
            selected={formData.dataNasc ? new Date(formData.dataNasc) : null}
            onChange={(date) => {
              setFormData({ ...formData, dataNasc: date?.toISOString().split("T")[0] || "" });
              setValidationState({
                ...validationState,
                dataNasc: !!date
              });
            }}
            className={`form-control ${validationState.dataNasc ? 'is-valid' : ''} ${!validationState.dataNasc && formData.dataNasc ? 'is-invalid' : ''}`}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={120}
            maxDate={new Date()}
            placeholderText="DD/MM/AAAA"
            popperPlacement="left-end"
          />
          <Form.Control.Feedback type="valid">Data válida!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Por favor, selecione uma data.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <InputMask
            mask="999.999.999-99"
            value={formData.cpf}
            onChange={(e) => {
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
          >
            {() => (
              <Form.Control
                type="text"
                name="cpf"
                isValid={validationState.cpf}
                isInvalid={!validationState.cpf && formData.cpf.length > 0}
                required
              />
            )}
          </InputMask>
          <Form.Control.Feedback type="valid">CPF válido!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{cpfError || "Por favor, insira um CPF válido."}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="sus">
          <Form.Label>SUS</Form.Label>
          <Form.Control
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
            isValid={validationState.sus}
            isInvalid={!validationState.sus && formData.sus.length > 0}
            required
          />
          <Form.Control.Feedback type="valid">Número SUS válido!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Por favor, insira um número SUS.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="condicoesEspecificas">
          <Form.Label>Condições Específicas</Form.Label>
          <Form.Control
            type="text"
            name="condicoesEspecificas"
            placeholder="(EX: Cadeirante)"
            value={formData.condicoesEspecificas}
            onChange={handleInputChange}
          />
        </Form.Group>

        <TelefonePacForm onTelefonesChange={handleTelefonesChange} resetTelefones={shouldResetTelefones} isModal={false} />
        <EnderecoPacForm onEnderecosChange={handleEnderecosChange} resetEnderecos={shouldResetEnderecos} isModal={false} />

        {errorMessage && (
          <Alert variant="danger" className="mt-2" onClick={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        )}

        <div className="mt-4">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Salvar'}
          </Button>
          <Button variant="secondary" type="button" onClick={handleCancel} className="ml-2">
            Limpar
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PacienteForm;