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
  onSave: (  manutencao: Manutencao, idVeic: number, idForn: number) => void;
  onCancel: () => void;

  resetManutencoes?: boolean;
  veiculos: Veiculo[];
  fornecedores: Fornecedor[];
  isModal: boolean; 
  manutencoesIniciais?: Manutencao[];
}

const ManutencaoForm: React.FC<ManutencaoFormProps> = ({ 
  onSave,
  onCancel,
  resetManutencoes, 
  manutencoesIniciais = [],
  veiculos,
  fornecedores,
}) => {

  const initialFormData: Manutencao = { id: 0, tipoManutencao: "", dataManutencao: "", status: "", 
        descricaoProblema: "", servicoRealizado: "", custoManutencao: 0.0, deletedAt: null };

  const [formData, setFormData] = useState<Manutencao>(initialFormData);
  const [isEditingVeiculo, setIsEditingVeiculo] = useState<boolean>(manutencoesIniciais.length > 0);
  const [idForn, setIdForn] = useState(0);
  const [idVeic, setIdVeic] = useState(0);

    const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
    const { handleLoad, dismissLoading } = useToast(); 


  

  

  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const toastKey = handleLoad("Carregando...");
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSave(formData, idVeic, idForn);
    } catch (error) {
      console.error("Erro ao salvar telefones:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <h4>Manutenções</h4>
          <div>
            <label>Tipo de Manutenção</label>
            <input
              type="text"
              name="tipoManutencao"
              value={formData.tipoManutencao}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Data da Manutenção</label>
            <DatePicker
              selected={formData.dataManutencao ? new Date(formData.dataManutencao) : null}
              onChange={(date) => setFormData({ ...formData, dataManutencao: date?.toISOString().split("T")[0] || "" })}
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

<div>
<label>Veiculo:</label>
<Select 
  options={veiculos.map(v => ({ value: v.id, label: v.placaVeic }))} 
  onChange={(opt) => {
    if (opt) setIdVeic(opt.value);
  }} 
/>
</div>
<div>
<label>Fornecedor:</label>
<Select 
  options={fornecedores.map(f => ({ value: f.id, label: f.nome }))} 
  onChange={(opt) => {
    if (opt) setIdForn(opt.value);
  }} 
/>
</div>

<div>
        <ButtonSpinner name="Salvar" isLoading={loading} type="submit"/>
        <button type="button" onClick={onCancel}>
          Limpar
        </button>
      </div>
    </div>
    </form>
  );
};

export default ManutencaoForm;