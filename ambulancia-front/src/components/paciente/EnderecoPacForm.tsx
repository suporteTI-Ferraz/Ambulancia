import React, { useState } from "react";
import { EnderecoPac } from "../../types/paciente/EnderecoPacType";

interface EnderecoFormProps {
  enderecos: EnderecoPac[]; // Adiciona a propriedade `telefones`
  onEnderecosChange: (enderecos: EnderecoPac[]) => void; // Callback para alterações
}

const EnderecoPacForm: React.FC<EnderecoFormProps> = ({onEnderecosChange}) =>{
    const [enderecos, setEnderecos] = useState<EnderecoPac[]>([
        {
            id: 0, ruaPac: "", bairroPac: "", cepPac: "", complementoPac: "", numeroPac: "", deletedAt: null,
            cidadePac: "",
            estadoPac: ""
        },

    ]);

    const handleAddEnderecos = () =>{
        setEnderecos([
            ...enderecos,
            {id: enderecos.length, ruaPac: "", bairroPac: "", cepPac: "", complementoPac: "", numeroPac: "", deletedAt: null,
                cidadePac: "",
                estadoPac: "" }
        ]);
    };

    const handleEnderecosChange = (index: number, field: keyof EnderecoPac, value: string) =>{

        const updatedEnderecos = enderecos.map((endereco, i) =>
            i === index ? { ...endereco, [field]: value } : endereco
          );
          setEnderecos(updatedEnderecos);
          onEnderecosChange(updatedEnderecos);
        };

    const handleRemoveEndereco = (index: number) => {
        const updatedEnderecos = enderecos.filter((_, i) => i !== index);
        setEnderecos(updatedEnderecos);
        onEnderecosChange(updatedEnderecos);
        };

        return (
            <div>
              <h4>Endereços</h4>
              {enderecos.map((endereco, index) => (
                <div key={index} className="endereco-container">
                <input
                    type="text"
                    placeholder="CEP"
                    value={endereco.cepPac}
                    onChange={(e) => handleEnderecosChange(index, "cepPac", e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Rua"
                    value={endereco.ruaPac}
                    onChange={(e) => handleEnderecosChange(index, "ruaPac", e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    value={endereco.bairroPac}
                    onChange={(e) => handleEnderecosChange(index, "bairroPac", e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                 <input
                    type="text"
                    placeholder="Complemento (ex: Casa, Bloco, Apartamento)"
                    value={endereco.complementoPac}
                    onChange={(e) => handleEnderecosChange(index, "complementoPac", e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="numeric"
                    placeholder="Número"
                    value={endereco.complementoPac}
                    onChange={(e) => handleEnderecosChange(index, "complementoPac", e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                  <button type="button" onClick={() => handleRemoveEndereco(index)}>
                    Remover
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddEnderecos}>
                Adicionar Endereços
              </button>
            </div>
          );     

};

export default EnderecoPacForm;