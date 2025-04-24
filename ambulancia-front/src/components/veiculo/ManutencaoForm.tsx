import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import Manutencao, { StatusManutencao } from "../../types/veiculo/ManutencaoType";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import ButtonSpinner from "../itens/ButtonSpinner";

interface ManutencaoFormProps {
  onSave: (manutencao: Manutencao, idVeic: number, idForn: number) => void;
  onUpdate: (id: number, manutencao: Manutencao, idVeic: number, idForn: number) => void;
  onCancel: () => void;
  manutencaoToEdit: Manutencao | null;
  isModal: Boolean;
  resetManutencoes?: boolean;
  veiculos: Veiculo[];
  fornecedores: Fornecedor[];
}

const STATUS_OPTIONS: { value: StatusManutencao; label: string }[] = [
  { value: "PENDENTE", label: "Pendente" },
  { value: "EM_ANDAMENTO", label: "Em Andamento" },
  { value: "CONCLUIDA", label: "Concluída" }
];

const ManutencaoForm: React.FC<ManutencaoFormProps> = ({
  onSave, onCancel, onUpdate, isModal, manutencaoToEdit, veiculos, fornecedores,
}) => {
  const initialFormData: Manutencao = {
    id: manutencaoToEdit?.id || 0,
    tipoManutencao: manutencaoToEdit?.tipoManutencao || "",
    dataEntradaManutencao: manutencaoToEdit?.dataEntradaManutencao || "",
    dataSaidaManutencao: manutencaoToEdit?.dataSaidaManutencao || "",
    status: manutencaoToEdit?.status || "PENDENTE",
    descricaoProblema: manutencaoToEdit?.descricaoProblema || "",
    servicoRealizado: manutencaoToEdit?.servicoRealizado || "",
    custoMaoObra: manutencaoToEdit?.custoMaoObra ?? 0,
    custoPecas: manutencaoToEdit?.custoPecas ?? 0,
    deletedAt: manutencaoToEdit?.deletedAt || null,
    veiculo: manutencaoToEdit?.veiculo || null,
    fornecedor: manutencaoToEdit?.fornecedor || null,
    createdAt: manutencaoToEdit?.createdAt || "",
    // custoManutencao: manutencaoToEdit?.custoManutencao ?? undefined, (deprecated, remove)
  };

  const [formData, setFormData] = useState<Manutencao>(initialFormData);
  const [idForn, setIdForn] = useState<number>(manutencaoToEdit?.fornecedor?.id || 0);
  const [idVeic, setIdVeic] = useState<number>(manutencaoToEdit?.veiculo?.id || 0);

  useEffect(() => {
    if (manutencaoToEdit?.id) {
      // Prefill IDs from relationships
      setIdForn(manutencaoToEdit.fornecedor?.id || 0);
      setIdVeic(manutencaoToEdit.veiculo?.id || 0);
    }
  }, [manutencaoToEdit]);

  const { loading, setLoading } = useLoading();
  const { handleLoad, dismissLoading } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? +value : value
    }));
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
      if (manutencaoToEdit && isModal) {
        onUpdate(manutencaoToEdit.id, formData, idVeic, idForn);
      } else {
        onSave(formData, idVeic, idForn);
      }
    } catch (error) {
      console.error("Erro ao salvar manutenção:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };

  return (
    <div>
      <div className="form-container-manutencao">
        <Form onSubmit={handleSubmit}>
          <h4 style={{ color: "white" }}>Manutenções</h4>
          
          <Form.Group controlId="tipoManutencao" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Tipo de Manutenção</Form.Label>
            <Form.Control
              type="text"
              name="tipoManutencao"
              value={formData.tipoManutencao}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="descricaoProblema" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Descricao do Problema</Form.Label>
            <Form.Control
              type="text"
              name="descricaoProblema"
              value={formData.descricaoProblema}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="servicoRealizado" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Serviço Realizado</Form.Label>
            <Form.Control
              type="text"
              name="servicoRealizado"
              value={formData.servicoRealizado}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="dataEntradaManutencao" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Data de Entrada da Manutenção</Form.Label>
            <input
              type="date"
              name="dataEntradaManutencao"
              value={formData.dataEntradaManutencao || ""}
              onChange={(e) => setFormData({ ...formData, dataEntradaManutencao: e.target.value })}
              max={new Date().toISOString().split("T")[0]}
              placeholder="DD/MM/AAAA"
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="dataSaidaManutencao" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Data de Saída da Manutenção</Form.Label>
            <input
              type="date"
              name="dataSaidaManutencao"
              value={formData.dataSaidaManutencao || ""}
              onChange={(e) => setFormData({ ...formData, dataSaidaManutencao: e.target.value })}
              min={formData.dataEntradaManutencao || ""}
              max={new Date().toISOString().split("T")[0]}
              placeholder="DD/MM/AAAA"
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="custoMaoObra" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Custo Mão de Obra</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="custoMaoObra"
              value={formData.custoMaoObra}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="custoPecas" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Custo de Peças</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="custoPecas"
              value={formData.custoPecas}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <div className="div-input-manutencao">
            <label style={{ color: "white" }}>Situação</label>
            <select
              className="custom-select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Selecione o estado da manutenção
              </option>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="div-input-manutencao">
            <label style={{ color: "white" }}>Veículo:</label>
            <select
              className="custom-select"
              name="idVeic"
              value={idVeic > 0 ? idVeic.toString() : ""}
              onChange={(e) => { const v = e.target.value; if (v) setIdVeic(Number(v)); }}
              required
            >
              <option value="" disabled>Selecione o veículo</option>
              {veiculos.map((v) => (
                <option key={v.id} value={v.id}>{v.placaVeic}</option>
              ))}
            </select>
          </div>
          <div className="div-input-manutencao">
            <label style={{ color: "white" }}>Fornecedor:</label>
            <select
              className="custom-select"
              name="idForn"
              value={idForn > 0 ? idForn.toString() : ""}
              onChange={(e) => { const v = e.target.value; if (v) setIdForn(Number(v)); }}
              required
            >
              <option value="" disabled>Selecione o fornecedor</option>
              {fornecedores.map((f) => (
                <option key={f.id} value={f.id}>{f.nome}</option>
              ))}
            </select>
          </div>
          <Row className="div-input-manutencao">
            <Col>
              <ButtonSpinner name={isModal ? "Atualizar" : "Criar"} isLoading={loading} type="submit" classe={"botao-criar-veiculos"} />
            </Col>
            <Col>
              <Button className="botao-limpar-veiculos" type="button" onClick={handleCancel}>Limpar</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
export default ManutencaoForm;