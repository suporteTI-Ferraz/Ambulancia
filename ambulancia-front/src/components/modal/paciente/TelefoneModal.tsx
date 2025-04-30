import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { TelefonePac } from "../../../types/paciente/TelefonePacType";
import TelefonePacForm from "../../paciente/TelefonePacForm";
import ButtonSpinner from "../../itens/ButtonSpinner";
import { useLoading } from "../../../contexts/LoadingContext";
import { useToast } from "../../../hooks/useToast";
interface TelefoneModalProps {
  telefones: TelefonePac[]; // Deve ser um array de objetos do tipo TelefonePac
  isOpen: boolean;          // Define se o modal está aberto
  toggle: () => void;       // Função para alternar o estado do modal
  onTelefonesChange: (telefones: TelefonePac[]) => void; // Callback para mudanças
}


const TelefoneModal: React.FC<TelefoneModalProps> = ({
  telefones,
  isOpen,
  toggle,
  onTelefonesChange,
}) => {
  const [originalTelefones, setOriginalTelefones] = useState<TelefonePac[]>([]); // Telefones cadastrados
  const [currentTelefones, setCurrentTelefones] = useState<TelefonePac[]>([]); // Telefones no formulário
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast();  const [shouldResetTelefones, setShouldResetTelefones] = useState(false);

  useEffect(() => {
    setOriginalTelefones(telefones); // Telefones para exibição
    setCurrentTelefones(telefones); // Telefones para edição no formulário
  }, [telefones]);

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const toastKey = handleLoad("Carregando...")
    if (loading) return;
  
    const isValid = currentTelefones.every(
      (telefone) =>  telefone.numTel.trim() !== ""
    );

    if (!isValid) {
      alert("Todos os campos devem ser preenchidos antes de salvar!");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onTelefonesChange(currentTelefones);
      setOriginalTelefones(currentTelefones); // Atualiza a exibição apenas após salvar
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
      title="Telefones do Paciente"
      cancelText="Fechar"
    >
      <TelefonePacForm
        onTelefonesChange={setCurrentTelefones}
        isModal={true}
      />
      <ButtonSpinner name="Salvar" isLoading={loading} onClick={handleSave} classe={""} />
      {originalTelefones.length > 0 ? (
        <ul>
          {originalTelefones.map((telefone, index) => (
            <li key={index}>
              Tipo: {telefone.tipoTel}, Número: {telefone.numTel}, Status:{" "}
              {telefone.deletedAt ? "Desativado" : "Ativo"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Este paciente não possui telefones cadastrados.</p>
      )}
    </CustomModal>
  );
};



export default TelefoneModal;
