import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import Manutencao from "../../types/veiculo/ManutencaoType";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import ButtonSpinner from "../itens/ButtonSpinner";

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
              onChange={(e) => {
                // O valor já é no formato ISO (YYYY-MM-DD), então podemos salvar diretamente
                setFormData({
                  ...formData,
                  dataEntradaManutencao: e.target.value, // A data no formato ISO
                });
              }}
              max={new Date().toISOString().split("T")[0]} // Data máxima é a data atual
              placeholder="DD/MM/AAAA" // O input não usa o placeholder como formato, mas serve como guia visual
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="dataSaidaManutencao" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Data de Saída da Manutenção</Form.Label>


            {/* ----------------------------- mexi aqui ------------------------- */}
            <input 
              type="date"
              name="dataSaidaManutencao"
              value={formData.dataSaidaManutencao || ""}
              onChange={(e) => {
                // Convertendo a data para o formato ISO, como o DatePicker faria
                setFormData({
                  ...formData,
                  dataSaidaManutencao: e.target.value,
                });
              }}
              min={formData.dataEntradaManutencao || ""} 
              max={new Date().toISOString().split("T")[0]} // A data máxima será a data atual
              placeholder="DD/MM/AAAA" // Embora o input tenha o formato nativo, o placeholder pode ser útil para dar um guia visual
              className="form-control"
            />


          </Form.Group>
          <Form.Group controlId="custoManutencao" className="div-input-manutencao">
            <Form.Label style={{ color: "white" }}>Custo</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="custoManutencao"
              value={formData.custoManutencao}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="div-input-manutencao">
            <label style={{ color: "white" }}>Estado</label>
            <select
              className="custom-select"  // Adicionando a classe custom-select
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
            </select>
          </div>


          <div className="div-input-manutencao">
            <label style={{ color: "white" }}>Veículo:</label>
            <select
              className="custom-select"  // Mantendo a classe customizada
              name="idVeic"
              value={idVeic > 0 ? idVeic.toString() : ""}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue) setIdVeic(Number(selectedValue));
              }}
              required
            >
              <option value="" disabled>
                Selecione o veículo
              </option>
              {veiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.placaVeic}
                </option>
              ))}
            </select>
          </div>


          <div className="div-input-manutencao">
            <label style={{ color: "white" }}>Fornecedor:</label>
            <select
              className="custom-select"  // Classe customizada
              name="idForn"
              value={idForn > 0 ? idForn.toString() : ""}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue) setIdForn(Number(selectedValue));
              }}
              required
            >
              <option value="" disabled>
                Selecione o fornecedor
              </option>
              {fornecedores.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </select>
          </div>


          <Row className="div-input-manutencao">
            <Col>
              <ButtonSpinner name={isModal ? "Atualizar" : "Criar"} isLoading={loading} type="submit" classe={"botao-criar-veiculos"} />
            </Col>
            <Col>
              <Button className="botao-limpar-veiculos" type="button" onClick={handleCancel}>
                Limpar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default ManutencaoForm;
