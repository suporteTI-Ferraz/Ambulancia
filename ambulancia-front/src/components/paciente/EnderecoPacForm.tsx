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
          <div className="form-container">
            <h4>Endereços</h4>
            {enderecos.map((endereco, index) => (
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
            
            <button type="button" className="btn-add" onClick={handleAddEnderecos}>
              Adicionar Novo Endereço
            </button>
          </div>
        );

};

export default EnderecoPacForm;