import { useState, useEffect } from "react";
import { fetchVeiculos, createVeiculo, updateVeiculo, createManu,
    updateManyManu, deleteVeiculo, reactivateVeiculo, fetchFornecedores,
    createFornecedor, deleteFornecedor, reactivateFornecedor, fetchPecaManutencoes,
    createPecaManutencao,
    fetchManutencoes,
    reactivateManutencao,
    deleteManutencao,
    updateFornecedor,
    updateManutencao

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
    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);

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
        const loadManutencoes = async () => {
          setLoading(true);
          try {
              const response = await fetchManutencoes();
              setManutencoes(response.data);
          } catch (error) {
              handleError("Erro ao carregar Veículos: "+ error);
          }finally{
          setLoading(false);
          }
      }
        loadVeiculos();
        loadFornecedores();
        loadManutencoes();
    }, []);

    useEffect(() => {
        if (editingManutencao?.id) {
          console.log("🔍 Buscando manutenção ID:", editingManutencao.id);
      
          // Encontra o veículo relacionado à manutenção
          const veiculoRelacionado = veiculos.find(v => 
            v.manutencoes.some(m => Number(m.id) === Number(editingManutencao.id))
          );
      
          // Encontra o fornecedor relacionado à manutenção
          const fornecedorRelacionado = fornecedores.find(f => 
            f.manutencoes.some(m => Number(m.id) === Number(editingManutencao.id))
          );
      
          console.log("✅ Veículo encontrado:", veiculoRelacionado);
          console.log("✅ Fornecedor encontrado:", fornecedorRelacionado);
      
          // Atualiza a manutenção com os objetos completos de veículo e fornecedor, mas só se necessário
          if (
            veiculoRelacionado?.id !== editingManutencao.veiculo?.id ||
            fornecedorRelacionado?.id !== editingManutencao.fornecedor?.id
          ) {
            setEditingManutencao(prev => prev ? {
              ...prev,
              veiculo: veiculoRelacionado || null,
              fornecedor: fornecedorRelacionado || null
            } : null);
          }
        }
      }, [editingManutencao, veiculos, fornecedores]);  // Dependências adicionadas
      

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

    const handleEditVeiculo = async (id: number, veiculo: Veiculo) =>{
        try {
          const response = await updateVeiculo(id, veiculo);
          const updatedVeiculo = response.data;
          console.log(updatedVeiculo);
          const updatedVeiculos = veiculos.map(v =>
            v.id === updatedVeiculo.id ? updatedVeiculo : v
          );
          setVeiculos(updatedVeiculos);
          handleSuccess("Veículo Atualizado com sucesso!");  // Corrigir a mensagem

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

      const handleUpdateFornecedor = async (id: number, fornecedor: Fornecedor) =>{
        try {
          const response = await updateFornecedor(id, fornecedor);
          const updatedFornecedor = response.data;
          console.log(updatedFornecedor);
          const updatedFornecedores = fornecedores.map(f =>
            f.id === updatedFornecedor.id ? updatedFornecedor : f
          );
          setFornecedores(updatedFornecedores);
          handleSuccess("Fornecedor Atualizado com sucesso!");  // Corrigir a mensagem

        } catch (error) {
            handleError("Erro au atualizar Fornecedor: " + error);
        }finally{
            toggleModalFornecedor();
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

    const handleDeleteManutencao = async (id: number, deletedAt: string | null) =>{
      try {
          let response;
          if(deletedAt){
              response = await reactivateManutencao(id);
              handleSuccess("Manutenção reativada com sucesso!");
          }else{
              response = await deleteManutencao(id);
              handleSuccess("Manutenção desativado com sucesso!");
          }

          if(response.status === 200){
              setManutencoes((prevManutencoes) =>
                prevManutencoes.map((manutencao) =>
                  manutencao.id === id ? {
                  ...manutencao,
                  deletedAt: deletedAt ? null : new Date().toISOString(),
              } : manutencao
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
    
    
    
      const handleSaveManutencao = async (manutencao: Manutencao, idVeic: number, idForn: number) => {
  
        
        try {
          const response = await createManu( idVeic, idForn, manutencao); // Salva os telefones no backend
          const createdManutencao = response.data;
          setManutencoes((prevManutencoes) => 
            [...prevManutencoes, createdManutencao]);
          handleSuccess("Manutenções criadas com sucesso!");
          
          
        } catch (error) {
            console.log(error)
          handleError("Falha ao criar Manutenções: "+ error)
        } finally {
        }
      };

      const handleUpdateManutencao = async (id: number, manutencao: Manutencao, idVeic: number, idForn: number) => {
        try {
            const response = await updateManutencao(id, manutencao, idVeic, idForn);
            const updatedManutencao = response.data;
    
            // Remover a manutenção do veículo e fornecedor anteriores
            setVeiculos(prevVeiculos =>
                prevVeiculos.map(veic => ({
                    ...veic,
                    manutencoes: veic.manutencoes?.filter(m => m.id !== id) || []
                }))
            );
    
            setFornecedores(prevFornecedores =>
                prevFornecedores.map(forn => ({
                    ...forn,
                    manutencoes: forn.manutencoes?.filter(m => m.id !== id) || []
                }))
            );
    
            // Atualizar a lista geral de manutenções
            setManutencoes(prevManutencoes =>
                prevManutencoes.map(m => (m.id === updatedManutencao.id ? updatedManutencao : m))
            );
    
            // Adicionar a manutenção ao novo veículo e fornecedor
            setVeiculos(prevVeiculos =>
                prevVeiculos.map(veic =>
                    veic.id === idVeic ? { ...veic, manutencoes: [...(veic.manutencoes || []), updatedManutencao] } : veic
                )
            );
    
            setFornecedores(prevFornecedores =>
                prevFornecedores.map(forn =>
                    forn.id === idForn ? { ...forn, manutencoes: [...(forn.manutencoes || []), updatedManutencao] } : forn
                )
            );
    
            handleSuccess("Manutenção Atualizada com sucesso!");
    
        } catch (error) {
            handleError("Erro ao atualizar Manutenção: " + error);
        } finally {
            toggleModalManutencao();
        }
    };


      return({ veiculos, editingVeiculo, isEditModalOpen, isManutencaoModalOpen, selectedManutencoes, loading,
        fornecedores, editingFornecedor, activeTab, manutencoes, editingManutencao, isFornecedorModalOpen, 
        handleSaveVeiculo, handleEditVeiculo, handleEdit, handleDeleteVeiculo, handleSaveManutencao, handleUpdateManutencao,
        handleViewManutencoes, toggleEditModal, toggleModalManutencao, setEditingVeiculo,
        handleViewFornecedores, handleSaveFornecedor, toggleGerenciarVeicOpen,
        handleEditForn, setEditingFornecedor, handleDeleteFornecedor, setActiveTab, handleUpdateFornecedor, toggleModalFornecedor,
        handleEditManu, setEditingManutencao, handleDeleteManutencao
      }
      );

}

export default useGerenciarVeiculo;