import React, { useState, useEffect } from "react";
import UserList from "../components/user/UserList";
import UserForm from "../components/user/UserForm";
import { UserType } from "../types/UserType";
import { fetchUsers } from "../services/UserService";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const GerenciarUser = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetchUsers();
      setUsers(response.data);
    };
    loadUsers();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleUserSaved = () => {
    const reloadUsers = async () => {
      const response = await fetchUsers();
      setUsers(response.data);
    };
    reloadUsers();
  
    if (editingUser) {
      // Fecha o modal somente se estiver editando um usuário
      toggleModal();
    }
    
    setEditingUser(null); // Limpa o usuário em edição
  };
  

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    toggleModal(); // Abre o modal para edição
  };

  return (
    <div className="gerenciar-user">

      {/* Formulário para criação de usuário */}
      <div>
        <h3>Criar Usuário</h3>
        <UserForm onUserSaved={handleUserSaved} />
      </div>

      {/* Lista de usuários */}
      <UserList users={users} onEdit={handleEdit} setUsers={setUsers} />

      {/* Modal para edição */}
      <Modal
  isOpen={isModalOpen}
  toggle={toggleModal}
  className="gerenciar-user custom-modal"
>
  <ModalHeader toggle={toggleModal} className="custom-modal-header">
    Editar Usuário
  </ModalHeader>
  <ModalBody className="custom-modal-body">
    <UserForm userToEdit={editingUser} onUserSaved={handleUserSaved} />
  </ModalBody>
  <ModalFooter className="custom-modal-footer">
    <Button className="button-edit" onClick={toggleModal}>
      Cancelar
    </Button>
  </ModalFooter>
</Modal>

    </div>
  );
};

export default GerenciarUser;
