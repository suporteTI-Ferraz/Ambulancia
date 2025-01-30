import React, { useEffect, useState } from "react";
import { EnderecoHosp } from "../../../types/hospital/EnderecoHospType";
import CustomModal from "../CustomModal";
import EnderecoHospForm from "../../hospital/EnderecoHospForm";
import ButtonSpinner from "../../itens/ButtonSpinner";

interface EnderecoModalProps {
  enderecos: EnderecoHosp[]; // Deve ser um array de objetos do tipo TelefonePac
  isOpen: boolean;          // Define se o modal está aberto
  toggle: () => void;       // Função para alternar o estado do modal
  onEnderecosChange: (enderecos: EnderecoHosp[]) => void; // Callback para mudanças
}

const EnderecoHospModal: React.FC<EnderecoModalProps> =  ({
    enderecos,
    isOpen,
    toggle,
    onEnderecosChange,
}) =>{
    const [originalEnderecos, setOriginalEnderecos] = useState<EnderecoHosp[]>([]); // Telefones cadastrados
    const [currentEnderecos, setCurrentEnderecos] = useState<EnderecoHosp[]>([]);
    const [isLoading, setIsLoading] = useState(false);


   useEffect(() => {
        setOriginalEnderecos(enderecos); // Telefones para exibição
        setCurrentEnderecos(enderecos); // Telefones para edição no formulário
     }, [enderecos]);

   const handleSave = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (isLoading) return;

        const isValid = currentEnderecos.every(
            (endereco) => endereco.ruaHosp.trim() !== "" && endereco.bairroHosp.trim() !== ""
            && endereco.numeroHosp.trim() !== "" && endereco.cidadeHosp.trim () !== ""
            && endereco.cepHosp.trim() !== ""
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
            <EnderecoHospForm
            onEnderecosChange={setCurrentEnderecos}
            isModal={true}
            />
          <ButtonSpinner name="Salvar" isLoading={isLoading} onClick={handleSave} />
      {originalEnderecos.length > 0 ? (
        <ul>
          {originalEnderecos.map((endereco, index) => (
            <li key={index}>
              CEP: {endereco.cepHosp}, Cidade: {endereco.cidadeHosp}, Rua: {endereco.ruaHosp}, Bairro: {endereco.bairroHosp}, 
              Número: {endereco.numeroHosp}, Status: {endereco.deletedAt ? "Desativado": "Ativo"}


            </li>
          ))}
        </ul>
      ) : (
        <p>Este paciente não possui telefones cadastrados.</p>
      )}
        </CustomModal>
    );
}

export default EnderecoHospModal