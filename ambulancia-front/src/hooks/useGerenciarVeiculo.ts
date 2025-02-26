import { useState, useEffect } from "react";
import { fetchVeiculos, createVeiculo, updateVeiculo, createManu,
    updateManyManu, deleteVeiculo, reactivateVeiculo, fetchFornecedores,
    createFornecedor, deleteFornecedor, reactivateFornecedor, fetchPecaManutencoes,
    createPecaManutencao

 } from "../services/api/VeiculoService";
import { Veiculo } from "../types/veiculo/VeiculoType";
import Manutencao from "../types/veiculo/ManutencaoType";
import { useToast } from "./useToast";
import { useLoading } from "../contexts/LoadingContext";
import { Fornecedor } from "../types/veiculo/FornecedorType";

const useGerenciarVeiculo = () =>{
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [editingVeiculo, setEditingVeiculo] = useState<Veiculo | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isGerenciarVeicOpen, setIsGerenciarVeicOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("veiculo");


    const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);
    const [isFornecedorModalOpen, setIsFornecedorModalOpen] = useState(false);
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]); 

    const [editingManutencao, setEditingManutencao] = useState<Manutencao | null>(null);
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
                handleError("Erro ao carregar Veículos: "+ error);
            }finally{
            setLoading(false);
            }
        };
        const loadFornecedores = async () => {
            setLoading(true);
            try {
                const response = await fetchFornecedores();
                setFornecedores(response.data);
            } catch (error) {
                handleError("Erro ao carregar Veículos: "+ error);
            }finally{
            setLoading(false);
            }
        }
        loadVeiculos();
        loadFornecedores();
    }, []);

    const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
    const toggleModalFornecedor = () => setIsFornecedorModalOpen(!isFornecedorModalOpen)
    const toggleModalManutencao = () => setIsManutencaoModalOpen(!isManutencaoModalOpen);
    const toggleGerenciarVeicOpen = () => setIsGerenciarVeicOpen(!isGerenciarVeicOpen)
    const handleEdit = (veiculo: Veiculo) =>{
        setEditingVeiculo(veiculo);
        toggleEditModal();
    };
    const handleEditForn = (fornecedor: Fornecedor) =>{
      setEditingFornecedor(fornecedor);
      toggleModalFornecedor();
    }

    const handleEditManu = (manutencao: Manutencao) =>{
      setEditingManutencao(manutencao);
      toggleModalManutencao();
    }

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
            updatedVeiculo.quilometragemAtual !== notUpdatedVeiculo.quilometragemAtual || 
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

    const handleViewFornecedores= () => {
        toggleModalFornecedor();
      };

      const handleSaveFornecedor = async (fornecedor: Fornecedor) => {
        
        try {
          const response = await createFornecedor(fornecedor); // Salva os telefones no backend
          const createdFornecedor = response.data;
          setFornecedores((prevFornecedores) => 
            [...prevFornecedores, createdFornecedor]);
          
          handleSuccess("Manutenções criadas com sucesso!");
          
          
        } catch (error) {
            console.log(error)
          handleError("Falha ao criar Manutenções: "+ error)
        } finally {
          //toggleModalManutencao(); // Fecha o modal
        }
      };

      const handleDeleteFornecedor = async (id: number, deletedAt: string | null) =>{
        try {
            let response;
            if(deletedAt){
                response = await reactivateFornecedor(id);
                handleSuccess("Fornecedor reativado com sucesso!");
            }else{
                response = await deleteFornecedor(id);
                handleSuccess("Fornecedor desativado com sucesso!");
            }

            if(response.status === 200){
                setFornecedores((prevFornecedores) =>
                  prevFornecedores.map((fornecedor) =>
                    fornecedor.id === id ? {
                    ...fornecedor,
                    deletedAt: deletedAt ? null : new Date().toISOString(),
                } : fornecedor
                )
                );
            };
        } catch (error) {
            handleError('Erro ao alternar status do Veículo: '+ error);
        }
    };

    
    
     const handleViewManutencoes= (veiculo: Veiculo) => {
        if (!veiculo) {
          alert("Selecione um veículo antes de gerenciar os telefones.");
          return;
        }
        setEditingVeiculo(veiculo);
        setSelectedManutencoes(veiculo.manutencoes || []);
        toggleModalManutencao();
      };
    
    
    
      const handleSaveManutencoesFromModal = async (manutencao: Manutencao, idVeic: number, idForn: number) => {
  
        
        try {
          const response = await createManu( idVeic, idForn, manutencao); // Salva os telefones no backend
          const createdManutencao = response.data;
          setVeiculos(prevVeiculos =>
            prevVeiculos.map(veiculo =>
                veiculo.id === idVeic
                ? {
                    ...veiculo,
                    manutencoes: [...veiculo.manutencoes, createdManutencao] // Adiciona os novos telefones à lista existente
                  }
                : veiculo
            )
          );
          handleSuccess("Manutenções criadas com sucesso!");
          
          
        } catch (error) {
            console.log(error)
          handleError("Falha ao criar Manutenções: "+ error)
        } finally {
          toggleModalManutencao(); // Fecha o modal
        }
      };

      return({ veiculos, editingVeiculo, isEditModalOpen, isManutencaoModalOpen, selectedManutencoes, loading,
        fornecedores, activeTab,
        handleSaveVeiculo, handleEditVeiculo, handleEdit, handleDeleteVeiculo, handleSaveManutencoesFromModal,
        handleViewManutencoes, toggleEditModal, toggleModalManutencao, setEditingVeiculo,
        handleViewFornecedores, handleSaveFornecedor, toggleGerenciarVeicOpen,
        handleEditForn, setEditingFornecedor, handleDeleteFornecedor, setActiveTab,
        handleEditManu, setEditingManutencao,
      }
      );

}

export default useGerenciarVeiculo;