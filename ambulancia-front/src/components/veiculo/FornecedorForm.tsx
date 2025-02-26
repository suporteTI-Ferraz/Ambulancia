import {useState } from "react";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import ButtonSpinner from "../itens/ButtonSpinner";

interface FornecedorFormProps {
  onFornecedorChange: (fornecedor: Fornecedor) => void; // CallBack para alteracoes
  onCancel: () => void;
  isModal: Boolean; 
  fornecedor?: Fornecedor | null; // Para edição, ou null para criação

}

const FornecedorForm: React.FC<FornecedorFormProps> = ({ onFornecedorChange, onCancel, fornecedor, }) => {

    const initialFormData: Fornecedor = {
      id: fornecedor?.id || 0,
      nome: fornecedor?.nome || "",
      cnpj: fornecedor?.cnpj || "",
      telefone: fornecedor?.telefone || "",
      deletedAt: fornecedor?.deletedAt || null,
      createdAt:  "",
    };
  const [formData, setFormData] = useState<Fornecedor>(initialFormData);
   const [shouldResetFornecedores, setShouldResetFornecedores] = useState(false);
 
   const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
   const { handleLoad, dismissLoading } = useToast();  
 


     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
     };

     const handleCancel = () => {
      setShouldResetFornecedores(true); // Define a flag para resetar telefones
      // setShouldResetMultas(true);
      setTimeout(() => (setShouldResetFornecedores(false)), 0); // Reseta a flag após o reset
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
      onFornecedorChange(formData); // Chama a função onSave (criação ou edição)
    } catch (error) {
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
        <input 
            type="number" 
           
            name="cnpj"
            value={formData.cnpj}
            onChange={handleInputChange}
            required
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
        <ButtonSpinner name="Salvar" isLoading={loading} type="submit"/>
        <button type="button" onClick={handleCancel}>
          Limpar
        </button>
      </div>
    </form>
  );
};

export default FornecedorForm;
