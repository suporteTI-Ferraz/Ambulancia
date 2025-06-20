import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { createUser, deleteUser, fetchUsers, reactivateUser, updateUser } from "../services/api/UserService";
import { User } from "../types/user/UserType";
import { useToast } from "./useToast";


export const useGerenciarUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleError, handleSuccess } = useToast();
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente


  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        handleError("Erro ao carregar usuários: " + error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);


  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleEdit = (user: User) => {
    console.log("User selecionado para edição:", user); // Debug
    setEditingUser(user);
    toggleModal();
  };

  const handleSaveUser = async (user: User) => {
    try {
      const response = await createUser(user);
      const createdUser = response.data;
      /*prevUsers: Representa o estado anterior da lista de users. Usa o operador spread (...) para criar um novo array que contém todos os 
     users anteriores (prevUsers) e adiciona o novo user (createdUser) ao final da lista*/
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      handleSuccess("Funcionário criado com sucesso!");
    } catch (error) {
      handleError("Erro ao criar Funcionário: " + error);  // Melhor adicionar a mensagem de erro
    }
  };

  const handleUpdateUser = async (id: number, user: User) => {
    try {
      const response = await updateUser(id, user);
      const updatedUser = response.data;

      const updatedUsers = users.map(u =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUsers);
      handleSuccess("Funcionário Atualizado com sucesso!");  // Corrigir a mensagem
    } catch (error) {
      handleError("Erro ao Atualizar Funcionário " + error);  // Adicionar um erro aqui
    } finally {
      setEditingUser(null);
      toggleModal();
    }
  };

  const handleDeleteUser = async (id: number, deletedAt: string | null) => {
    try {
      let response;
      if (deletedAt) {
        // Reativar usuário
        response = await reactivateUser(id);
        handleSuccess("Funcionário Reativado com sucesso!");
      } else {
        // Deletar usuário
        response = await deleteUser(id);
        handleSuccess("Funcionário Desativado com sucesso!");
      }

      if (response.status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === id
              ? {
                ...user,
                deletedAt: deletedAt ? null : new Date().toISOString(),
              }
              : user
          )
        );
      }
    } catch (error) {
      handleError("Erro ao excecutar ativação/desativação do usuário: " + error)
    }
  };

  return {
    users,
    editingUser,
    isModalOpen,
    loading,
    setLoading,
    setIsModalOpen,
    handleEdit,
    setEditingUser,
    toggleModal,
    setUsers,
    handleSaveUser,
    handleUpdateUser,
    handleDeleteUser,
  };


}

export default useGerenciarUser;