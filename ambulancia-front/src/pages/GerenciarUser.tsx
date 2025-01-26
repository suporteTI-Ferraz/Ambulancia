import UserList from "../components/user/UserList";
import UserForm from "../components/user/UserForm";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import useGerenciarUser from "../hooks/useGerenciarUser";
const GerenciarUser = () => {


  const {
    users,
    editingUser,
    isModalOpen,
    loading,
    handleSaveUser,
    handleUpdateUser,
    setUsers,
    handleEdit,
    toggleModal,
    handleDeleteUser,
  } = useGerenciarUser()

  
  return (
    <div className="gerenciar">

      {/* Formulário para criação de usuário */}
      <div>
        <h3>Criar Usuário</h3>
        <UserForm 
        userToEdit={editingUser} 
        onSave={handleSaveUser} 
        onUpdate={handleUpdateUser} 
        isModal={false}/>
      </div>

      {/* Lista de usuários */}
      <UserList users={users} onEdit={handleEdit} onDelete={handleDeleteUser} setUsers={setUsers} />

      {/* Modal para edição */}
      <Modal isOpen={isModalOpen} toggle={toggleModal} className="gerenciar">
    <ModalHeader toggle={toggleModal}>Editar Usuários</ModalHeader>
    <ModalBody>
      {editingUser && (
        <UserForm
          userToEdit={editingUser}
          onSave={handleSaveUser}
          onUpdate={handleUpdateUser}
          isModal={true}
        />
      )}
    </ModalBody>
  </Modal>

    </div>
  );
};

export default GerenciarUser;
