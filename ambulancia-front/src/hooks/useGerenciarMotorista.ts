import { Motorista } from "../types/motorista/MotoristaType";
import { createMotorista, fetchMotoristas, updateMotorista, deleteMotorista, reactivateMotorista } from "../services/api/MotoristaService";
import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { useLoading } from "../contexts/LoadingContext";

// Agora Motorista inclui telefone, propagado automaticamente
export const useGerenciarMotorista = () =>{
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [editingMotorista, setEditingMotorista] = useState<Motorista | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleError, handleSuccess } = useToast();
    const { loading, setLoading } = useLoading(); // Acessa o loading globalmente

    useEffect(() =>{
        const loadMotoristas = async () =>{
            setLoading(true);
            try {
                const response = await fetchMotoristas();
                setMotoristas(response.data);
            } catch (error) {
                handleError("Erro ao carregar Motoristas: "+ error);
            }finally{
                setLoading(false);
            }
        }
        loadMotoristas();
    },[]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleEdit = (motorista: Motorista) =>{
        setEditingMotorista(motorista);
        toggleModal();
    };

    const handleSaveMotorista = async (motorista: Motorista) =>{
        try {
            const response = await createMotorista(motorista);
            const createdMotorista = response.data;
            setMotoristas((prevMotoristas) => [...prevMotoristas, createdMotorista]);
            handleSuccess("Motorista criado com sucesso!");
        } catch (error) {
            handleError("Erro ao criar o Motorista: "+ error);
        }
    };

    const handleUpdateMotorista = async (id: number, motorista: Motorista) =>{
        try {
            const response = await updateMotorista(id, motorista);
            const updatedMotorista = response.data;

            const updatedMotoristas = motoristas.map((m) =>
            m.id === updatedMotorista.id ? updatedMotorista: m);
            setMotoristas(updatedMotoristas);
            handleSuccess("Motorista Atualizado com sucesso!");
        } catch (error) {
            handleError("Erro ao Atualizar Motorista " + error);
        }finally{
            setEditingMotorista(null);
            toggleModal();
        }
    };

    const handleDeleteMotorista = async(id: number, deletedAt: string | null) =>{
        try {
            let response;
            if(deletedAt){
                response = await reactivateMotorista(id);
            }else{
                response = await deleteMotorista(id);
            }

            if (response.status === 200) {
                handleSuccess("Motorista Desativado com sucesso!");
                setMotoristas((prevMotoristas) => prevMotoristas.map(
                    (motorista) => motorista.id === id ? {
                        ...motorista,
                        deletedAt: deletedAt ? null : new Date().toISOString(),
                    } : motorista
                )
                );

        }

        } catch (error) {
            handleError("Erro ao excecutar ativação/desativação do usuário: "+ error)
        }
    };

    return{
        motoristas,
        editingMotorista,
        isModalOpen,
        loading,
        setLoading,
        setIsModalOpen,
        handleEdit,
        setEditingMotorista,
        toggleModal,
        setMotoristas,
        handleSaveMotorista,
        handleUpdateMotorista,
        handleDeleteMotorista,
    };
}