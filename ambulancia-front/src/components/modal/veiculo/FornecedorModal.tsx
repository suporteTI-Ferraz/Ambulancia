import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import ButtonSpinner from "../../itens/ButtonSpinner";
import { useLoading } from "../../../contexts/LoadingContext";
import { useToast } from "../../../hooks/useToast";
import FornecedorForm from "../../veiculo/FornecedorForm";
import { Fornecedor } from "../../../types/veiculo/FornecedorType";
interface FornecedorModalProps {
  fornecedores: Fornecedor[]; // Deve ser um array de objetos do tipo TelefonePac
  isOpen: boolean;          // Define se o modal está aberto
  toggle: () => void;       // Função para alternar o estado do modal
  onFornecedorChange: (fornecedor: Fornecedor) => void; // Callback para mudanças
}


const FornecedorModal: React.FC<FornecedorModalProps> = ({
    fornecedores,
  isOpen,
  toggle,
  onFornecedorChange,
}) => {
  const [originalFornecedores, setOriginalFornecedores] = useState<Fornecedor[]>([]); // Manutencoes cadastrados
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast();  

  useEffect(() => {
    setOriginalFornecedores(fornecedores); // Manutencoes para exibição
  }, [fornecedores]);

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const toastKey = handleLoad("Carregando...")
    if (loading) return;
  
 

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //setOriginalFornecedores(currentFornecedores); 
      toggle();
    } catch (error) {
      console.error("Erro ao salvar fornecedores:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      toggle={toggle}
      title="Fornecedores de Confiança"
      cancelText="Fechar"
    >
      <FornecedorForm
        onFornecedorChange={onFornecedorChange}
        isModal={true}
        onCancel={toggle}
      />
      <ButtonSpinner name="Salvar" isLoading={loading} onClick={handleSave} />
      {originalFornecedores.length > 0 ? (
        <ul>
          {originalFornecedores.map((fornecedor, index) => (
            <li key={index}>
              Tipo: {fornecedor.nome}, CNPJ: {fornecedor.cnpj}, Status:{" "}
              {fornecedor.deletedAt ? "Desativado" : "Ativo"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Não ha fornecedores cadastrados.</p>
      )}
    </CustomModal>
  );
};



export default FornecedorModal;
