
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
    quilometragemAtual: veiculoToEdit?.quilometragemAtual || 0,
    manutencoes: veiculoToEdit?.manutencoes || [],
    deletedAt: veiculoToEdit?.deletedAt || null,
    createdAt: "",
  };

  const [formData, setFormData] = useState<Veiculo>(initialFormData);
  const { loading, setLoading } = useLoading();
  const { handleLoad, dismissLoading } = useToast();

  // These extra states are used for validation
  const [placa, setPlaca] = useState<string>(formData.placaVeic);
  const [errors, setErrors] = useState<{
    placa?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    onCancel();
  };

  const validate = (): boolean => {
    const newErrors: {
      placa?: string;
    } = {};

    // Validate license plate (placa)
    // Accepts either:
    //  1) Three letters, one digit, one letter, and two digits (e.g. ABC1D23)
    //  OR
    //  2) Three letters followed by four digits (e.g. ABC1234)
    const placaRegex = /^(?:[A-Z]{3}[0-9][A-Z][0-9]{2}|[A-Z]{3}[0-9]{4})$/;
    if (!placa) {
      newErrors.placa = "Placa é obrigatória.";
    } else if (!placaRegex.test(placa)) {
      newErrors.placa = "Formato da placa inválido. Use ABC1D23 ou ABC1234.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    if (loading) return;
    setLoading(true);
    const toastKey = handleLoad("Carregando...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
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

          onChange={(e) => {
            const upper = e.target.value.toUpperCase();
            setPlaca(upper);
            setFormData({ ...formData, placaVeic: upper });
          }}
          isInvalid={!!errors.placa}
          placeholder="ABC1D23 ou ABC1234"
          required
          style={{ color: 'white' }}
        />
        <Form.Control.Feedback type="invalid">
          {errors.placa}
        </Form.Control.Feedback>

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
            className="botao-limpar-veiculos"
          >
            Limpar
          </Button>
        </Col>
      </Row>
    </Form>

  );
};

export default VeiculoForm;
