import { useState, useEffect } from "react";
import { fetchVeiculos, createVeiculo, updateVeiculo, createManyManu,
    updateManyManu, deleteVeiculo, reactivateVeiculo
 } from "../services/api/VeiculoService";
import { Veiculo } from "../types/veiculo/VeiculoType";
import Manutencao from "../types/veiculo/ManutencaoType";
import { useToast } from "./useToast";
import { useLoading } from "../contexts/LoadingContext";
import { useGerenciarMotorista } from "./useGerenciarMotorista";

const useGerenciarVeiculo = () =>{
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);
    const  [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const [isManutencaoModalOpen, setIsManutencaoModalOpen] = useState(false);
    const [selectedManutencoes, setSelectedManutencoes] = useState<Veiculo["manutencoes"]>([]);

    const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
    const { handleError, handleSuccess } = useToast();

    useEffect(()=>{
        const loadVeiculos = async () =>{
            setLoading(true);
            try {
                const response = await fetchVeiculos();
                setVeiculos(response.data);
            } catch (error) {
                handleError("Erro ao carregar Veículos: "+ error)
            }finally{
            setLoading(false)
            }
        };
        loadVeiculos();
    }, []);

    const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
    const toggleModalManutencao = () => setIsManutencaoModalOpen(!isManutencaoModalOpen);
    const handleEdit = (veiculo: Veiculo) =>{
        setEditingVeiculo(veiculo);
        toggleEditModal();
    };

    const handleSaveVeiculo = async (veiculo: Veiculo) => {
        try {
            const response = await createVeiculo(veiculo);
            const createdVeiculo = response.data;
            setVeiculos((prevVeiculos) => 
            [...prevVeiculos, createdVeiculo]);
            handleSuccess("Veículo criado com sucesso!");
        } catch (error) {
            handleError("Erro au criar Veículo: " + error);
        }
    };

    const handleEditVeiculo = async (updatedVeiculo: Veiculo, notUpdatedVeiculo: Veiculo) =>{
        try {
            const isVeiculoChanged = updatedVeiculo.placaVeic !== notUpdatedVeiculo.placaVeic ||
            updatedVeiculo.quilometragem !== notUpdatedVeiculo.quilometragem || 
            updatedVeiculo.classe !== notUpdatedVeiculo.classe;
    
            const isManutencaoChanged = JSON.stringify(updatedVeiculo.manutencoes) !== JSON.stringify(notUpdatedVeiculo.manutencoes);
    
            if(isVeiculoChanged){
                await updateVeiculo(updatedVeiculo.id, updatedVeiculo);
            }

            if(isManutencaoChanged){
                await updateManyManu(updatedVeiculo.id, updatedVeiculo.manutencoes)
            }

            const updatedVeiculos = veiculos.map((veiculo) => 
            veiculo.id === notUpdatedVeiculo.id ? 
                veiculo: updatedVeiculo);
            setVeiculos(updatedVeiculos);
        } catch (error) {
            handleError("Erro au atualizar Veículo: " + error);
        }finally{
            toggleEditModal();
        }
           
    };

    const handleDeleteVeiculo = async (id: number, deletedAt: string | null) =>{
        try {
            let response;
            if(deletedAt){
                response = await reactivateVeiculo(id);
                handleSuccess("Veículo reativado com sucesso!");
            }else{
                response = await deleteVeiculo(id);
                handleSuccess("Veículo desativado com sucesso!");
            }

            if(response.status === 200){
                setVeiculos((prevVeiculos) =>
                prevVeiculos.map((veiculo) =>
                veiculo.id === id ? {
                    ...veiculo,
                    deletedAt: deletedAt ? null : new Date().toISOString(),
                } : veiculo
                )
                );
            };
        } catch (error) {
            handleError('Erro ao alternar status do Veículo: '+ error);
        }
    };

    
    
      const handleViewManutencoes = (veiculo: Veiculo) => {
        if (!veiculo) {
          alert("Selecione um veículo antes de gerenciar as manutenções.");
          return;
        }
        setEditingVeiculo(veiculo);
        setSelectedManutencoes(veiculo.manutencoes || []);
        toggleModalManutencao();
      };
    
    
      const handleSaveManutencoesFromModal = async (manutencoes: Manutencao[]) => {
        if (!editingVeiculo) {
          alert("Nenhum veículo está sendo editado para associar as manutenções.");
          return;
        }
        
        try {
          const response = await createManyManu(editingVeiculo.id, manutencoes); // Salva os telefones no backend
          const createdManutencoes = response.data;
          setVeiculos(prevVeiculos =>
            prevVeiculos.map(veiculo =>
                veiculo.id === editingVeiculo.id
                ? {
                    ...veiculo,
                    manutencoes: [...veiculo.manutencoes, ...createdManutencoes] // Adiciona os novos telefones à lista existente
                  }
                : veiculo
            )
          );
          handleSuccess("Manutenções criadas com sucesso!");
          
          
        } catch (error) {
          handleError("Falha ao criar Manutenções: "+ error)
        } finally {
          toggleModalManutencao(); // Fecha o modal
        }
      };

      return({ veiculos, editingVeiculo, isEditModalOpen, isManutencaoModalOpen, selectedManutencoes, loading,
        handleSaveVeiculo, handleEditVeiculo, handleEdit, handleDeleteVeiculo, handleSaveManutencoesFromModal,
        handleViewManutencoes, toggleEditModal, toggleModalManutencao, setEditingVeiculo
      }
      );

}

export default useGerenciarVeiculo;