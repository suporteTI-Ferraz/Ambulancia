
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import ButtonSpinner from "../itens/ButtonSpinner";

interface VeiculoFormProps {
  onSave: (veiculo: Veiculo) => void;
  onCancel: () => void;
  onUpdate?: (id: number, veiculo: Veiculo) => void;
  isModal?: boolean;
  veiculoToEdit?: Veiculo | null;
}

const VeiculoForm: React.FC<VeiculoFormProps> = ({ onSave, onCancel, onUpdate, isModal, veiculoToEdit }) => {
  const initialFormData: Veiculo = {
    id: veiculoToEdit?.id || 0,
    placaVeic: veiculoToEdit?.placaVeic || "",
    modeloVeic: veiculoToEdit?.modeloVeic || "",
    marcaVeic: veiculoToEdit?.marcaVeic || "",
    anoFabricacao: veiculoToEdit?.anoFabricacao || 0,
    chassi: veiculoToEdit?.chassi || "",
    quilometragemAtual: veiculoToEdit?.quilometragemAtual || 0,
    classe: veiculoToEdit?.classe || "",
    manutencoes: veiculoToEdit?.manutencoes || [],
    deletedAt: veiculoToEdit?.deletedAt || null,
    createdAt: "",
  };

  const [formData, setFormData] = useState<Veiculo>(initialFormData);
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
      // Se for atualização (modal e veículo para editar) e onUpdate estiver definida, chama onUpdate
      if (veiculoToEdit && isModal && onUpdate) {
        onUpdate(veiculoToEdit.id, formData);
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
      <h4 style={{ color: 'white' }}>Veículo</h4>
      <Form.Group controlId="placaVeic">
        <Form.Label style={{ color: 'white' }}>Placa</Form.Label>
        <Form.Control
          type="text"
          name="placaVeic"
          value={formData.placaVeic}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }} // Cor da fonte no campo de input
        />
      </Form.Group>
      <Form.Group controlId="modeloVeic">
        <Form.Label style={{ color: 'white' }}>Modelo</Form.Label>
        <Form.Control
          type="text"
          name="modeloVeic"
          value={formData.modeloVeic}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }}
        />
      </Form.Group>
      <Form.Group controlId="marcaVeic">
        <Form.Label style={{ color: 'white' }}>Marca</Form.Label>
        <Form.Control
          type="text"
          name="marcaVeic"
          value={formData.marcaVeic}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }}
        />
      </Form.Group>
      <Form.Group controlId="anoFabricacao">
        <Form.Label style={{ color: 'white' }}>Ano de Fabricação</Form.Label>
        <Form.Control
          type="number"
          name="anoFabricacao"
          value={formData.anoFabricacao}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }}
        />
      </Form.Group>
      <Form.Group controlId="chassi">
        <Form.Label style={{ color: 'white' }}>Chassi</Form.Label>
        <Form.Control
          type="text"
          name="chassi"
          value={formData.chassi}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }}
        />
      </Form.Group>
      <Form.Group controlId="quilometragemAtual">
        <Form.Label style={{ color: 'white' }}>Quilometragem Atual</Form.Label>
        <Form.Control
          type="number"
          name="quilometragemAtual"
          value={formData.quilometragemAtual}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }}
        />
      </Form.Group>
      <Form.Group controlId="classe">
        <Form.Label style={{ color: 'white' }}>Classe</Form.Label>
        <Form.Control
          type="text"
          name="classe"
          value={formData.classe}
          onChange={handleInputChange}
          required
          style={{ color: 'white' }}
        />
      </Form.Group>

      {/* Botões Veiculo */}
      <Row className="div-botoes-veiculo">
        <Col>
          <ButtonSpinner
            name={veiculoToEdit ? "Atualizar" : "Criar"}
            isLoading={loading}
            type="submit"
            classe="botao-criar-veiculos"
          />
        </Col>
        <Col >
          <Button
            variant="secondary"
            type="button"
            onClick={handleCancel}
            className="botao1234"
          >
            Limpar
          </Button>
        </Col>
      </Row>
    </Form>

  );
};

export default VeiculoForm;
