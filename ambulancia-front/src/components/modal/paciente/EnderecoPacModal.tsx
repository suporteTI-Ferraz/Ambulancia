import React, { useEffect, useState } from "react";
import { EnderecoPac } from "../../../types/paciente/EnderecoPacType";
import CustomModal from "../CustomModal";
import EnderecoPacForm from "../../paciente/EnderecoPacForm";

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
    const [currentEnderecos, setCurrentEnderecos] = useState<EnderecoPac[]>([]);


    useEffect( () => {
        setCurrentEnderecos(enderecos)
    }, [enderecos]
    );

    const handleSave = () =>{
        const isValid = currentEnderecos.every(
            (endereco) => endereco.ruaPac.trim() !== "" && endereco.bairroPac.trim() !== ""
            && endereco.numeroPac.trim() !== "" && endereco.complementoPac.trim () !== ""
            && endereco.cepPac.trim() !== ""
        );

        if (!isValid) {
            alert("Todos os campos devem ser preenchidos antes de salvar!");
            return;
        }
        
        onEnderecosChange(currentEnderecos);
        toggle();
    }
    return (
        <CustomModal isOpen={isOpen} toggle={toggle} title="Endereços do Paciente" cancelText="Fechar">
            <EnderecoPacForm
            onEnderecosChange={setCurrentEnderecos}
            isModal={true}
            />
            <button onClick={handleSave}>Salvar</button>
            {currentEnderecos.length > 0 ? (
        <ul>
          {currentEnderecos.map((endereco, index) => (
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