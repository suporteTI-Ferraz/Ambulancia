import { useState, useEffect } from "react";
import {fetchHospitais, createHospital, updateHospital, deleteHospital, reactivateHospital, 
createManyEndHosp, updateManyEndHosp,} from "../services/api/HospitalService";
import { Hospital } from "../types/hospital/HospitalType";
import { EnderecoHosp } from "../types/hospital/EnderecoHospType";
import { useToast } from "./useToast";



const useGerenciarHospital = () =>{

     const [hospitais, setHospitais] = useState<Hospital[]>([]); // Lista de Hospital
      const [loading, setLoading] = useState(false);
    
      const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false); //Modal para editar o Hospital

    
      const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false); //Modal para adicionar endereços novos
      const [selectedEnderecos, setSelectedEnderecos] = useState<Hospital["enderecos"]>([]);
    
    
      const { handleError, handleSuccess } = useToast();
    
      useEffect(() => {
        const loadHospitals = async () => {
          setLoading(true);
          try {
            const response = await fetchHospitais();
            setHospitais(response.data);
          } catch (error) {
            handleError("Erro ao carregar Hospitals.");
          } finally {
            setLoading(false);
          }
        };
        loadHospitals();
      }, []); //Carrega só uma vez na construção do componente 

  //Métodos para fechar modais
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen); 
  const toggleEnderecoModal = () => setIsEnderecoModalOpen(!isEnderecoModalOpen);

  const handleEdit = (hospital: Hospital) => {
    console.log("Paciente selecionado para edição:", hospital); // Debug
    setEditingHospital(hospital);
    toggleEditModal();
  };

  const handleCreateHospital = async (newHospital: Hospital) =>{
    try {
        const copiaNewHospital = { ...newHospital, enderecos: [] };
        const response = await createHospital(copiaNewHospital);
        const createdHospital = response.data;

          if (newHospital.enderecos.length > 0) {
                const enderecos = await createManyEndHosp(createdHospital.id, newHospital.enderecos);
                createdHospital.enderecos = enderecos.data;
            }
               // Atualiza o paciente com os dados criados e ID
       const hospitalAtualizado = { 
        ...createdHospital, 
        createdAt: response.data.createdAt 
      };
      
      // Atualiza o estado de pacientes
      setHospitais((prevHospitais) => [...prevHospitais, hospitalAtualizado]);
      handleSuccess("Hospital criado com sucesso!");
    } catch (error) {
        handleError("Erro ao criar hospital "+ error);
    }
  };

   const handleEditHospital = async (
      updatedHospital: Hospital,
      notUpdatedHospital: Hospital  ) => {
      try {
        const isHospitalChanged =updatedHospital.nomeHosp !== notUpdatedHospital.nomeHosp
        // Verifica se os endereços no formulário foram alterados 
        const isEnderecosChanged = JSON.stringify(updatedHospital.enderecos) !== JSON.stringify(notUpdatedHospital.enderecos);
  
        // Se houver alterações no paciente, atualizar paciente
        if (isHospitalChanged) {
          console.log("Hospital Atualizado!!!!");
          await updateHospital(updatedHospital.id, updatedHospital);
        }
        if (isEnderecosChanged) {
          console.log("Endereços Atualizados!!!!");
          await updateManyEndHosp(updatedHospital.id, notUpdatedHospital.enderecos);
        }
        //Atualiza a lista de pacientes localmente (substitui o paciente antigo pelo atualizado)
        const updatedHospitais = hospitais.map(hospital =>
            hospital.id === notUpdatedHospital.id ? updatedHospital : hospital
        );
        setHospitais(updatedHospitais);
        handleSuccess("Hospital atualizado com sucesso!");
      } catch (error) {
        handleError("Falha ao Atualizar Hospital: "+ error)
      } finally {
        toggleEditModal(); //Fecha o modal de editar usuários
      }
    };
  
    const handleDeleteHospital = async (id: number, deletedAt: string | null) => {
      try {
        let response;
        if (deletedAt) {
          // Reativar usuário
          response = await reactivateHospital(id);
          handleSuccess("Paciente reativado com sucesso!");
        } else {
          // Deletar usuário
          response = await deleteHospital(id);
          handleSuccess("Hospital desativado com sucesso!");
        }
  
        if (response.status === 200) {
          setHospitais(prevHospitais =>
            prevHospitais.map(hospital =>
              hospital.id === id
                ? {
                    ...hospital,
                    deletedAt: deletedAt ? null : new Date().toISOString(),
                  }
                : hospital
            )
          );
        }
      } catch (error) {
        handleError('Erro ao alternar status do Hospital: '+ error);
      }
    };


    const handleViewEnderecos = (hospital: Hospital) => {
    if (!hospital) {
        alert("Selecione um hospital antes de gerenciar os endereços.");
        return;
    }
    setEditingHospital(hospital);
    setSelectedEnderecos(hospital.enderecos || []);
    toggleEnderecoModal();
    }

     const handleSaveEnderecosFromModal = async (enderecos: EnderecoHosp[]) => {
        if (!editingHospital) {
          alert("Nenhum hospital está sendo editado para associar os hospitais.");
          return;
        }
      
        try {
          const response = await createManyEndHosp(editingHospital.id, enderecos); // Salva os endereços no backend
          const createdEnderecos = response.data;
          setHospitais(prevHospitais =>
            prevHospitais.map(hospital => 
                hospital.id === editingHospital.id 
              ? {
                ...hospital,
                enderecos: [...hospital.enderecos, ...createdEnderecos]
                
              }
              : hospital
            )
          );
        } catch (error) {
          console.error("Erro ao salvar os endereços:", error);
        } finally {
          toggleEnderecoModal(); // Fecha o modal
        }
      };
    

  return(
    {
        hospitais, editingHospital, loading, isEditModalOpen, isEnderecoModalOpen, selectedEnderecos,
        setEditingHospital, setHospitais, setIsEditModalOpen, setIsEnderecoModalOpen, setSelectedEnderecos,
        handleCreateHospital, handleEdit,toggleEditModal, toggleEnderecoModal, handleEditHospital, handleDeleteHospital,
        handleViewEnderecos, handleSaveEnderecosFromModal,
    }
  )

}

export default useGerenciarHospital