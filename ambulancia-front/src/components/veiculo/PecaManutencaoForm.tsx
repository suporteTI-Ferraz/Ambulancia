
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import ButtonSpinner from "../itens/ButtonSpinner";
import PecaManutencao from "../../types/veiculo/PecaManutencaoType";
import Manutencao from "../../types/veiculo/ManutencaoType";

interface PecaManutencaoFormProps {
  onSave: (pecaManutencao: PecaManutencao, idManu: number) => void;
  onUpdate: (id: number, pecaManutencao: PecaManutencao, idManu: number) => void;
  onCancel: () => void;
  pecaManutencaoToEdit: PecaManutencao | null; // For editing, or null for creation
  isModal: boolean;
  resetPecasManutencoes?: boolean;
  manutencoes: Manutencao[];
}

// IMPORTANT: Ensure that your PecaManutencao type has an optional field to store the associated manutenção id.
// For example, in PecaManutencaoType you can add: manutencaoId?: number;

const PecaManutencaoForm: React.FC<PecaManutencaoFormProps> = ({
  onSave,
  onCancel,
  onUpdate,
  isModal,
  pecaManutencaoToEdit,
  manutencoes,
}) => {
  const initialFormData: PecaManutencao = {
    id: pecaManutencaoToEdit?.id || 0,
    nomePeca: pecaManutencaoToEdit?.nomePeca || "",
    quantidade: pecaManutencaoToEdit?.quantidade || 0,
    custoUnitario: pecaManutencaoToEdit?.custoUnitario || 0.0,
    deletedAt: null,
    createdAt: "",
    // If you add manutencaoId to your type, you might also initialize it here:
    // manutencaoId: pecaManutencaoToEdit?.manutencaoId || 0,
  };

  const [formData, setFormData] = useState<PecaManutencao>(initialFormData);
  const [idManu, setIdManu] = useState<number>(0);

  const { loading, setLoading } = useLoading();
  const { handleLoad, dismissLoading } = useToast();

  // If in edit mode and the peça já possui uma manutenção associada,
  // initialize idManu so that the select displays the correct value.
  useEffect(() => {
    if (pecaManutencaoToEdit && (pecaManutencaoToEdit as any).manutencaoId) {
      setIdManu((pecaManutencaoToEdit as any).manutencaoId);
    }
  }, [pecaManutencaoToEdit]);

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
    if (loading) return;
    setLoading(true);
    const toastKey = handleLoad("Carregando...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (pecaManutencaoToEdit && isModal) {
        onUpdate(pecaManutencaoToEdit.id ?? 0, formData, idManu);
      } else {
        onSave(formData, idManu);
      }
    } catch (error) {
      console.error("Erro ao salvar peça de manutenção:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };

  // Helper function to generate the label string for manutenção options
  const formatManutencaoLabel = (m: Manutencao) =>
    `${m.tipoManutencao} | ${m.veiculo?.placaVeic} | ${m.dataEntradaManutencao}`;

  const selectedManutencao = manutencoes.find((m) => m.id === idManu);

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
      <Form.Group controlId="manutencoes" className="mb-3">
        <Form.Label style={{ color: 'white' }}>Manutenções</Form.Label>
        <Select
          options={manutencoes.map((m) => ({
            value: m.id,
            label: formatManutencaoLabel(m),
          }))}
          value={
            idManu > 0 && selectedManutencao
              ? {
                  value: idManu,
                  label: formatManutencaoLabel(selectedManutencao),
                }
              : null
          }
          onChange={(opt) => {
            if (opt) setIdManu(opt.value);
          }}
          styles={{
            control: (provided) => ({
              ...provided,
              color: 'black', // Text color in select control
              borderColor: 'white', // Border color
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'white', // Text color for selected value
            }),
          }}
        />
      </Form.Group>
      <Row className="mt-3">
        <Col>
          <ButtonSpinner
            name={isModal ? "Atualizar" : "Criar"}
            isLoading={loading}
            type="submit"
            classe="btn btn-primary"
          />
        </Col>
        <Col>
          <Button
            variant="secondary"
            type="button"
            onClick={handleCancel}
          >
            Limpar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};  

export default PecaManutencaoForm;
