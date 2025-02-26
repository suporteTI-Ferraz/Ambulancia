import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import ButtonSpinner from "../../itens/ButtonSpinner";
import { useLoading } from "../../../contexts/LoadingContext";
import { useToast } from "../../../hooks/useToast";
import Manutencao from "../../../types/veiculo/ManutencaoType";
import { Fornecedor } from "../../../types/veiculo/FornecedorType";
interface ManutencaoModalProps {
  manutencoes: Manutencao[]; // Deve ser um array de objetos do tipo TelefonePac
  fornecedores: Fornecedor[];
  isOpen: boolean;          // Define se o modal está aberto
  toggle: () => void;       // Função para alternar o estado do modal
  onManutencoesChange: (telefones: Manutencao[], idForn: number) => void; // Callback para mudanças
}


const ManutencaoModal: React.FC<ManutencaoModalProps> = ({
  manutencoes,
  isOpen,
  toggle,
  fornecedores,
}) => {
  const [originalManutencoes, setOriginalManutencoes] = useState<Manutencao[]>([]); // Manutencoes cadastrados
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast(); 

  useEffect(() => {
    setOriginalManutencoes(manutencoes); // Manutencoes para exibição
  }, [manutencoes]);

 

  return (
    <CustomModal
      isOpen={isOpen}
      toggle={toggle}
      title="Manutenções do Veículo"
      cancelText="Fechar"
    >
   
 
      {originalManutencoes.length > 0 ? (
        <ul>
          {originalManutencoes.map((manutencao, index) => (
            <li key={index}>
              Tipo: {manutencao.tipoManutencao}, Custo: {manutencao.custoManutencao}, Status:{" "}
              {manutencao.deletedAt ? "Desativado" : "Ativo"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Este paciente não possui manutenções cadastradas.</p>
      )}
    </CustomModal>
  );
};



export default ManutencaoModal;
