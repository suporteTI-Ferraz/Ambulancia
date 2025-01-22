import React, { useEffect, useState } from "react";
import { EnderecoPac } from "../../../types/paciente/EnderecoPacType";
import CustomModal from "../CustomModal";
import EnderecoPacForm from "../../paciente/EnderecoPacForm";
import ButtonSpinner from "../../itens/ButtonSpinner";

interface EnderecoModalProps {
  enderecos: EnderecoPac[]; // Deve ser um array de objetos do tipo TelefonePac
  isOpen: boolean;          // Define se o modal está aberto
  toggle: () => void;       // Função para alternar o estado do modal
  onEnderecosChange: (enderecos: EnderecoPac[]) => void; // Callback para mudanças
}

const EnderecoPacModal: React.FC<EnderecoModalProps> =  ({
    enderecos,
    isOpen,
    toggle,
    onEnderecosChange,
}) =>{
    const [originalEnderecos, setOriginalEnderecos] = useState<EnderecoPac[]>([]); // Telefones cadastrados
    const [currentEnderecos, setCurrentEnderecos] = useState<EnderecoPac[]>([]);
    const [isLoading, setIsLoading] = useState(false);


   useEffect(() => {
        setOriginalEnderecos(enderecos); // Telefones para exibição
        setCurrentEnderecos(enderecos); // Telefones para edição no formulário
     }, [enderecos]);

   const handleSave = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (isLoading) return;

        const isValid = currentEnderecos.every(
            (endereco) => endereco.ruaPac.trim() !== "" && endereco.bairroPac.trim() !== ""
            && endereco.numeroPac.trim() !== "" && endereco.complementoPac.trim () !== ""
            && endereco.cepPac.trim() !== ""
        );

        if (!isValid) {
            alert("Todos os campos devem ser preenchidos antes de salvar!");
            return;
        }

        setIsLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          onEnderecosChange(currentEnderecos);
          setOriginalEnderecos(currentEnderecos); // Atualiza a exibição apenas após salvar
          toggle();
        } catch (error) {
          console.error("Erro ao salvar endereços:", error);
        } finally {
          setIsLoading(false);
        }
      };
    return (
        <CustomModal isOpen={isOpen} toggle={toggle} title="Endereços do Paciente" cancelText="Fechar">
            <EnderecoPacForm
            onEnderecosChange={setCurrentEnderecos}
            isModal={true}
            />
          <ButtonSpinner name="Salvar" isLoading={isLoading} onClick={handleSave} />
      {originalEnderecos.length > 0 ? (
        <ul>
          {originalEnderecos.map((endereco, index) => (
            <li key={index}>
              CEP: {endereco.cepPac}, Rua: {endereco.ruaPac}, Bairro: {endereco.bairroPac}, 
              Complemento: {endereco.complementoPac}, Número: {endereco.numeroPac}, Status: {endereco.deletedAt ? "Desativado": "Ativo"}


            </li>
          ))}
        </ul>
      ) : (
        <p>Este paciente não possui telefones cadastrados.</p>
      )}
        </CustomModal>
    );
}

export default EnderecoPacModal