import React, { useEffect, useState } from "react";
import { EnderecoHosp } from "../../types/hospital/EnderecoHospType";
import { buscaCepHosp } from "../../services/others/ViaCepService";
import { Spinner } from "reactstrap";
interface EnderecoFormProps {
  onEnderecosChange: (enderecos: EnderecoHosp[]) => void; // Callback para alterações
  resetEnderecos?: boolean; // Flag para resetar endereços
  isModal: Boolean; //Estiliza o botão de adicionar endereços inline se for modal
  enderecosIniciais?: EnderecoHosp[];
}

const EnderecoHospForm: React.FC<EnderecoFormProps> = ({onEnderecosChange, isModal, resetEnderecos,   enderecosIniciais = [],}) =>{
    const [localEnderecos, setLocalEnderecos] = useState<EnderecoHosp[]>([{
      id: 0,
      ruaHosp: "",
      bairroHosp: "",
      cidadeHosp: "",
      estadoHosp: "",
      cepHosp: "",
      numeroHosp: "",
      deletedAt: null
    }]);
    const [isEditHospital, setIsEditHospital] = useState<boolean>(false);
    const [isCepLoading, setIsCepLoading] = useState<boolean[]>([]); //Variável para cuidar do load do cep (api ViaCep)


    useEffect(() => {
      // Inicializar com os endereços existentes, se houver
      if (enderecosIniciais.length > 0) {
        setLocalEnderecos(enderecosIniciais);
        setIsEditHospital(true);
      }
    }, [enderecosIniciais]);



       useEffect(() => {
          if (resetEnderecos) {
            setLocalEnderecos([{
              id: 0,
              ruaHosp: "",
              bairroHosp: "",
              cidadeHosp: "",
              estadoHosp: "",
              cepHosp: "",
              numeroHosp: "",
              deletedAt: null
            }]);
            setIsCepLoading([])
            onEnderecosChange([]);
          }
        }, [resetEnderecos, onEnderecosChange]);

        const handleAddEnderecos = () => {
          const novoEndereco = { id: localEnderecos.length,
            ruaHosp: "",
            bairroHosp: "",
            cidadeHosp: "",
            estadoHosp: "",
            cepHosp: "",
            numeroHosp: "",
            deletedAt: null };
          const updatedEnderecos = [...localEnderecos, novoEndereco];
          setLocalEnderecos(updatedEnderecos);
          setIsCepLoading([...isCepLoading, false]); // Adiciona um novo estado de carregamento
          onEnderecosChange(updatedEnderecos);
        };

        const handleEnderecosChange = async (index: number, field: keyof EnderecoHosp, value: string) => {
          let formattedValue = value;
        
          // Aplica máscara ao CEP (formato: 00000-000)
          if (field === "cepHosp") {
            formattedValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
            if (formattedValue.length > 5) {
              formattedValue = formattedValue.replace(/^(\d{5})(\d)/, "$1-$2");
            }
          }
        
          const updatedEnderecos = localEnderecos.map((endereco, i) =>
            i === index ? { ...endereco, [field]: formattedValue } : endereco
          );
        
          setLocalEnderecos(updatedEnderecos);
          onEnderecosChange(updatedEnderecos);
        
          // Busca endereço automaticamente se o campo alterado for CEP e tiver 8 dígitos
          if (field === "cepHosp" && value.replace(/\D/g, "").length === 8) {
            const newLoadingState = [...isCepLoading]; //Os três pontos servem para dizer que esse objeto é difernete, para não apontar para a mesma memória!!!
            newLoadingState[index] = true; //Adiciona o estado de load para o índice atual
            setIsCepLoading(newLoadingState); // Ativa o spinner para o índice atual
            try {
              const enderecoAuto = await buscaCepHosp(value.replace(/\D/g, ""));
              if (enderecoAuto) {
                const enderecosCompletados = updatedEnderecos.map((endereco, i) =>
                  i === index ? { ...endereco, ...enderecoAuto } : endereco
                );
                setLocalEnderecos(enderecosCompletados);
                onEnderecosChange(enderecosCompletados);
              }
            } catch (error) {
              console.error("Erro ao buscar CEP:", error);
            } finally {
              const newLoadingState = [...isCepLoading];
              newLoadingState[index] = false; //Remove o estado de load do índice atual
              setIsCepLoading(newLoadingState); // Desativa o spinner para o índice atual
            }
          }
        };
        

    const handleRemoveEndereco = (index: number) => {
        const updatedEnderecos = localEnderecos.filter((_, i) => i !== index);
        const updatedLoadingState = isCepLoading.filter((_, i) => i !== index);
        setLocalEnderecos(updatedEnderecos);
        setIsCepLoading(updatedLoadingState);
        onEnderecosChange(updatedEnderecos);
        };

        return (
          <div className="form-container">
            <h4>Endereços</h4>
            {localEnderecos.map((endereco, index) => (
              <div key={index} className="forms-sec-container">
         <div>
         {isCepLoading[index] && <Spinner size="sm" />}
  <label>CEP</label>
    <input
      type="text"
      value={endereco.cepHosp}
      onChange={(e) => handleEnderecosChange(index, "cepHosp", e.target.value)}
      maxLength={9} // Limita o tamanho do campo ao formato 00000-000
    />


</div>
<div>
                  <label>Cidade</label>
                  <input
                    type="text"
                    value={endereco.cidadeHosp}
                    onChange={(e) => handleEnderecosChange(index, "cidadeHosp", e.target.value)}
                  />
                </div>
                <div>
                  <label>Rua</label>
                  <input
                    type="text"
                    value={endereco.ruaHosp}
                    onChange={(e) => handleEnderecosChange(index, "ruaHosp", e.target.value)}
                  />
                </div>
                <div>
                  <label>Bairro</label>
                  <input
                    type="text"
                    value={endereco.bairroHosp}
                    onChange={(e) => handleEnderecosChange(index, "bairroHosp", e.target.value)}
                  />
                </div>
              
                <div>
                  <label>Número</label>
                  <input
                    type="number"
                    value={endereco.numeroHosp}
                    onChange={(e) => handleEnderecosChange(index, "numeroHosp", e.target.value)}
                  />
                </div>
                {!isEditHospital && index > 0 && (
                <button type="button" onClick={() => handleRemoveEndereco(index)}>
                  Remover
                </button>
            )}
              </div>
              
            ))}
            {!isEditHospital && (
            <button 
            type="button" 
            className="btn-add" 
            style={{ marginTop: isModal ? "20px" : "0" }}
            onClick={handleAddEnderecos}>
              Adicionar Novo Endereço
            </button>
) }
          </div>
        );

};

export default EnderecoHospForm;