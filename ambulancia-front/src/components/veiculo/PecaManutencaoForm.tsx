import { useEffect, useState } from "react";
import Manutencao from "../../types/veiculo/ManutencaoType";
import DatePicker from "react-datepicker";
import Select from "react-select";  
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import ButtonSpinner from "../itens/ButtonSpinner";
import PecaManutencao from "../../types/veiculo/PecaManutencaoType";

interface PecaManutencaoFormProps {
  onSave: (pecaManutencao: PecaManutencao, idManu: number) => void;
  onUpdate: (id: number, pecaManutencao: PecaManutencao, idManu: number) => void;
  onCancel: () => void;
  pecaManutencaoToEdit: PecaManutencao | null; // Para edição, ou null para criação
  isModal: Boolean; 
  resetPecasManutencoes?: boolean;
  manutencoes: Manutencao[];
}

const PecaManutencaoForm: React.FC<PecaManutencaoFormProps> = ({ 
  onSave,
  onCancel,
  onUpdate,
  isModal,
  pecaManutencaoToEdit,
  resetPecasManutencoes,
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
      if (pecaManutencaoToEdit && isModal) {
        onUpdate(pecaManutencaoToEdit.id ?? 0, formData, idManu)
      }else{
        onSave(formData, idManu);
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
                <div>
      <h4>Peças</h4>
            <label>Nome da Peça</label>
            <input
              type="text"
              name="nomePeca"
              value={formData.nomePeca}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Quantidade</label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Custo da Peça</label>
            <input
              type="number"
              step="0.01"
              name="custoUnitario"
              value={formData.custoUnitario}
              onChange={handleInputChange}
              required
            />
          </div>


<div>
  <label>Manutenções:</label>
  <Select 
    options={manutencoes.map(m => ({ value: m.id, label: m.createdAt }))} 
    value={idManu > 0 ? { value: idManu, label: manutencoes.find(m => m.id === idManu)?.createdAt || "" } : null}
    onChange={(opt) => {
      if (opt) setIdManu(opt.value);
    }} 
  />
</div>


<div>
        <ButtonSpinner name={isModal ? 'Atualizar' : 'Criar'} isLoading={loading} type="submit"/>
        <button type="button" onClick={handleCancel}>
          Limpar
        </button>
      </div>
    </div>
    </form>
  );
};

export default PecaManutencaoForm;