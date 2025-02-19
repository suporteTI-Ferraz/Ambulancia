import { useEffect, useState } from "react";
import { Fornecedor } from "../../types/veiculo/FornecedorType";

interface FornecedorFormProps {
  onFornecedoresChange: (fornecedores: Fornecedor[]) => void; // CallBack para alteracoes
  resetFornecedores?: boolean;
  isModal: Boolean; 
  fornecedoresIniciais?: Fornecedor[];
}

const ManutencaoForm: React.FC<FornecedorFormProps> = ({ onFornecedoresChange, resetFornecedores, fornecedoresIniciais = [], }) => {

 const [localFornecedores, setLocalFornecedores] = useState<Fornecedor[]>([{ id: 0, nome: "", cnpj: "", telefone: "", deletedAt: null }]);
 const [isEditingVeiculo, setisEditingVeiculo] = useState<boolean>();
 

   useEffect(() => {
        // Inicializar com os endereços existentes, se houver
        if (fornecedoresIniciais.length > 0) {
            setLocalFornecedores(fornecedoresIniciais);
          setisEditingVeiculo(true);
        }
      }, [fornecedoresIniciais]);
  
    // Resetar telefones ao clicar em "Limpar"
    useEffect(() => {
      if (resetFornecedores) {
        setLocalFornecedores([{ id: 0, nome: "", cnpj: "", telefone: "", deletedAt: null }]);
        onFornecedoresChange([]);
      }
    }, [resetFornecedores, onFornecedoresChange]);

  // Função para adicionar um novo telefone à lista
  const handleAddFornecedor = () => {
    const novoFornecedor = { id: 0, nome: "", cnpj: "", telefone: "", deletedAt: null };
    const updatedFornecedores = [...localFornecedores, novoFornecedor];
    setLocalFornecedores(updatedFornecedores);
    onFornecedoresChange(updatedFornecedores);
  };

  // Função para atualizar um telefone na lista
  const handleFornecedorChange = (index: number, field: keyof Fornecedor, value: string) => {
    const updatedFornecedores = localFornecedores.map((fornecedor, i) =>
      i === index ? { ...fornecedor, [field]: value  } : fornecedor // Garante valor válido
    );
    setLocalFornecedores(updatedFornecedores);
    onFornecedoresChange(updatedFornecedores);
  };

  const handleRemoveFornecedor = (index: number) => {
    const updatedFornecedores = localFornecedores.filter((_, i) => i !== index);
    setLocalFornecedores(updatedFornecedores);
    onFornecedoresChange(updatedFornecedores);
  };

  return (
    <div className="form-container">
      <h4>Manutenções</h4>
      {localFornecedores.map((fornecedor, index) => (
        <div key={index} className="forms-sec-container">
          <div>
            <label>Nome do FOrnecedor</label>
            <input
              type="text"
              name="nome"
              value={fornecedor.nome}
              onChange={(e) =>
                handleFornecedorChange(index, "nome", e.target.value)
              }
            />
          </div>
          <div>
            <label>CNPJ</label>
            <input
              type="text"
              name="cnpj"
              value={fornecedor.cnpj}
              onChange={(e) =>
                handleFornecedorChange(index, "cnpj", e.target.value)
              }
            />
          </div>
          <div>
            <label>CNPJ</label>
            <input
              type="text"
              name="telefone"
              value={fornecedor.telefone}
              onChange={(e) =>
                handleFornecedorChange(index, "telefone", e.target.value)
              }
            />
          </div>
          {!isEditingVeiculo && index > 0 && (
            <button type="button" onClick={() => handleRemoveFornecedor(index)}>
              Remover
            </button>
          )}
        </div>
      ))}
   {!isEditingVeiculo && (
      <button type="button" className="btn-add" onClick={handleAddFornecedor}>
        Adicionar Nova Manutenção
      </button>
   )}
    </div>
  );
};

export default ManutencaoForm;
