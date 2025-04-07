import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import InputMask from "react-input-mask";
import ButtonSpinner from "../itens/ButtonSpinner";

interface FornecedorFormProps {
  onSave: (fornecedor: Fornecedor) => void;
  onUpdate: (id: number, fornecedor: Fornecedor) => void;
  onCancel: () => void;
  isModal: boolean;
  fornecedorToEdit: Fornecedor | null; // Para edição, ou null para criação
}

const FornecedorForm: React.FC<FornecedorFormProps> = ({ 
  onSave, 
  onUpdate, 
  onCancel, 
  fornecedorToEdit, 
  isModal }) => {
  const initialFormData: Fornecedor = {
    id: fornecedorToEdit?.id || 0,
    nome: fornecedorToEdit?.nome || "",
    cnpj: fornecedorToEdit?.cnpj || "",
    telefone: fornecedorToEdit?.telefone || "",
    manutencoes: fornecedorToEdit?.manutencoes || [],
    deletedAt: fornecedorToEdit?.deletedAt || null,
    createdAt: "",
  };

  const [formData, setFormData] = useState<Fornecedor>(initialFormData);

  const { loading, setLoading } = useLoading();
  const { handleLoad, dismissLoading } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const toastKey = handleLoad("Carregando...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (fornecedorToEdit && isModal) {
        onUpdate(fornecedorToEdit.id, formData);
      } else {
        onSave(formData);
      }
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 style={{ color: 'white' }}>Fornecedores</h4>
      <Form.Group controlId="nome">
        <Form.Label style={{ color: 'white' }}>Nome do Fornecedor</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }} // Cor da fonte no campo de input
        />
      </Form.Group>
      <Form.Group controlId="cnpj">
        <Form.Label style={{ color: 'white' }}>CNPJ</Form.Label>
        <InputMask
          mask="99.999.999/9999-99"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleInputChange}
          className="form-control"
          placeholder="00.000.000/0000-00"
          required
          style={{ color: 'white' }} // Cor da fonte no campo de input
        />
      </Form.Group>
      <Form.Group controlId="telefone">
        <Form.Label style={{ color: 'white' }}>Telefone</Form.Label>
        <InputMask
          mask="(99) 99999-9999"
          name="telefone"
          value={formData.telefone}
          onChange={handleInputChange}
          className="form-control"
          placeholder="(00) 00000-0000"
          required
          style={{ color: 'white' }} // Cor da fonte no campo de input
        />
      </Form.Group>
      <div className="div-botoes-veiculo-fornecedor">
        <ButtonSpinner
          name={isModal ? "Atualizar" : "Criar"}
          isLoading={loading}
          type="submit"
          classe="botao-criar-veiculos-fornecedor"
        />

        <Button
          type="button"
          className="botao-limpar-veiculos"
          onClick={handleCancel}
        >
          Limpar
        </Button>
      </div>
    </Form>
  );
};

export default FornecedorForm;