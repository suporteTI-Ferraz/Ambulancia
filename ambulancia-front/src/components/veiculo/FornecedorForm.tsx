import {useState } from "react";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import InputMask from "react-input-mask";
import ButtonSpinner from "../itens/ButtonSpinner";

interface FornecedorFormProps {
  onSave: (fornecedor: Fornecedor) => void;
  onUpdate: (id: number, fornecedor: Fornecedor) => void;
  
  onCancel: () => void;
  isModal: Boolean; 
  fornecedorToEdit: Fornecedor | null; // Para edição, ou null para criação

}

const FornecedorForm: React.FC<FornecedorFormProps> = ({ onSave, onUpdate, onCancel, fornecedorToEdit, isModal }) => {

    const initialFormData: Fornecedor = {
      id: fornecedorToEdit?.id || 0,
      nome: fornecedorToEdit?.nome || "",
      cnpj: fornecedorToEdit?.cnpj || "",
      telefone: fornecedorToEdit?.telefone || "",
      manutencoes: fornecedorToEdit?.manutencoes || [],
      deletedAt: fornecedorToEdit?.deletedAt || null,
      createdAt:  "",
    };
  const [formData, setFormData] = useState<Fornecedor>(initialFormData);
 
   const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
   const { handleLoad, dismissLoading } = useToast();  
 


     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
     };

     const handleCancel = () => {
      setFormData(initialFormData); // Redefine o formulário
      onCancel();
    };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Impede múltiplos envios enquanto está carregando
    setLoading(true); // Bloqueia enquanto a requisição está em andamento
    const toastKey = handleLoad("Carregando...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));  //Para testar o spinner
      if (fornecedorToEdit && isModal) {
        onUpdate(fornecedorToEdit.id, formData);
      } else {
        onSave(formData); // Chama a função onSave (criação ou edição)
      }    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
    } finally {
      setLoading(false); // Libera o botão após a requisição terminar
      dismissLoading(toastKey);
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div>
      <h4>Fornecedor</h4>
        <label>Nome do Fornecedor</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
      <label>CNPJ</label>
      <InputMask
        mask="99.999.999/9999-99"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
        id="cnpj"
        placeholder="00.000.000/0000-00"
      />
      </div>
      <div>
        <label>Telefone</label>
        <input 
          type="text" 
          name="telefone" 
          value={formData.telefone} 
          onChange={handleInputChange}
          required 
        />
      </div>

      {/* Componente para adicionar telefones */}

      {/* <ManutencaoForm  onTelefonesChange={handleTelefonesChange} resetTelefones={shouldResetTelefones} isModal={false} /> */}
      
      <div>
        <ButtonSpinner name={isModal ? 'Atualizar' : 'Criar'} isLoading={loading} type="submit"/>
        <button type="button" onClick={handleCancel}>
          Limpar
        </button>
      </div>
    </form>
  );
};

export default FornecedorForm;
