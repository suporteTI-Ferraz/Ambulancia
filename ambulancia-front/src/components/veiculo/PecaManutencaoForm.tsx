import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ButtonSpinner from "../itens/ButtonSpinner";
import PecaManutencao from "../../types/veiculo/PecaManutencaoType";

interface PecaManutencaoFormProps {
  onSave: (pecaManutencao: PecaManutencao) => void;
  onUpdate: (id: number, pecaManutencao: PecaManutencao) => void;
  onCancel: () => void;
  pecaManutencaoToEdit: PecaManutencao | null; // For editing, or null for creation
  isModal: boolean;
}

const PecaManutencaoForm: React.FC<PecaManutencaoFormProps> = ({
  onSave,
  onCancel,
  onUpdate,
  isModal,
  pecaManutencaoToEdit,
}) => {
  const initialFormData: PecaManutencao = {
    id: pecaManutencaoToEdit?.id || 0,
    nomePeca: pecaManutencaoToEdit?.nomePeca || "",
    quantidade: pecaManutencaoToEdit?.quantidade || 0,
    custoUnitario: pecaManutencaoToEdit?.custoUnitario || 0.0,
    deletedAt: null,
    createdAt: "",
  };

  const [formData, setFormData] = useState<PecaManutencao>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, nomePeca, quantidade, custoUnitario } = formData;
    if (id) {
      onUpdate(id, formData);
    } else {
      onSave(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 style={{ color: 'white' }}>Peças</h4>
      <Form.Group controlId="nomePeca" className="mb-3">
        <Form.Label style={{ color: 'white' }}>Nome da Peça</Form.Label>
        <Form.Control
          type="text"
          name="nomePeca"
          value={formData.nomePeca}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }} // Text color in input field
        />
      </Form.Group>
      <Form.Group controlId="quantidade" className="mb-3">
        <Form.Label style={{ color: 'white' }}>Quantidade</Form.Label>
        <Form.Control
          type="number"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }}
        />
      </Form.Group>
      <Form.Group controlId="custoUnitario" className="mb-3">
        <Form.Label style={{ color: 'white' }}>Custo da Peça</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="custoUnitario"
          value={formData.custoUnitario}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }}
        />
      </Form.Group>

      <div className="div-botoes-veiculo-fornecedor">
        <ButtonSpinner
          name={isModal ? "Atualizar" : "Criar"}
          isLoading={false} // Atualize conforme a lógica de carregamento, se necessário
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

export default PecaManutencaoForm;
