import { useEffect, useState } from "react";
import Manutencao from "../../types/veiculo/ManutencaoType";

interface ManutencaoFormProps {
  onManutencoesChange: (manutencoes: Manutencao[]) => void; // CallBack para alteracoes
  resetManutencoes?: boolean;
  isModal: Boolean; 
  manutencoesIniciais?: Manutencao[];
}

const ManutencaoForm: React.FC<ManutencaoFormProps> = ({ onManutencoesChange, resetManutencoes, manutencoesIniciais = [], }) => {

 const [localManutencoes, setLocalManutencoes] = useState<Manutencao[]>([{ id: 0, tipoManutencao: "", custoManutencao: 0.0, deletedAt: null }]);
 const [isEditingVeiculo, setisEditingVeiculo] = useState<boolean>();
 

   useEffect(() => {
        // Inicializar com os endereços existentes, se houver
        if (manutencoesIniciais.length > 0) {
          setLocalManutencoes(manutencoesIniciais);
          setisEditingVeiculo(true);
        }
      }, [manutencoesIniciais]);
  
    // Resetar telefones ao clicar em "Limpar"
    useEffect(() => {
      if (resetManutencoes) {
        setLocalManutencoes([{ id: 0, tipoManutencao: "", custoManutencao: 0.0, deletedAt: null }]);
        onManutencoesChange([]);
      }
    }, [resetManutencoes, onManutencoesChange]);

  // Função para adicionar um novo telefone à lista
  const handleAddManutencao = () => {
    const novaManutencao = { id: 0, tipoManutencao: "", custoManutencao: 0.0, deletedAt: null };
    const updatedManutencoes = [...localManutencoes, novaManutencao];
    setLocalManutencoes(updatedManutencoes);
    onManutencoesChange(updatedManutencoes);
  };

  // Função para atualizar um telefone na lista
  const handleManutencaoChange = (index: number, field: keyof Manutencao, value: string) => {
    const updatedManutencoes = localManutencoes.map((manutencao, i) =>
      i === index ? { ...manutencao, [field]: value  } : manutencao // Garante valor válido
    );
    setLocalManutencoes(updatedManutencoes);
    onManutencoesChange(updatedManutencoes);
  };

  const handleRemoveManutencao = (index: number) => {
    const updatedManutencoes = localManutencoes.filter((_, i) => i !== index);
    setLocalManutencoes(updatedManutencoes);
    onManutencoesChange(updatedManutencoes);
  };

  return (
    <div className="form-container">
      <h4>Manutenções</h4>
      {localManutencoes.map((manutencao, index) => (
        <div key={index} className="forms-sec-container">
          <div>
            <label>Tipo de Manutenção</label>
            <input
              type="text"
              name="tipoManutencao"
              value={manutencao.tipoManutencao}
              onChange={(e) =>
                handleManutencaoChange(index, "tipoManutencao", e.target.value)
              }
            />
          </div>
          <div>
            <label>Custo</label>
            <input
              type="number"
              step="0.01"
              name="custoManutencao"
              value={manutencao.custoManutencao}
              onChange={(e) =>
                handleManutencaoChange(index, "custoManutencao", e.target.value)
              }
            />
          </div>
          {!isEditingVeiculo && index > 0 && (
            <button type="button" onClick={() => handleRemoveManutencao(index)}>
              Remover
            </button>
          )}
        </div>
      ))}
   {!isEditingVeiculo && (
      <button type="button" className="btn-add" onClick={handleAddManutencao}>
        Adicionar Nova Manutenção
      </button>
   )}
    </div>
  );
};

export default ManutencaoForm;
