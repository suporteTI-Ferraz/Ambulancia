import { useState } from "react";
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
  pecaManutencaoToEdit: PecaManutencao | null; // Para edição, ou null para criação
  isModal: boolean;
  resetPecasManutencoes?: boolean;
  manutencoes: Manutencao[];
}

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
  };

  const [formData, setFormData] = useState<PecaManutencao>(initialFormData);
  const [idManu, setIdManu] = useState<number>(0);

  const { loading, setLoading } = useLoading();
  const { handleLoad, dismissLoading } = useToast();

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

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Peças</h4>
      <Form.Group controlId="nomePeca" className="mb-3">
        <Form.Label>Nome da Peça</Form.Label>
        <Form.Control
          type="text"
          name="nomePeca"
          value={formData.nomePeca}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="quantidade" className="mb-3">
        <Form.Label>Quantidade</Form.Label>
        <Form.Control
          type="number"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="custoUnitario" className="mb-3">
        <Form.Label>Custo da Peça</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="custoUnitario"
          value={formData.custoUnitario}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="manutencoes" className="mb-3">
        <Form.Label>Manutenções</Form.Label>
        <Select
          options={manutencoes.map(m => ({ value: m.id, label: m.createdAt }))}
          value={
            idManu > 0
              ? { value: idManu, label: manutencoes.find(m => m.id === idManu)?.createdAt || "" }
              : null
          }
          onChange={(opt) => {
            if (opt) setIdManu(opt.value);
          }}
        />
      </Form.Group>
      <Row className="mt-3">
        <Col>
          <ButtonSpinner name={isModal ? "Atualizar" : "Criar"} isLoading={loading} type="submit" classe="btn btn-primary" />
        </Col>
        <Col>
          <Button variant="secondary" type="button" onClick={handleCancel}>
            Limpar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PecaManutencaoForm;