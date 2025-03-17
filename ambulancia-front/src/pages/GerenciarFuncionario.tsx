import UserList from "../components/user/UserList";
import UserForm from "../components/user/UserForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import useGerenciarUser from "../hooks/useGerenciarUser";
import '../styles/GerenciarFuncionario.css';

const GerenciarFuncionario = () => {
  const {
    users,
    editingUser,
    isModalOpen,
    handleSaveUser,
    handleUpdateUser,
    handleEdit,
    toggleModal,
    handleDeleteUser,
  } = useGerenciarUser();

  return (
    <div className="gerenciar-funcionario-container">
      <h1 className="titulo-funcionarios">Gerenciar Funcionários</h1>
      {/* Seção para criar ou editar usuário */}
      <div className="form-section">
        <h3>Criar Usuário</h3>
        <UserForm 
          userToEdit={editingUser} 
          onSave={handleSaveUser} 
          onUpdate={handleUpdateUser} 
          isModal={false} 
        />
      </div>
      <div className="form-section2">
      {/* Seção para lista de usuários */}
      <div className="user-list-section">
        <UserList users={users} onEdit={handleEdit} onDelete={handleDeleteUser} />
      </div>

      {/* Modal para edição de usuários */}
      <Modal isOpen={isModalOpen} toggle={toggleModal} className="gerenciar-funcionario-modal">
        <ModalHeader toggle={toggleModal}>Editar Usuário</ModalHeader>
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
    </div>
  );
};

export default GerenciarFuncionario;
