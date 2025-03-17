import { useEffect, useState } from "react";
import Manutencao from "../../types/veiculo/ManutencaoType";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import ButtonSpinner from "../itens/ButtonSpinner";
import { Veiculo } from "../../types/veiculo/VeiculoType";

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

      // Atualiza a manutenção com os objetos completos de veículo e fornecedor
      setIdForn(fornecedorRelacionado?.id || 0)
      setIdVeic(veiculoRelacionado?.id || 0)
    }
  }, [manutencaoToEdit]);



  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast();






  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({ ...formData, [name]: value });
  };
  const handleCancel = () => {
    setFormData(initialFormData); // Redefine o formulário
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
        onUpdate(manutencaoToEdit.id, formData, idVeic, idForn)
      } else {
        onSave(formData, idVeic, idForn);
      }

    } catch (error) {
      console.error("Erro ao salvar telefones:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };



  return (
    <form onSubmit={handleSubmit}>

      <div>
        <h4>Manutenções</h4>
        <label>Tipo de Manutenção</label>
        <input
          type="text"
          name="tipoManutencao"
          value={formData.tipoManutencao}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Descricao do Problema</label>
        <input
          type="text"
          name="descricaoProblema"
          value={formData.descricaoProblema}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Serviço Realizado</label>
        <input
          type="text"
          name="servicoRealizado"
          value={formData.servicoRealizado}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Data de Entrada da Manutenção</label>
        <DatePicker
          selected={formData.dataEntradaManutencao ? new Date(formData.dataEntradaManutencao) : null}
          onChange={(date) => setFormData({ ...formData, dataEntradaManutencao: date?.toISOString().split("T")[0] || "" })}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={120}
          maxDate={new Date()}
          placeholderText="DD/MM/AAAA"
          popperPlacement="left-end"
        />
      </div>
      <div>
        <label>Data de Saída da Manutenção</label>
        <DatePicker
          selected={formData.dataSaidaManutencao ? new Date(formData.dataSaidaManutencao) : null}
          onChange={(date) => setFormData({ ...formData, dataSaidaManutencao: date?.toISOString().split("T")[0] || "" })}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={120}
          maxDate={new Date()}
          placeholderText="DD/MM/AAAA"
          popperPlacement="left-end"
        />
      </div>

      <div>
        <label>Custo</label>
        <input
          type="number"
          step="0.01"
          name="custoManutencao"
          value={formData.custoManutencao}
          onChange={handleInputChange}

        />
      </div>
      <div>
        <label>Estado</label>
        <select
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
      <div>
        <label>Veículo:</label>
        <Select
          options={veiculos.map(v => ({ value: v.id, label: v.placaVeic }))}
          value={idVeic > 0 ? { value: idVeic, label: veiculos.find(v => v.id === idVeic)?.placaVeic || "" } : null}
          onChange={(opt) => {
            if (opt) setIdVeic(opt.value);
          }}
        />
      </div>

      <div>
        <label>Fornecedor:</label>
        <Select
          options={fornecedores.map(f => ({ value: f.id, label: f.nome }))}
          value={idForn > 0 ? { value: idForn, label: fornecedores.find(f => f.id === idForn)?.nome || "" } : null}
          onChange={(opt) => {
            if (opt) setIdForn(opt.value);
          }}
        />
      </div>


      <div>
        <ButtonSpinner name={isModal ? 'Atualizar' : 'Criar'} isLoading={loading} type="submit" />
        <button type="button" onClick={handleCancel}>
          Limpar
        </button>

      </div>
    </form>
  );
};

export default ManutencaoForm;