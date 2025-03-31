
import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import ButtonSpinner from "../itens/ButtonSpinner";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import Manutencao from "../../types/veiculo/ManutencaoType";

interface ManutencaoFormProps {
  onSave: (manutencao: Manutencao, idVeic: number, idForn: number) => void;
  onUpdate: (id: number, manutencao: Manutencao, idVeic: number, idForn: number) => void;
  onCancel: () => void;
  manutencaoToEdit: Manutencao | null; // Para edição, ou null para criação
  isModal: Boolean;
  resetManutencoes?: boolean;
  veiculos: Veiculo[];
  fornecedores: Fornecedor[];
}

const ManutencaoForm: React.FC<ManutencaoFormProps> = ({
  onSave,
  onCancel,
  onUpdate,
  isModal,
  manutencaoToEdit,
  veiculos,
  fornecedores,
}) => {
  const initialFormData: Manutencao = {
    id: manutencaoToEdit?.id || 0,
    tipoManutencao: manutencaoToEdit?.tipoManutencao || "",
    dataEntradaManutencao: manutencaoToEdit?.dataEntradaManutencao || "",
    dataSaidaManutencao: manutencaoToEdit?.dataSaidaManutencao || "",
    status: manutencaoToEdit?.status || "",
    descricaoProblema: manutencaoToEdit?.descricaoProblema || "",
    servicoRealizado: manutencaoToEdit?.servicoRealizado || "",
    custoManutencao: manutencaoToEdit?.custoManutencao || 0.0,
    deletedAt: manutencaoToEdit?.deletedAt || null,
    veiculo: manutencaoToEdit?.veiculo || null,
    fornecedor: manutencaoToEdit?.fornecedor || null,
    createdAt: ""
  };

  const [formData, setFormData] = useState<Manutencao>(initialFormData);
  const [idForn, setIdForn] = useState<number>(0);
  const [idVeic, setIdVeic] = useState<number>(0);

  useEffect(() => {
    if (manutencaoToEdit?.id) {
      console.log("🔍 Buscando manutenção ID:", manutencaoToEdit.id);

      // Encontra o veículo relacionado à manutenção
      const veiculoRelacionado = veiculos.find(v =>
        v.manutencoes.some(m => Number(m.id) === Number(manutencaoToEdit.id))
      );

      // Encontra o fornecedor relacionado à manutenção
      const fornecedorRelacionado = fornecedores.find(f =>
        f.manutencoes.some(m => Number(m.id) === Number(manutencaoToEdit.id))
      );

      console.log("✅ Veículo encontrado:", veiculoRelacionado);
      console.log("✅ Fornecedor encontrado:", fornecedorRelacionado);

      setIdForn(fornecedorRelacionado?.id || 0);
      setIdVeic(veiculoRelacionado?.id || 0);
    }
  }, [manutencaoToEdit, veiculos, fornecedores]);

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
    <Form onSubmit={handleSubmit}>
      <h4>Manutenções</h4>
      <Form.Group controlId="tipoManutencao" className="mb-3">
        <Form.Label>Tipo de Manutenção</Form.Label>
        <Form.Control
          type="text"
          name="tipoManutencao"
          value={formData.tipoManutencao}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="descricaoProblema" className="mb-3">
        <Form.Label>Descricao do Problema</Form.Label>
        <Form.Control
          type="text"
          name="descricaoProblema"
          value={formData.descricaoProblema}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="servicoRealizado" className="mb-3">
        <Form.Label>Serviço Realizado</Form.Label>
        <Form.Control
          type="text"
          name="servicoRealizado"
          value={formData.servicoRealizado}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="dataEntradaManutencao" className="mb-3">
        <Form.Label>Data de Entrada da Manutenção</Form.Label>
        <DatePicker
          selected={formData.dataEntradaManutencao ? new Date(formData.dataEntradaManutencao) : null}
          onChange={(date) =>
            setFormData({ ...formData, dataEntradaManutencao: date?.toISOString().split("T")[0] || "" })
          }
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={120}
          maxDate={new Date()}
          placeholderText="DD/MM/AAAA"
          popperPlacement="left-end"
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="dataSaidaManutencao" className="mb-3">
        <Form.Label>Data de Saída da Manutenção</Form.Label>
        <DatePicker
          selected={formData.dataSaidaManutencao ? new Date(formData.dataSaidaManutencao) : null}
          onChange={(date) =>
            setFormData({ ...formData, dataSaidaManutencao: date?.toISOString().split("T")[0] || "" })
          }
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={120}
          maxDate={new Date()}
          placeholderText="DD/MM/AAAA"
          popperPlacement="left-end"
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="custoManutencao" className="mb-3">
        <Form.Label>Custo</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="custoManutencao"
          value={formData.custoManutencao}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="status" className="mb-3">
        <Form.Label>Estado</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Selecione o estado da manutenção
          </option>
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="CONCLUIDA">Concluída</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="veiculo" className="mb-3">
        <Form.Label>Veículo:</Form.Label>
        <Select
          options={veiculos.map(v => ({ value: v.id, label: v.placaVeic }))}
          value={
            idVeic > 0
              ? { value: idVeic, label: veiculos.find(v => v.id === idVeic)?.placaVeic || "" }
              : null
          }
          onChange={(opt) => {
            if (opt) setIdVeic(opt.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="fornecedor" className="mb-3">
        <Form.Label>Fornecedor:</Form.Label>
        <Select
          options={fornecedores.map(f => ({ value: f.id, label: f.nome }))}
          value={
            idForn > 0
              ? { value: idForn, label: fornecedores.find(f => f.id === idForn)?.nome || "" }
              : null
          }
          onChange={(opt) => {
            if (opt) setIdForn(opt.value);
          }}
        />
      </Form.Group>
      <Row className="mt-3">
        <Col>
          <ButtonSpinner name={isModal ? "Atualizar" : "Criar"} isLoading={loading} type="submit" classe={""} />
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

export default ManutencaoForm;
