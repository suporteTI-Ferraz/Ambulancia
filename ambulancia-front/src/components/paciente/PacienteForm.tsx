import React, { useState } from "react";
import { Alert, Button, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import { Paciente } from "../../types/paciente/PacienteType";
import EnderecoPacForm from "./EnderecoPacForm";
import TelefonePacForm from "./TelefonePacForm";

import '../../styles/PacienteForm.css'

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

    // Validação dos campos obrigatórios
    if (!validationState.nomePaciente || !validationState.cpf || !validationState.sus || !validationState.dataNasc) {
      setErrorMessage("Um ou mais campos estão inválidos. Clique aqui para fechar.");
      return;
    }

    if (loading) return;
    setLoading(true);
    const toastKey = handleLoad("Carregando...");

    try {
      // Converter a data de dd/mm/aaaa para yyyy-mm-dd
      const [day, month, year] = formData.dataNasc.split('/');
      const dataNascBackend = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      // Montar o objeto com a data formatada
      const payload = {
        ...formData,
        dataNasc: dataNascBackend, // Sobrescreve com o formato que o backend espera
      };

      // Simulação de requisição (substitua por fetch/axios se necessário)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSave(payload); // Envia o payload formatado
      console.log("Enviando:", payload); // Para depuração
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
      setErrorMessage("Erro ao salvar paciente. Tente novamente.");
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };

  return (
    <div className="form-user-paciente">
      <Form onSubmit={handleSubmit} className="container-global-pacientes">
        <div className="container-inputs">
          <h4 className="titulo-paciente">Paciente</h4>
          {/* nome do paciente */}
          <Form.Group controlId="nomePaciente" className="form-input-paciente">
            <Form.Label>Nome do Paciente</Form.Label>
            <Form.Control className="validacao-campo"
              type="text"
              name="nomePaciente"
              value={formData.nomePaciente}
              onChange={(e) => {
                handleInputChange(e);
                setValidationState({
                  ...validationState,
                  nomePaciente: e.target.value.trim().length > 0
                });
              }}
              isValid={validationState.nomePaciente}
              isInvalid={!validationState.nomePaciente && formData.nomePaciente.length > 0}
              required
            />
            <Form.Control.Feedback type="valid">Nome válido!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Por favor, insira um nome.</Form.Control.Feedback>
          </Form.Group>
        
          {/* data de nascimento */}
          <Form.Group controlId="dataNasc" className="form-input-paciente">
            <Form.Label>Data Nascimento</Form.Label>
            <br />
            <input
              type="text"
              value={formData.dataNasc}
              onChange={(e) => {
                // Obtendo a string digitada
                let value = e.target.value;

                // Remover tudo o que não for número
                value = value.replace(/\D/g, '');

                // Adicionando a formatação dd/mm/aaaa
                if (value.length <= 2) {
                  value = value.replace(/(\d{2})/, '$1');
                } else if (value.length <= 4) {
                  value = value.replace(/(\d{2})(\d{2})/, '$1/$2');
                } else {
                  value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
                }

                // Atualizar o campo com a formatação visual
                setFormData({ ...formData, dataNasc: value });

                // Validação: verificar se a data é válida, se o dia é válido para o mês e ano
                const [day, month, year] = value.split('/').map((v) => parseInt(v, 10));
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                
                // Verificar se o mês é válido
                const isMonthValid = month > 0 && month <= 12;

                // Verificar se o dia é válido para o mês e ano
                const isDayValid = day > 0 && day <= new Date(year, month, 0).getDate(); // 'new Date(year, month, 0)' retorna o último dia do mês

                // Criar a data para validar se ela não é no futuro
                const inputDate = new Date(year, month - 1, day);
                const isValid = isDayValid && isMonthValid && year >= 1900 && inputDate <= currentDate;

                // Atualizar o estado de validação
                setValidationState({
                  ...validationState,
                  dataNasc: isValid,
                });
              }}
              className={`form-control ${validationState.dataNasc ? 'is-valid' : ''} ${!validationState.dataNasc && formData.dataNasc ? 'is-invalid' : ''}`}
              maxLength={10} // Limitar a 10 caracteres (dd/mm/aaaa)
              placeholder="DD/MM/AAAA"
            />
            <Form.Control.Feedback type="valid">Data válida!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Por favor, insira uma data válida e não futura.</Form.Control.Feedback>
          </Form.Group>

          {/* cpf */}
          <Form.Group controlId="cpf" className="form-input-paciente">
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

          {/* numero do sus */}
          <Form.Group controlId="sus" className="form-input-paciente">
            <Form.Label>SUS</Form.Label>
            <Form.Control
              type="text"
              name="sus"
              value={formData.sus}
              onChange={(e) => {
                handleInputChange(e);
                setValidationState({
                  ...validationState,
                  sus: e.target.value.trim().length == 15
                });
              }}
              isValid={validationState.sus}
              isInvalid={!validationState.sus && formData.sus.length < 15}
              required
            />
            <Form.Control.Feedback type="valid">Número SUS válido!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Por favor, insira um número SUS.</Form.Control.Feedback>
          </Form.Group>

          {/* condicoes especiais */}
          <Form.Group controlId="condicoesEspecificas" className="form-input-paciente">
            <Form.Label>Condições Específicas</Form.Label>
            <Form.Control
              type="text"
              name="condicoesEspecificas"
              placeholder="(EX: Cadeirante)"
              value={formData.condicoesEspecificas}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>

        <TelefonePacForm onTelefonesChange={handleTelefonesChange} resetTelefones={shouldResetTelefones} isModal={false} />
        <EnderecoPacForm onEnderecosChange={handleEnderecosChange} resetEnderecos={shouldResetEnderecos} isModal={false} />

        {errorMessage && (
          <Alert variant="danger" className="mt-2" onClick={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        )}

        <div className="mt-4">
          <Button variant="primary" className="btn-salvar-pacientes" type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Salvar'}
          </Button>
          <Button variant="secondary" className="btn-limpar-pacientes" type="button" onClick={handleCancel}>
            Limpar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PacienteForm;