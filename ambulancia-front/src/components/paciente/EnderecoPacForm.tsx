import React, { useEffect, useState } from "react";
import { EnderecoPac } from "../../types/paciente/EnderecoPacType";

interface EnderecoFormProps {
  onEnderecosChange: (enderecos: EnderecoPac[]) => void; // Callback para alterações
  resetEnderecos?: boolean; // Flag para resetar telefones
  isModal: Boolean; //Estiliza o botão de adicionar endereços inline se for modal
}

const EnderecoPacForm: React.FC<EnderecoFormProps> = ({onEnderecosChange, isModal, resetEnderecos}) =>{
    const [localEnderecos, setLocalEnderecos] = useState<EnderecoPac[]>([{
      id: 0,
      ruaPac: "",
      bairroPac: "",
      cidadePac: "",
      estadoPac: "",
      cepPac: "",
      numeroPac: "",
      complementoPac: "",
      deletedAt: null
    }]);



       useEffect(() => {
          if (resetEnderecos) {
            setLocalEnderecos([{
              id: 0,
              ruaPac: "",
              bairroPac: "",
              cidadePac: "",
              estadoPac: "",
              cepPac: "",
              numeroPac: "",
              complementoPac: "",
              deletedAt: null
            }]);
            onEnderecosChange([]);
          }
        }, [resetEnderecos, onEnderecosChange]);

        const handleAddEnderecos = () => {
          const novoEndereco = { id: localEnderecos.length,
            ruaPac: "",
            bairroPac: "",
            cidadePac: "",
            estadoPac: "",
            cepPac: "",
            numeroPac: "",
            complementoPac: "",
            deletedAt: null };
          const updatedEnderecos = [...localEnderecos, novoEndereco];
          setLocalEnderecos(updatedEnderecos);
          onEnderecosChange(updatedEnderecos);
        };

    const handleEnderecosChange = (index: number, field: keyof EnderecoPac, value: string) =>{

        const updatedEnderecos = localEnderecos.map((endereco, i) =>
            i === index ? { ...endereco, [field]: value } : endereco
          );
          setLocalEnderecos(updatedEnderecos);
          onEnderecosChange(updatedEnderecos);
        };

    const handleRemoveEndereco = (index: number) => {
        const updatedEnderecos = localEnderecos.filter((_, i) => i !== index);
        setLocalEnderecos(updatedEnderecos);
        onEnderecosChange(updatedEnderecos);
        };

        return (
          <div className="form-container">
            <h4>Endereços</h4>
            {localEnderecos.map((endereco, index) => (
              <div key={index} className="forms-sec-container">
                <div>
                  <label>CEP</label>
                  <input
                    type="text"
                    value={endereco.cepPac}
                    onChange={(e) => handleEnderecosChange(index, "cepPac", e.target.value)}
                  />
                </div>
                <div>
                  <label>Rua</label>
                  <input
                    type="text"
                    value={endereco.ruaPac}
                    onChange={(e) => handleEnderecosChange(index, "ruaPac", e.target.value)}
                  />
                </div>
                <div>
                  <label>Bairro</label>
                  <input
                    type="text"
                    value={endereco.bairroPac}
                    onChange={(e) => handleEnderecosChange(index, "bairroPac", e.target.value)}
                  />
                </div>
                <div>
                  <label>Complemento</label>
                  <input
                    type="text"
                    placeholder="(EX: Casa, Bloco, Apartamento)"
                    value={endereco.complementoPac}
                    onChange={(e) => handleEnderecosChange(index, "complementoPac", e.target.value)}
                  />
                </div>
                <div>
                  <label>Número</label>
                  <input
                    type="text"
                    value={endereco.numeroPac}
                    onChange={(e) => handleEnderecosChange(index, "numeroPac", e.target.value)}
                  />
                </div>
                <button type="button" onClick={() => handleRemoveEndereco(index)}>
                  Remover
                </button>
              </div>
              
            ))}
            
            <button 
            type="button" 
            className="btn-add" 
            style={{ marginTop: isModal ? "20px" : "0" }}
            onClick={handleAddEnderecos}>
              Adicionar Novo Endereço
            </button>
          </div>
        );

};

export default EnderecoPacForm;