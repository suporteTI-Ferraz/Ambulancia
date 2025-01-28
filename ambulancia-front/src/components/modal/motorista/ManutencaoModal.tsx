import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import ButtonSpinner from "../../itens/ButtonSpinner";
import { useLoading } from "../../../contexts/LoadingContext";
import { useToast } from "../../../hooks/useToast";
import Manutencao from "../../../types/veiculo/ManutencaoType";
import ManutencaoForm from "../../veiculo/ManutencaoForm";
interface ManutencaoModalProps {
  manutencoes: Manutencao[]; // Deve ser um array de objetos do tipo TelefonePac
  isOpen: boolean;          // Define se o modal está aberto
  toggle: () => void;       // Função para alternar o estado do modal
  onManutencoesChange: (telefones: Manutencao[]) => void; // Callback para mudanças
}


const ManutencaoModal: React.FC<ManutencaoModalProps> = ({
  manutencoes,
  isOpen,
  toggle,
  onManutencoesChange,
}) => {
  const [originalManutencoes, setOriginalManutencoes] = useState<Manutencao[]>([]); // Manutencoes cadastrados
  const [currentManutencoes, setCurrentManutencoes] = useState<Manutencao[]>([]); // Manutencoes no formulário
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast();  const [shouldResetManutencoes, setShouldResetManutencoes] = useState(false);

  useEffect(() => {
    setOriginalManutencoes(manutencoes); // Manutencoes para exibição
    setCurrentManutencoes(manutencoes); // Manutencoes para edição no formulário
  }, [manutencoes]);

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const toastKey = handleLoad("Carregando...")
    if (loading) return;
  
    const isValid = currentManutencoes.every(
      (manutencao) =>  manutencao.tipoManutencao.trim() !== ""
    );

    if (!isValid) {
      alert("Todos os campos devem ser preenchidos antes de salvar!");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onManutencoesChange(currentManutencoes);
      setOriginalManutencoes(currentManutencoes); // Atualiza a exibição apenas após salvar
      toggle();
    } catch (error) {
      console.error("Erro ao salvar telefones:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      toggle={toggle}
      title="Manutenções do Veículo"
      cancelText="Fechar"
    >
      <ManutencaoForm
        onManutencoesChange={setCurrentManutencoes}
        isModal={true}
      />
      <ButtonSpinner name="Salvar" isLoading={loading} onClick={handleSave} />
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
